import { notFound } from "next/navigation";
import Link from "next/link";
import LicencasActions from "./LicencasActions";
import { FaEdit } from "react-icons/fa";

// Tipos
type Licenca = {
    id: number;
    numero: string;
    orgaoAmbiental: string;
    emissao: string;
    validade: string;
    empresaId: number;
};

interface Empresa {
    id: number;
    razaoSocial: string;
};

// Função para buscar os dados no servidor
async function getData(empresaId: string) {
    try {
        const [licencaRes, empresaRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/crudLicenca?empresaId=${empresaId}`, { cache: "no-store" }),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/crudEmpresa?id=${empresaId}`, { cache: "no-store" }),
        ]);

        if (!licencaRes.ok || !empresaRes.ok) throw new Error("Erro ao buscar dados");

        const licencasData = await licencaRes.json();
        const licencas: Licenca[] = licencasData.licencas ? licencasData.licencas : [];
        const empresas: Empresa[] = await empresaRes.json();

        const licencasDaEmpresa = licencas.filter(
            licenca => licenca.empresaId === parseInt(empresaId, 10)
        );

        const empresa = empresas.find(
            emp => emp.id === parseInt(empresaId, 10)
        );

        if (!empresa) {
            console.error("Empresa não encontrada!");
            return { licencas: [], empresa: null };
        }

        return { licencas: licencasDaEmpresa, empresa };
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return { licencas: [], empresa: null };
    }
}
// Página GerirLicencas: recebe o parâmetro dinâmico "empresaId"
export default async function GerirLicencas({ params }: { params: { empresaId: string } }) {
    const { empresaId } = await params; // Use await aqui para resolver corretamente os parâmetros

    if (!empresaId) {
        return notFound(); // Exibe 404 se não houver empresaId
    }

    const { licencas, empresa } = await getData(empresaId);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-black mb-6 mt-20">
                {empresa?.razaoSocial}
            </h1>

            <Link href={`/cadastroLicencas?empresaId=${empresaId}`}>
                <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition mb-6">
                    + Nova Licença
                </button>
            </Link>

            <div className="w-full max-w-4xl overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-700">
                    <thead>
                        <tr className="text-left bg-gray-200">
                            <th className="px-4 py-3 text-sm font-semibold text-gray-700">Número</th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-700">Orgão Ambiental</th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-700">Emissão</th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-700">Validade</th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-700">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {licencas.length > 0 ? (
                            licencas.map((licenca) => (
                                <tr key={licenca.id} className="border-t text-black">
                                    <td className="px-4 py-2 border-r">{licenca.numero}</td>
                                    <td className="px-4 py-2 border-r">{licenca.orgaoAmbiental}</td>
                                    <td className="px-4 py-2 border-r">{licenca.emissao}</td>
                                    <td className="px-4 py-2 border-r">{licenca.validade}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex space-x-4 justify-start p-2">
                                            <LicencasActions id={licenca.id} />
                                            <Link href={`/cadastroLicencas?id=${licenca.id}`}>
                                                <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                                    <FaEdit size={23} />
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                                    Nenhuma Licença cadastrada para essa empresa.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}