// prisma é o manipulador de dados
import { PrismaClient } from '@prisma/client';
//Cria respostas HTTP dentro do Next
import { NextResponse } from 'next/server';

// instancia do Prisma usado para interagir com as tabelas do banco de dados
const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { razaoSocial, cnpj, cep, cidade, estado, bairro, complemento } = await request.json();
    // aguarda o corpo da requisição ser convertido para Json

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

export async function GET(request: Request) {
    try {
        const empresas = await prisma.empresa.findMany();
        return NextResponse.json(empresas)
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar empresas" });
    }

}