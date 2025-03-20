// Hidrata o botão delete no cliente com JS para a funcao onClick funcionar.
'use client';

import { FaTrash } from "react-icons/fa";

type EmpresaActionsProps = {
    empresaId: number;
};

async function handleDelete(id: number) {
    const response = await fetch("/api/crudEmpresa", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Envia o id da empresa para ser deletado
    });

    if (response.ok) {
        alert("Empresa deletada com sucesso!");
        window.location.reload(); // Recarrega a página para refletir a remoção
    } else {
        alert("Erro. A empresa tem Licenças associadas!!!");
    }
}

const EmpresaActions: React.FC<EmpresaActionsProps> = ({ empresaId }) => {
    return (
        <div className="flex space-x-2 justify-center">
            <button
                onClick={() => handleDelete(empresaId)} // Chamando função de deletar
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
                <FaTrash size={18} />
            </button>
        </div>
    );
};

export default EmpresaActions;
