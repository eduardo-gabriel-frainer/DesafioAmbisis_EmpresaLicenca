// prisma é o manipulador de dados
import { PrismaClient } from '@prisma/client';
//Cria respostas HTTP dentro do Next
import { NextResponse } from 'next/server';

// instancia do Prisma usado para interagir com as tabelas do banco de dados
const prisma = new PrismaClient();

// Método para Criar Empresa
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

// Método para Listar as Empresas
export async function GET(request: Request) {
    try {
        const empresas = await prisma.empresa.findMany();
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

// Método para Listar uma empresa
export async function GETONE(request: Request) {
    try {
        const empresa = await prisma.empresa.findFirst();
        return NextResponse.json(empresa)
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar empresas" });
    }

}
