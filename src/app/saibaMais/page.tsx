import Link from "next/link";

export default function Inicio() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-30">


            <h1 className="text-5xl font-extrabold text-green-700 mb-15">
                Sobre o Sistema
            </h1>


            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full hover:shadow-xl transition transform hover:scale-105 mb-6">
                <div className="flex justify-center mb-4">

                </div>
                <h2 className="text-2xl font-semibold text-green-700 mb-2">Sobre o Desafio!!!</h2>
                <p className="text-gray-700 mb-4">Esse sistema é um desafio fullstack a vaga de Desenvolvedor Junior, o sistema foi construido em Next e TypeScript.</p>

            </div>

            <div className="flex flex-wrap justify-center gap-6">

                <div className="bg-white p-6 rounded-lg shadow-md w-72 hover:shadow-xl transition transform hover:scale-105 relative">
                    <h3 className="text-xl font-semibold text-green-600 mb-4">Cadastro de Empresas</h3>
                    <p className="text-gray-600 mb-4">Cadastre novas empresas e gerencie as informações necessárias para o seu cadastro ambiental.</p>
                    <Link href={"/listarEmpresas"}>
                        <button className="mt-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                            Iniciar
                        </button>
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md w-72 hover:shadow-xl transition transform hover:scale-105">
                    <h3 className="text-xl font-semibold text-green-600 mb-4">Cadastro de Licenças</h3>
                    <p className="text-gray-600 mb-4">Gerencie as licenças ambientais com facilidade e acompanhe o status de cada uma delas.</p>
                    <Link href={"/listarEmpresas"}>
                        <button className="absolute bottom-5 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                            Iniciar
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
}
