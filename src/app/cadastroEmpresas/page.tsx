// 'use client';
// import { useRouter } from 'next/router';
// import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

// export default function Empresas() {

//     const [formData, setFormData] = useState({
//         razaoSocial: '',
//         cnpj: '',
//         cep: '',
//         cidade: '',
//         estado: '',
//         bairro: '',
//         complemento: '',
//     });

//     // Função para lidar com a mudança nos campos do formulário
//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));  // Atualiza apenas o campo alterado
//     };

//     // Função para enviar o formulário
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         // Enviar dados para a API de forma simples
//         const response = await fetch('/api/crudEmpresa', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData), // Passa os dados diretamente
//         });

//         if (response.ok) {
//             alert('Empresa criada com sucesso!');
//             setFormData({ // Limpa os campos após sucesso
//                 razaoSocial: '',
//                 cnpj: '',
//                 cep: '',
//                 cidade: '',
//                 estado: '',
//                 bairro: '',
//                 complemento: '',
//             });
//         } else {
//             alert('Erro ao criar empresa.');
//         }
//     };

//     return (
//         <div className="flex flex-col items-center min-h-screen bg-gray-100 p-20">
//             <br />
//             <h1 className="text-4xl font-bold text-gray-800 mb-6">Cadastro de Empresas</h1>

//             <form
//                 className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700"
//                 onSubmit={handleSubmit}
//             >
//                 <div className="mb-4 ">
//                     <label htmlFor="razaoSocial" className="block text-sm font-medium">Razão Social</label>
//                     <input
//                         type="text"
//                         id="razaoSocial"
//                         name="razaoSocial"
//                         value={formData.razaoSocial}
//                         onChange={handleChange}
//                         className="mt-2 p-2 w-full border border-gray-300 rounded-md "
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label htmlFor="cnpj" className="block text-sm font-medium">CNPJ</label>
//                     <input
//                         type="text"
//                         id="cnpj"
//                         name="cnpj"
//                         value={formData.cnpj}
//                         onChange={handleChange}
//                         className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label htmlFor="cep" className="block text-sm font-medium">CEP</label>
//                     <input
//                         type="text"
//                         id="cep"
//                         name="cep"
//                         value={formData.cep}
//                         onChange={handleChange}
//                         className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label htmlFor="cidade" className="block text-sm font-medium">Cidade</label>
//                     <input
//                         type="text"
//                         id="cidade"
//                         name="cidade"
//                         value={formData.cidade}
//                         onChange={handleChange}
//                         className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label htmlFor="estado" className="block text-sm font-medium">Estado</label>
//                     <input
//                         type="text"
//                         id="estado"
//                         name="estado"
//                         value={formData.estado}
//                         onChange={handleChange}
//                         className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label htmlFor="bairro" className="block text-sm font-medium">Bairro</label>
//                     <input
//                         type="text"
//                         id="bairro"
//                         name="bairro"
//                         value={formData.bairro}
//                         onChange={handleChange}
//                         className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4 sm:col-span-3">
//                     <label htmlFor="complemento" className="block text-sm font-medium">Complemento</label>
//                     <input
//                         type="text"
//                         id="complemento"
//                         name="complemento"
//                         value={formData.complemento}
//                         onChange={handleChange}
//                         className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition w-full sm:col-span-2 lg:col-span-3"
//                 >
//                     Cadastrar
//                 </button>
//             </form>
//         </div>
//     );
// }

'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

export default function Empresas() {
    const searchParams = useSearchParams();
    const router = useRouter(); // Correto para app router
    const id = searchParams.get('id'); // Obtém o ID da URL para edição

    // Estado do formulário
    const [formData, setFormData] = useState({
        razaoSocial: '',
        cnpj: '',
        cep: '',
        cidade: '',
        estado: '',
        bairro: '',
        complemento: '',
    });

    const [loading, setLoading] = useState(!!id); // Define o loading apenas se houver um ID
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            console.log('ID recebido na URL:', id);
            fetch(`/api/crudEmpresa?id=${id}`)
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error(`Erro na resposta da API: ${res.status}`);
                    }
                    const data = await res.json();
                    console.log('Dados recebidos:', data);

                    if (!data || data.length === 0) {
                        throw new Error('Nenhuma empresa encontrada.');
                    }

                    // Filtra a empresa pelo ID recebido da URL
                    const empresa = data.find((item: { id: number }) => item.id === parseInt(id));

                    if (empresa) {
                        setFormData(empresa);  // Preenche os dados da empresa correta
                    } else {
                        throw new Error('Empresa não encontrada.');
                    }

                    setLoading(false); // Termina o loading
                })
                .catch((error) => {
                    console.error('Erro ao carregar os dados:', error.message);
                    setError(error.message);
                    setLoading(false);
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
            .slice(0, 18); // Limita ao tamanho máximo do CNPJ
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
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Cadastro de Empresas</h1>

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
                        required

                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="cep" className="block text-sm font-medium">CEP</label>
                    <input
                        type="text"
                        id="cep"
                        name="cep"
                        value={formData.cep}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
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
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition w-full sm:col-span-2 lg:col-span-3"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}