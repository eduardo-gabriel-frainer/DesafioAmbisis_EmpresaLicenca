"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Empresa {
    id: number;
    razaoSocial: string;
}

interface Licenca {
    id?: number;
    numero: string;
    orgaoAmbiental: string;
    emissao: string;
    validade: string;
    empresaId: string;
}

export default function Licencas() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const [empresas, setEmpresas] = useState<Empresa[]>([]); //Cria um estado para armazenar a lista de empresas
    const empresaId = searchParams.get("empresaId");
    const id = searchParams.get('id');

    const [formData, setFormData] = useState<Licenca>({
        numero: '',
        orgaoAmbiental: '',
        emissao: '',
        validade: '',
        empresaId: '',
    });

    // Carrega Empresa para edição se houver ID
    useEffect(() => {
        if (id) {
            console.log('ID recebido na URL:', id);
            fetch(`/api/crudLicenca?id=${id}`)
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error(`Erro na resposta da API: ${res.status}`);
                    }
                    const data = await res.json();
                    console.log('Dados recebidos:', data);

                    // Se a API retorna um array, busque o primeiro item
                    const licenca = Array.isArray(data) ? data.find((item) => item.id === parseInt(id)) : data;

                    if (licenca) {
                        setFormData({
                            id: licenca.id,
                            numero: licenca.numero,
                            orgaoAmbiental: licenca.orgaoAmbiental,
                            emissao: licenca.emissao,
                            validade: licenca.validade,
                            empresaId: String(licenca.empresaId), // Convertendo para string se necessário
                        });
                    } else {
                        throw new Error('Licença não encontrada.');
                    }
                })
                .catch((error) => {
                    console.error('Erro ao carregar os dados:', error.message);
                });
        }
    }, [id]);

    // Carrega a lista de empresas para o select
    useEffect(() => {
        fetch("/api/crudEmpresa")
            .then((response) => response.json())
            // atualiza a lista de empresas
            .then((data) => {
                setEmpresas(data);

                // Se houver um empresaId na URL, pré-seleciona essa empresa no select
                if (empresaId) {
                    const empresaSelecionada = data.find((empresa: Empresa) => empresa.id === parseInt(empresaId, 10));
                    if (empresaSelecionada) {
                        setFormData((prev) => ({
                            ...prev,
                            empresaId: String(empresaSelecionada.id),
                        }));
                    }
                }
            })
            .catch((error) => console.error("Erro ao buscar empresas:", error));
    }, [empresaId]); // Recarrega quando o ID da empresa mudar na URL

    // Função para lidar com a mudança nos campos do formulário
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));  // Atualiza apenas o campo alterado
    };

    // Função para enviar o formulário
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Certifica que empresaId será enviada como um número
        const payload = {
            ...formData,
            empresaId: parseInt(formData.empresaId, 10),
        };

        const response = await fetch('/api/crudLicenca', {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            alert(id ? 'Licença atualizada com sucesso!' : 'Licença criada com sucesso!');
            setFormData({
                numero: '',
                orgaoAmbiental: '',
                emissao: '',
                validade: '',
                empresaId: '',
            });
        } else {
            alert('Erro ao salvar licença.');
        }

        // Redireciona para a listagem
        router.push(`/gerirLicencas/${formData.empresaId}`);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-20">
            <br />
            <h1 className="text-4xl font-bold text-gray-800 mb-6">{id ? 'Editar Licença' : 'Cadastro de Licenças'}</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white p-6 shadow-md rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
                <div className="mb-4 sm:col-span-2 lg:col-span-1">
                    <label htmlFor="empresa" className="block text-sm font-medium">Empresa</label>
                    <select
                        id="empresa"
                        name="empresaId"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md text-black"
                        value={formData.empresaId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione uma empresa</option>
                        {empresas.map((empresa) => (
                            <option key={empresa.id} value={empresa.id}>
                                {empresa.razaoSocial}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4 sm:col-span-2 lg:col-span-1.5">
                    <label htmlFor="numero" className="block text-sm font-medium">Número</label>
                    <input
                        type="text"
                        id="numero"
                        name="numero"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        value={formData.numero}
                        onChange={handleChange}
                        pattern="^\S.*"
                        title="O campo não pode começar com um espaço."
                        required
                    />
                </div>

                <div className="mb-4 sm:col-span-2 lg:col-span-1">
                    <label htmlFor="orgaoAmbiental" className="block text-sm font-medium">Órgão Ambiental</label>
                    <input
                        type="text"
                        id="orgaoAmbiental"
                        name="orgaoAmbiental"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        value={formData.orgaoAmbiental}
                        onChange={handleChange}
                        pattern="^\S.*"
                        title="O campo não pode começar com um espaço."
                        required
                    />
                </div>

                <div className="mb-4 sm:col-span-2 lg:col-span-1">
                    <label htmlFor="emissao" className="block text-sm font-medium">Emissão</label>
                    <input
                        type="date"
                        id="emissao"
                        name="emissao"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        value={formData.emissao}
                        onChange={handleChange}
                        pattern="^\S.*"
                        title="O campo não pode começar com um espaço."
                        required
                    />
                </div>

                <div className="mb-4 sm:col-span-2 lg:col-span-1">
                    <label htmlFor="validade" className="block text-sm font-medium">Validade</label>
                    <input
                        type="date"
                        id="validade"
                        name="validade"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        value={formData.validade}
                        onChange={handleChange}
                        pattern="^\S.*"
                        title="O campo não pode começar com um espaço."
                        required
                    />
                </div>

                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition w-full sm:col-span-2 lg:col-span-3">
                    {id ? 'Atualizar' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
}
