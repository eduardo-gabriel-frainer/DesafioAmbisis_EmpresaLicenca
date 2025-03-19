"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-green-600 text-white py-4 px-6 shadow-md">
            <div className="container mx-auto flex justify-between items-center">

                <Link href="/" className="text-2xl font-bold">
                    Desafio Ambisis
                </Link>

                {/* Menu para telas médias ou maiores (md) */}
                <nav className="space-x-6 hidden lg:block">
                    <Link href="/listarEmpresas" className="hover:text-gray-200 pr-3">
                        Listar Empresas
                    </Link>
                    <Link href="/cadastroEmpresas" className="hover:text-gray-200 pr-3">
                        Cadastro de Empresas
                    </Link>
                    <Link href="/cadastroLicencas" className="hover:text-gray-200">
                        Cadastro de Licenças
                    </Link>
                </nav>

                {/* Container do botão "Início" e menu hambúrguer */}
                <div className="flex items-center space-x-4">
                    {/* Botão Hamburguer para telas menores que 1024px */}
                    <button
                        className="lg:hidden text-white text-3xl focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>

                    <Link href="/">
                        <button className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-100">
                            Início
                        </button>
                    </Link>
                </div>
            </div>

            {/* Menu suspenso no mobile em resoluções menores que lg */}
            {menuOpen && (
                <div className="absolute top-16 right-6 bg-green-700 text-white rounded-md shadow-lg p-4 flex flex-col space-y-3 lg:hidden">
                    <Link href="/listarEmpresas" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>
                        Listar Empresas
                    </Link>
                    <Link href="/cadastroEmpresas" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>
                        Cadastro de Empresas
                    </Link>
                    <Link href="/cadastroLicencas" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>
                        Cadastro de Licenças
                    </Link>
                </div>
            )}
        </header>
    );
}
