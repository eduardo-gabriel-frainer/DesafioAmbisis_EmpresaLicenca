// pages/empresas.js

export default function Empresas() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-20">
            <br />
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Cadastro de Empresas</h1>

            <form className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
                <div className="mb-4 ">
                    <label htmlFor="razaoSocial" className="block text-sm font-medium">Razão Social</label>
                    <input
                        type="text"
                        id="razaoSocial"
                        name="razaoSocial"
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
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition w-full sm:col-span-2 lg:col-span-3">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
