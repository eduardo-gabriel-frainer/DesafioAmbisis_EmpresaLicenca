// prisma é o manipulador de dados
import { PrismaClient } from '@prisma/client';
// Cria respostas HTTP dentro do Next
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    // Desestrutura os dados recebidos no corpo da requisição
    const { numero, orgaoAmbiental, emissao, validade, empresaId } = await request.json();

    // Converte as datas para o formato ISO 8601, caso necessário
    const emisaoDate = new Date(emissao); // converte a string para um objeto Date
    const validadeDate = new Date(validade);

    // Converte o empresaId para número (Int)
    const empresaIdInt = parseInt(empresaId, 10);

    // Criação de uma nova licença no banco de dados
    const newLicenca = await prisma.licenca.create({
        data: {
            numero,
            orgaoAmbiental,
            emissao: emisaoDate.toISOString(), // converte para formato ISO 8601
            validade: validadeDate.toISOString(),
            empresaId: empresaIdInt,
        },
    });

    // Retorna a nova licença criada
    return NextResponse.json(newLicenca, { status: 201 });
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const empresaId = searchParams.get('empresaId');

    if (!empresaId) {
        return NextResponse.json({ error: "empresaId é necessário" }, { status: 400 });
    }

    try {
        const licencas = await prisma.licenca.findMany({
            where: {
                empresaId: parseInt(empresaId, 10), // Filtra as licenças pelo ID da empresa
            },
        });

        return NextResponse.json(licencas, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar licenças:", error);
        return NextResponse.json({ error: "Erro ao buscar licenças" }, { status: 500 });
    }
}
