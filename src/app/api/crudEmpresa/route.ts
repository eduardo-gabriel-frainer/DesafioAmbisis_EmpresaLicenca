import { PrismaClient } from '@prisma/client'; // Manipulador de dados
import { NextResponse } from 'next/server'; //Cria respostas HTTP dentro do Next

//Instância prisma
const prisma = new PrismaClient();

// Método para Criar Empresa, recebe uma request
export async function POST(request: Request) {
    const { razaoSocial, cnpj, cep, cidade, estado, bairro, complemento } = await request.json();
    // Converte o corpo da requisição de JSON para um objeto TS

    const newEmpresa = await prisma.empresa.create({
        data: {
            razaoSocial,
            cnpj,
            cep,
            cidade,
            estado,
            bairro,
            complemento,
        },
    });
    return NextResponse.json(newEmpresa, { status: 201 });
}

// Método para Listar as Empresas
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        // Se houver id pega uma empresa especifica
        if (id) {
            const empresa = await prisma.empresa.findUnique({
                where: { id: parseInt(id) },
            });

            if (!empresa) {
                return NextResponse.json({ error: "Empresa não encontrada" }, { status: 404 })
            }

            // Retorna uma empresa especifica buscada pelo id
            return NextResponse.json(empresa)
        }

        // Pega todas as empresas
        const empresas = await prisma.empresa.findMany();

        //retorna todas as empresas
        return NextResponse.json(empresas)
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar empresas" });
    }
}

// Método para Deletar as Empresas
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        await prisma.empresa.delete({
            where: { id: Number(id) },
        });

        await prisma.empresa.findMany();

        return NextResponse.json({ message: "Deletado com sucesso" }, { status: 201 });
    } catch (error) {
        console.error("Erro ao deletar empresa:", error);
        return NextResponse.json({ error: "Erro interno ao deletar" }, { status: 500 });
    }

}

// Método para Atualizar a Empresa
export async function PUT(request: Request) {
    const { id, razaoSocial, cnpj, cep, cidade, estado, bairro, complemento } = await request.json();

    const empresaAtualizada = await prisma.empresa.update({
        where: { id: Number(id) },
        data: {
            razaoSocial,
            cnpj,
            cep,
            cidade,
            estado,
            bairro,
            complemento,
        },
    });

    return NextResponse.json(empresaAtualizada);
}
