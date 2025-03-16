import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-green-600 text-white py-4 px-6 shadow-md">
            <div className="container mx-auto flex justify-between items-center">

                <Link href="/" className="text-2xl font-bold">
                    Desafio Ambisis
                </Link>

                <nav className="space-x-6 hidden md:block">
                    <Link href="/listarEmpresas" className="hover:text-gray-200 pr-3">
                        Listar Empresas
                    </Link>

                    <Link href="/cadastroEmpresas" className="hover:text-gray-200 pr-3">
                        Cadastro de Empresas
                    </Link>

                    <Link href="/cadastroLicencas" className="hover:text-gray-200">
                        Cadastro de Licenças
                    </Link>
                </nav>

                <Link href="/">
                    <button className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-100">
                        Início
                    </button>
                </Link>
            </div>
        </header>
    )

}