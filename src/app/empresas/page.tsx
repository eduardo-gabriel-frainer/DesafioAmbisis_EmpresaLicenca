'use client';
import { useState, ChangeEvent, FormEvent } from 'react';

export default function Empresas() {
    const [formData, setFormData] = useState({
        razaoSocial: '',
        cnpj: '',
        cep: '',
        cidade: '',
        estado: '',
        bairro: '',
        complemento: '',
    });

    // Função para lidar com a mudança nos campos do formulário
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));  // Atualiza apenas o campo alterado
    };

    // Função para enviar o formulário
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Enviar dados para a API de forma simples
        const response = await fetch('/api/empresas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Passa os dados diretamente
        });

        if (response.ok) {
            alert('Empresa criada com sucesso!');
            setFormData({ // Limpa os campos após sucesso
                razaoSocial: '',
                cnpj: '',
                cep: '',
                cidade: '',
                estado: '',
                bairro: '',
                complemento: '',
            });
        } else {
            alert('Erro ao criar empresa.');
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
