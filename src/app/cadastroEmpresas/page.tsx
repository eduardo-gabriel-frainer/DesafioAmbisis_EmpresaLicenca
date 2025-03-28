'use client';

import { useSearchParams } from 'next/navigation'; //acessa parametros URL
import { useRouter } from "next/navigation"; //Direciona a outras pages
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

export default function Empresas() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id'); // Obtém o ID da URL para edição

    // Estado do atual do form = vazio
    const [formData, setFormData] = useState({
        razaoSocial: '',
        cnpj: '',
        cep: '',
        cidade: '',
        estado: '',
        bairro: '',
        complemento: '',
    });

    // Estado de erros
    const [error, setError] = useState('');

    // Carrega Empresa para edição se houver ID, roda após renderização
    useEffect(() => {
        if (id) {
            console.log('ID recebido na URL:', id);
            fetch(`/api/crudEmpresa?id=${id}`)
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error(`Erro na resposta da API: ${res.status}`);
                    }

                    const empresa = await res.json();
                    console.log('Dados recebidos:', empresa);

                    if (!empresa || empresa.length === 0) {
                        throw new Error('Nenhuma empresa encontrada.');
                    }

                    setFormData(empresa);  // Preenche os dados da empresa correta

                })
                .catch((error) => {
                    console.error('Erro ao carregar os dados:', error.message);
                    setError(error.message);
                });
        }
    }, [id]);

    // Atualiza o estado conforme o usuário digita
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'cep' && value.length === 8) {
            buscarEnderecoPorCEP(value);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: name === "cnpj" ? formatCNPJ(value) : value, // Aplica a formatação apenas ao CNPJ
        }));
    };

    // Envia os dados (POST para criação, PUT para edição)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Verifica se o CNPJ tem exatamente 14 caracteres
        if (formData.cnpj.replace(/\D/g, '').length !== 14) {
            alert('O CNPJ deve ter exatamente 14 dígitos numéricos');
            return;
        }

        // Verifica se o CEP tem exatamente 8 caracteres
        if (formData.cep.replace(/\D/g, '').length !== 8) {
            alert('O CEP deve ter exatamente 8 dígitos numéricos');
            return;
        }

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/crudEmpresa?id=${id}` : '/api/crudEmpresa';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar empresa.');
            }

            alert(id ? 'Empresa atualizada!' : 'Empresa cadastrada!');

            // Redireciona para a listagem
            router.push('/listarEmpresas');
        } catch (error) {
            console.error(error);
            setError('Erro ao salvar empresa.');
        }
    };

    //Formatar CNPJ
    const formatCNPJ = (value: string) => {
        // Remove tudo que não for número
        value = value.replace(/\D/g, '');

        // Aplica a máscara do CNPJ (00.000.000/0000-00)
        return value
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .slice(0, 18);
    };

    // Função para buscar dados do CEP
    const buscarEnderecoPorCEP = async (cep: string) => {
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    throw new Error('CEP não encontrado.');
                }

                setFormData((prev) => ({
                    ...prev,
                    cidade: data.localidade,
                    estado: data.uf,
                    bairro: data.bairro,
                    complemento: data.complemento || '',
                }));
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
                setError('Não foi possível buscar os dados do CEP.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-20">
            <br />
            <h1 className="text-4xl font-bold text-gray-800 mb-6">{id ? 'Editar Empresa' : 'Cadastro de Empresas'}</h1>

            <form
                className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700"
                onSubmit={handleSubmit}
            >
                <div className="mb-4 ">
                    <label htmlFor="razaoSocial" className="block text-sm font-medium">Razão Social</label>
                    <input
                        type="text"
                        id="razaoSocial"
                        name="razaoSocial"
                        value={formData.razaoSocial}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md "
                        pattern="^\S.*"
                        title="O campo não pode começar com um espaço."
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="cnpj" className="block text-sm font-medium">CNPJ</label>
                    <input
                        type="text"
                        id="cnpj"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        pattern="^\S.*"
                        title="O campo não pode começar com um espaço."
                        required

                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="cep" className="block text-sm font-medium">CEP</label>
                    <input
                        type="number"
                        id="cep"
                        name="cep"
                        value={formData.cep}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        pattern="^\S.*"
                        title="O campo não pode começar com um espaço."
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="cidade" className="block text-sm font-medium">Cidade</label>
                    <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        pattern="^\S.*"
                        title="O campo não pode começar com um espaço."
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="estado" className="block text-sm font-medium">Estado</label>
                    <input
                        type="text"
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        pattern="^\S.*"
                        title="O campo não pode começar com um espaço."
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="bairro" className="block text-sm font-medium">Bairro</label>
                    <input
                        type="text"
                        id="bairro"
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        pattern="^\S.*"
                        title="O campo não pode começar com um espaço."
                        required
                    />
                </div>

                <div className="mb-4 sm:col-span-3">
                    <label htmlFor="complemento" className="block text-sm font-medium">Complemento</label>
                    <input
                        type="text"
                        id="complemento"
                        name="complemento"
                        value={formData.complemento}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        pattern="^\S.*"
                        title="O campo não pode começar com um espaço."
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition w-full sm:col-span-2 lg:col-span-3"
                >
                    {id ? 'Atualizar' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
}