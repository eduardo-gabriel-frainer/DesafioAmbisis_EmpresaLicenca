"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Definição do Objeto/Tipo Licenca
type Licenca = {
    id: number;
    numero: number;
    orgaoAmbiental: string;
    emissao: string;
    validade: string;
    empresaId: number;
};

export default function GerirLicencas() {
    const [licencas, setLicencas] = useState<Licenca[]>([]);
    const router = useRouter();
    const [empresaId, setEmpresaId] = useState<string | null>(null);

    // Use useEffect para obter o empresaId apenas no lado do cliente
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('empresaId');
        if (id) {
            setEmpresaId(id);
        } else {
            console.error("empresaId está ausente!");
        }
    }, []); // Apenas executar uma vez quando o componente for montado

    useEffect(() => {
        const fetchLicencas = async () => {
            if (!empresaId) {
                return; // Não faz a requisição se o empresaId estiver ausente
            }

            console.log(`Buscando licenças para empresa com ID: ${empresaId}`);

            try {
                const response = await fetch(`/api/crudLicenca?empresaId=${empresaId}`);
                if (!response.ok) {
                    console.error("Erro na resposta da API:", response.statusText);
                    throw new Error("Erro ao buscar licenças");
                }
                const data: Licenca[] = await response.json();
                console.log("Licenças recebidas:", data);
                setLicencas(data);
            } catch (error) {
                console.error("Erro ao buscar licenças:", error);
            }
        };

        fetchLicencas();
    }, [empresaId]); // Reexecuta quando empresaId mudar

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-20">
            {/* <h1 className="text-4xl font-bold text-gray-800 mb-6 mt-6">{empresaId.razaoSocial}</h1> */}
            <Link href="/cadastroLicencas">
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
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-4 py-3 text-center text-gray-500">
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
