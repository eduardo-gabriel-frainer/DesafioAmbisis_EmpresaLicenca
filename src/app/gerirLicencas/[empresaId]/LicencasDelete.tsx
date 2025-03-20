'use client';

import { FaTrash } from "react-icons/fa";

type LicencaActionsProps = {
    id: number;
};

async function handleDelete(id: number) {
    const response = await fetch("/api/crudLicenca", {
        method: "DELETE", // Método DELETE
        headers: {
            "Content-Type": "application/json", // Especifica que o conteúdo é JSON
        },
        body: JSON.stringify({ id }), // Envia o id da empresa para ser deletado
    });

    if (response.ok) {
        alert("Licença deletada com sucesso!");
        window.location.reload(); // Recarrega a página para refletir a remoção
    } else {
        alert("Nao foi possivel deletar a licença");
    }
}

const LicencasActions: React.FC<LicencaActionsProps> = ({ id }) => {
    return (
        <div className="flex space-x-2 justify-center">
            <button
                onClick={() => handleDelete(id)} // Chamando função de deletar
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
                <FaTrash size={18} />
            </button>
        </div>
    );
};

export default LicencasActions;
