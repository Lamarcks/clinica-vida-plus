const formulario = document.getElementById("pacienteForm");
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const telefoneInput = document.getElementById("telefone");

const campoBusca = document.getElementById("campoBusca");
const listaPacientes = document.getElementById("listaPacientes");
const estadoVazio = document.getElementById("estadoVazio");

const totalPacientes = document.getElementById("totalPacientes");
const idadeMedia = document.getElementById("idadeMedia");
const maisNovo = document.getElementById("maisNovo");
const maisVelho = document.getElementById("maisVelho");

const limparDados = document.getElementById("limparDados");
const toast = document.getElementById("toast");


/*
    Os pacientes ficam armazenados no navegador.
    Assim os dados permanecem mesmo depois de atualizar a página.
*/

let pacientes = JSON.parse(
    localStorage.getItem("clinicaVidaPacientes")
) || [];


/* SALVAR */

function salvarPacientes() {
    localStorage.setItem(
        "clinicaVidaPacientes",
        JSON.stringify(pacientes)
    );
}


/* MENSAGEM */

function mostrarMensagem(texto) {

    toast.textContent = texto;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


/* CADASTRO */

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = nomeInput.value.trim();
    const idade = Number(idadeInput.value);
    const telefone = telefoneInput.value.trim();


    if (!nome || !telefone) {
        mostrarMensagem("Preencha todos os campos.");
        return;
    }


    if (
        Number.isNaN(idade) ||
        idade < 0 ||
        idade > 130
    ) {
        mostrarMensagem("Informe uma idade válida.");
        return;
    }


    const paciente = {
        id: Date.now(),
        nome: nome,
        idade: idade,
        telefone: telefone
    };


    pacientes.push(paciente);

    salvarPacientes();

    formulario.reset();

    atualizarInterface();

    mostrarMensagem("Paciente cadastrado com sucesso!");

    nomeInput.focus();
});


/* LISTAR */

function renderizarPacientes(lista = pacientes) {

    listaPacientes.innerHTML = "";


    if (lista.length === 0) {

        estadoVazio.style.display = "block";

        return;
    }


    estadoVazio.style.display = "none";


    lista.forEach((paciente, index) => {

        const linha = document.createElement("tr");


        linha.innerHTML = `
            <td>${index + 1}</td>

            <td class="patient-name">
                ${escaparHTML(paciente.nome)}
            </td>

            <td>
                ${paciente.idade} anos
            </td>

            <td>
                ${escaparHTML(paciente.telefone)}
            </td>

            <td>
                <button
                    class="btn-delete"
                    onclick="removerPaciente(${paciente.id})"
                >
                    Excluir
                </button>
            </td>
        `;


        listaPacientes.appendChild(linha);
    });
}


/* ESTATÍSTICAS */

function atualizarEstatisticas() {

    if (pacientes.length === 0) {

        totalPacientes.textContent = "0";
        idadeMedia.textContent = "0";
        maisNovo.textContent = "-";
        maisVelho.textContent = "-";

        return;
    }


    const total = pacientes.length;


    const somaIdades = pacientes.reduce(
        (soma, paciente) => soma + paciente.idade,
        0
    );


    const media = somaIdades / total;


    const pacienteMaisNovo = pacientes.reduce(
        (anterior, atual) =>
            atual.idade < anterior.idade
                ? atual
                : anterior
    );


    const pacienteMaisVelho = pacientes.reduce(
        (anterior, atual) =>
            atual.idade > anterior.idade
                ? atual
                : anterior
    );


    totalPacientes.textContent = total;

    idadeMedia.textContent =
        `${media.toFixed(1)} anos`;

    maisNovo.textContent =
        `${pacienteMaisNovo.nome.split(" ")[0]} (${pacienteMaisNovo.idade})`;

    maisVelho.textContent =
        `${pacienteMaisVelho.nome.split(" ")[0]} (${pacienteMaisVelho.idade})`;
}


/* BUSCA */

campoBusca.addEventListener("input", function() {

    const termo = campoBusca.value
        .toLowerCase()
        .trim();


    const pacientesFiltrados = pacientes.filter(
        paciente =>
            paciente.nome
                .toLowerCase()
                .includes(termo)
    );


    renderizarPacientes(pacientesFiltrados);
});


/* REMOVER */

function removerPaciente(id) {

    const paciente = pacientes.find(
        paciente => paciente.id === id
    );


    if (!paciente) {
        return;
    }


    const confirmar = confirm(
        `Deseja excluir ${paciente.nome}?`
    );


    if (!confirmar) {
        return;
    }


    pacientes = pacientes.filter(
        paciente => paciente.id !== id
    );


    salvarPacientes();

    atualizarInterface();

    mostrarMensagem("Paciente removido.");
}


/* LIMPAR TODOS */

limparDados.addEventListener("click", function() {

    if (pacientes.length === 0) {

        mostrarMensagem(
            "Não existem pacientes cadastrados."
        );

        return;
    }


    const confirmar = confirm(
        "Deseja apagar todos os pacientes cadastrados?"
    );


    if (!confirmar) {
        return;
    }


    pacientes = [];

    salvarPacientes();

    atualizarInterface();

    mostrarMensagem(
        "Todos os dados foram removidos."
    );
});


/* EVITAR HTML INSERIDO PELO USUÁRIO */

function escaparHTML(texto) {

    const elemento = document.createElement("div");

    elemento.textContent = texto;

    return elemento.innerHTML;
}


/* INTERFACE */

function atualizarInterface() {

    renderizarPacientes();

    atualizarEstatisticas();
}


/* INICIALIZAÇÃO */

atualizarInterface();