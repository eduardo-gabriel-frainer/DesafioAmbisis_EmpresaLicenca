import Link from "next/link";

export default function Inicio() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white pb-30"> {/* Ajuste aqui */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-green-600 mb-4 rounded-md p-4">
          Sejam Bem Vindos
        </h1>
        <h2 className="text-4xl font-semibold text-green-600 mb-4">
          ao Sistema de Cadastro de Empresas
        </h2>
        <h3 className="text-3xl font-medium text-green-600 mb-6">
          e Licenças   Ambientais
        </h3>
        <div className="space-x-4">
          <button className="px-6 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition">
            <Link href="/listarEmpresas" className="hover:text-gray-200">
              Começar Agora
            </Link>
          </button>
          <button className="px-6 py-2 bg-white text-green-600 border-2 border-green-600 rounded-md shadow-md hover:bg-green-100 transition">
            <Link href="/saibaMais" className="hover:text-green-600">
              Saiba Mais
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}