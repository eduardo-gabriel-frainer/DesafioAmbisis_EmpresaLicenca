import Link from "next/link";
import EmpresaActions from "./EmpresaActions"; // Importa o novo componente
import { FaEdit } from "react-icons/fa";

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

async function getEmpresas(): Promise<Empresa[]> {
    const response = await fetch("http://localhost:3000/api/crudEmpresa", { cache: "no-store" });
    if (!response.ok) {
        throw new Error("Erro ao buscar empresas");
    }
    return response.json();
}

export default async function EmpresasPage() {
    const empresas = await getEmpresas(); // Buscando empresas no servidor

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 mt-6">Lista de Empresas</h1>

            <Link href="/cadastroEmpresas">
                <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition mb-6">
                    + Nova Empresa
                </button>
            </Link>

            <div className="w-full max-w-5xl overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-700 table-fixed">
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
                            empresas.map((empresa: Empresa) => (
                                <tr key={empresa.id} className="border-t text-black">
                                    <td className="px-4 py-2 border-r">{empresa.razaoSocial}</td>
                                    <td className="px-4 py-2 border-r">{empresa.cnpj}</td>
                                    <td className="px-4 py-2 border-r">{empresa.cep}</td>
                                    <td className="px-4 py-2 border-r">{empresa.cidade}</td>
                                    <td className="px-4 py-2 border-r">{empresa.estado}</td>
                                    <td className="px-4 py-2 border-r">{empresa.bairro}</td>
                                    <td className="px-4 py-2 border-r">{empresa.complemento}</td>
                                    <td className="px-4 py-2 border-r">
                                        <div className="flex space-x-4 justify-start">
                                            <Link href={`/cadastroEmpresas?id=${empresa.id}`}>
                                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                                    <FaEdit size={23} />
                                                </button>
                                            </Link>

                                            <EmpresaActions empresaId={empresa.id} />

                                            <Link href={`/gerirLicencas/${empresa.id}`}>
                                                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600 transition">
                                                    Licencas
                                                </button>
                                            </Link>
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