

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importação para navegação
import { FaEdit, FaTrash, FaFileAlt } from "react-icons/fa"; // Importa os ícones

// Definição do Objeto/Tipo Empresa
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

    const router = useRouter(); // Instância do router

    const [empresas, setEmpresas] = useState<Empresa[]>([]); // Tipando o useState

    // Função para buscar os dados da API
    const fetchEmpresas = async () => {
        try {
            const response = await fetch("/api/crudEmpresa");
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

    // Deletar Empresa, chama a função enviando o id como parametro
    async function deletarEmpresa(id: number) {

        const response = await fetch('/api/crudEmpresa', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }), // Envia o id para o  BackEnd
        });

        // Recarrega a página após exclusão
        window.location.reload();

        if (response.ok) {
            alert('Empresa deletada com sucesso!!!')
        }

    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 mt-6">Lista de Empresas</h1>

            <Link href={"/cadastroEmpresas"}>
                <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition mb-6">
                    + Nova Empresa
                </button>
            </Link>

            <div className="w-full max-w-4xl overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-700">
                    <thead>
                        <tr className="text-left bg-gray-200">
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
                                    <td className="px-4 py-2 border-r">{empresa.razaoSocial}</td>
                                    <td className="px-4 py-2 border-r">{empresa.cnpj}</td>
                                    <td className="px-4 py-2 border-r">{empresa.cep}</td>
                                    <td className="px-4 py-2 border-r">{empresa.cidade}</td>
                                    <td className="px-4 py-2 border-r">{empresa.estado}</td>
                                    <td className="px-4 py-2 border-r">{empresa.bairro}</td>
                                    <td className="px-4 py-2 border-r">{empresa.complemento}</td>
                                    <td className="px-4 py-2 border-r">

                                        <div className="flex space-x-2 justify-center">
                                            <button
                                                onClick={() => router.push(`/cadastroEmpresas?id=${empresa.id}`)}
                                                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                            >
                                                <FaEdit size={18} />
                                            </button>

                                            <button
                                                onClick={() => deletarEmpresa(empresa.id)}
                                                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                            >
                                                <FaTrash size={18} />
                                            </button>

                                            <button
                                                onClick={() => router.push(`/gerirLicencas?empresaId=${empresa.id}`)}
                                                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                            >
                                                Licenças
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

