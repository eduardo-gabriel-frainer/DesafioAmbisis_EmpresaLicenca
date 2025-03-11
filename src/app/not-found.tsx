export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-6xl font-bold text-green-600">Erro 404</h1>
            <p className="text-lg mt-4">A página informada não existe.</p>
            <a href="/" className="mt-10 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-blue-700 transition">
                Voltar para a Home
            </a>
        </div>
    );
}
