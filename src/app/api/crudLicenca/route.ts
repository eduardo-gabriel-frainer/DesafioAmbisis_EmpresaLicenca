'use-client'
// prisma é o manipulador de dados
import { PrismaClient } from '@prisma/client';
// Cria respostas HTTP dentro do Next
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { numero, orgaoAmbiental, emissao, validade, empresaId } = await request.json();

        // Certifique-se de que empresaId é um número válido
        const empresaIdInt = parseInt(empresaId, 10);
        if (isNaN(empresaIdInt)) {
            return NextResponse.json({ error: "empresaId inválido" }, { status: 400 });
        }

        // Criar nova licença no banco de dados
        const newLicenca = await prisma.licenca.create({
            data: {
                numero,
                orgaoAmbiental,
                emissao, // Agora armazenado como string
                validade, // Agora armazenado como string
                empresaId: empresaIdInt,
            },
        });

        return NextResponse.json(newLicenca, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar licença:", error);
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const empresaId = searchParams.get('empresaId');
    const licencaId = searchParams.get('id');

    try {
        if (licencaId) {
            // Busca por uma licença específica
            const licenca = await prisma.licenca.findUnique({
                where: { id: Number(licencaId) },
            });

            if (!licenca) {
                return NextResponse.json({ error: "Licença não encontrada" }, { status: 404 });
            }

            return NextResponse.json(licenca, { status: 200 });
        }

        if (empresaId) {
            // Busca todas as licenças de uma empresa específica
            const empresa = await prisma.empresa.findUnique({
                where: { id: Number(empresaId) },
                include: { licencas: true },
            });

            if (!empresa) {
                return NextResponse.json({ error: "Empresa não encontrada" }, { status: 404 });
            }

            return NextResponse.json(empresa, { status: 200 });
        }

        return NextResponse.json({ error: "Parâmetro 'id' ou 'empresaId' é necessário" }, { status: 400 });

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
    }
}


// Método para Deletar as Empresas
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        await prisma.licenca.delete({
            where: { id: Number(id) },
        });

        await prisma.licenca.findMany();

        return NextResponse.json({ message: "Deletado com sucesso" }, { status: 201 });
    } catch (error) {
        console.error("Erro ao deletar licenca:", error);
        return NextResponse.json({ error: "Erro interno ao deletar" }, { status: 500 });
    }

}

// Método para Atualizar a Licenca
export async function PUT(request: Request) {
    const { id, numero, orgaoAmbiental, emissao, validade } = await request.json();

    const licencaAtualizada = await prisma.licenca.update({
        where: { id: Number(id) },
        data: {
            numero,
            orgaoAmbiental,
            emissao,
            validade,
        },
    });

    return NextResponse.json(licencaAtualizada);
}