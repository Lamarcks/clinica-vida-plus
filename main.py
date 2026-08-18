# ============================================================
# SISTEMA CLÍNICA VIDA+
# Projeto Integrado - Análise e Desenvolvimento de Sistemas
# ============================================================


def ler_idade():
    """Lê e valida a idade informada pelo usuário."""

    while True:
        try:
            idade = int(input("Idade: "))

            if idade < 0 or idade > 130:
                print("Idade inválida. Digite um valor entre 0 e 130.")
                continue

            return idade

        except ValueError:
            print("Entrada inválida. Digite a idade usando apenas números inteiros.")


def cadastrar_paciente(pacientes):
    """Cadastra um novo paciente."""

    print("\n--- CADASTRO DE PACIENTE ---")

    nome = input("Nome do paciente: ").strip()

    while not nome:
        print("O nome não pode ficar vazio.")
        nome = input("Nome do paciente: ").strip()

    idade = ler_idade()

    telefone = input("Telefone: ").strip()

    while not telefone:
        print("O telefone não pode ficar vazio.")
        telefone = input("Telefone: ").strip()

    paciente = {
        "nome": nome,
        "idade": idade,
        "telefone": telefone
    }

    pacientes.append(paciente)

    print(f"\nPaciente {nome} cadastrado com sucesso!")


def ver_estatisticas(pacientes):
    """Exibe as estatísticas dos pacientes cadastrados."""

    print("\n--- ESTATÍSTICAS ---")

    if not pacientes:
        print("Nenhum paciente cadastrado.")
        return

    total = len(pacientes)

    idade_media = (
        sum(paciente["idade"] for paciente in pacientes) / total
    )

    mais_novo = min(
        pacientes,
        key=lambda paciente: paciente["idade"]
    )

    mais_velho = max(
        pacientes,
        key=lambda paciente: paciente["idade"]
    )

    print(f"Total de pacientes: {total}")
    print(f"Idade média: {idade_media:.1f} anos")

    print(
        f"Paciente mais novo: "
        f"{mais_novo['nome']} ({mais_novo['idade']} anos)"
    )

    print(
        f"Paciente mais velho: "
        f"{mais_velho['nome']} ({mais_velho['idade']} anos)"
    )


def buscar_paciente(pacientes):
    """Busca um paciente pelo nome."""

    print("\n--- BUSCAR PACIENTE ---")

    if not pacientes:
        print("Nenhum paciente cadastrado.")
        return

    nome_busca = input(
        "Digite o nome do paciente: "
    ).strip().lower()

    encontrados = [
        paciente
        for paciente in pacientes
        if nome_busca in paciente["nome"].lower()
    ]

    if not encontrados:
        print("Paciente não encontrado.")
        return

    print(
        f"\n{len(encontrados)} paciente(s) encontrado(s):"
    )

    for paciente in encontrados:
        print("-" * 35)
        print(f"Nome: {paciente['nome']}")
        print(f"Idade: {paciente['idade']} anos")
        print(f"Telefone: {paciente['telefone']}")


def listar_pacientes(pacientes):
    """Exibe todos os pacientes cadastrados."""

    print("\n--- PACIENTES CADASTRADOS ---")

    if not pacientes:
        print("Nenhum paciente cadastrado.")
        return

    for indice, paciente in enumerate(
        pacientes,
        start=1
    ):
        print(f"\nPaciente {indice}")
        print(f"Nome: {paciente['nome']}")
        print(f"Idade: {paciente['idade']} anos")
        print(f"Telefone: {paciente['telefone']}")


def exibir_menu():
    """Exibe o menu principal."""

    print("\n================================")
    print("      SISTEMA CLÍNICA VIDA+")
    print("================================")
    print("1. Cadastrar paciente")
    print("2. Ver estatísticas")
    print("3. Buscar paciente")
    print("4. Listar todos os pacientes")
    print("5. Sair")
    print("================================")

def main():
    """Executa o sistema."""

    pacientes = []

    while True:

        exibir_menu()

        opcao = input("Escolha uma opção: ").strip()

        if opcao == "1":
            cadastrar_paciente(pacientes)

        elif opcao == "2":
            ver_estatisticas(pacientes)

        elif opcao == "3":
            buscar_paciente(pacientes)

        elif opcao == "4":
            listar_pacientes(pacientes)

        elif opcao == "5":
            print("\nSistema encerrado. Até logo!")
            break

        else:
            print(
                "\nOpção inválida. "
                "Escolha uma opção de 1 a 5."
            )


if __name__ == "__main__":
    main()