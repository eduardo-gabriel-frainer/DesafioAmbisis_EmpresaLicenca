
export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Lista de Empresas</h1>

      <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition mb-6">
        + Nova Empresa
      </button>

      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Razão Social</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">CNPJ</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">CEP</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Cidade</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Estado</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Bairro</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Complemento</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>

          <tbody>
            {/* Exemplo de uma empresa */}
            <tr className="border-t border-gray-200">
              <td className="px-4 py-3 text-gray-700">Empresa 1</td>
              <td className="px-4 py-3 text-gray-600">00.000.000/0001-00</td>
              <td className="px-4 py-3 text-gray-600">00000-000</td>
              <td className="px-4 py-3 text-gray-600">São Paulo</td>
              <td className="px-4 py-3 text-gray-600">SP</td>
              <td className="px-4 py-3 text-gray-600">Centro</td>
              <td className="px-4 py-3 text-gray-600">Nenhum</td>
              <td className="px-4 py-3 text-center">
                <div className="flex flex-col space-y-2 justify-center">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                    Editar
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                    Excluir
                  </button>
                  <button className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                    Licenças
                  </button>
                </div>
              </td>


            </tr>

            {/* Adicione mais empresas conforme necessário */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
