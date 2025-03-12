"use client";
import { useEffect, useState } from "react";

// Definição do tipo Empresa
type Empresa = {
  id: number;
  razaoSocial: string;
  cnpj: string;
  cep: string;
  cidade: string;
  estado: string;
  bairro: string;
  complemento: string;
};

export default function Home() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]); // Tipando o useState

  // Função para buscar os dados da API
  const fetchEmpresas = async () => {
    try {
      const response = await fetch("/api/empresas");
      if (!response.ok) {
        throw new Error("Erro ao buscar empresas");
      }
      const data: Empresa[] = await response.json();
      setEmpresas(data); // Atualiza o estado com os dados do banco
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Chama a API quando o componente é montado
  useEffect(() => {
    fetchEmpresas();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Lista de Empresas</h1>

      <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition mb-6">
        + Nova Empresa
      </button>

      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-700">
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
            {empresas.length > 0 ? (
              empresas.map((empresa) => (
                <tr key={empresa.id} className="border-t text-black">
                  <td className="px-4 py-2">{empresa.razaoSocial}</td>
                  <td className="px-4 py-2">{empresa.cnpj}</td>
                  <td className="px-4 py-2">{empresa.cep}</td>
                  <td className="px-4 py-2">{empresa.cidade}</td>
                  <td className="px-4 py-2">{empresa.estado}</td>
                  <td className="px-4 py-2">{empresa.bairro}</td>
                  <td className="px-4 py-2">{empresa.complemento}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col space-y-2 justify-center">
                      <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                        Editar
                      </button>
                      <button className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                        Excluir
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-3 text-center text-gray-500">
                  Nenhuma empresa cadastrada.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
