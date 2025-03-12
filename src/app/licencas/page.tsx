export default function Licencas() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-20">
            <br />
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Cadastro de Licenças</h1>

            <form className="w-full max-w-4xl bg-white p-6 shadow-md rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">

                <div className="mb-4 sm:col-span-2 lg:col-span-1">
                    <label htmlFor="empresa" className="block text-sm font-medium">Empresa</label>
                    <select
                        id="empresa"
                        name="empresa"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Selecione uma empresa</option>
                        <option value="empresa1">Empresa 1</option>
                        <option value="empresa2">Empresa 2</option>
                        <option value="empresa3">Empresa 3</option>
                    </select>
                </div>


                <div className="mb-4 sm:col-span-2 lg:col-span-1.5">
                    <label htmlFor="numero" className="block text-sm font-medium">Número</label>
                    <input
                        type="text"
                        id="numero"
                        name="numero"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Segunda linha - Órgão Ambiental, Emissão e Validade */}
                <div className="mb-4 sm:col-span-2 lg:col-span-1">
                    <label htmlFor="orgaoAmbiental" className="block text-sm font-medium">Órgão Ambiental</label>
                    <input
                        type="text"
                        id="orgaoAmbiental"
                        name="orgaoAmbiental"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
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
                        required
                    />
                </div>

                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition w-full sm:col-span-2 lg:col-span-3">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
