import { Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
    return (
        <div className="text-center text-white">

            <h2 className="mb-4">Copyright © 2025 Todos os direitos reservados | Eduardo Gabriel Frainer</h2>
            <div className="flex justify-center gap-6">
                <a href="https://www.instagram.com/eduardogfrainer/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-8 h-8 hover:text-gray-400 transition" />
                </a>
                <a href="https://www.linkedin.com/in/eduardo-gabriel-frainer-a5a592332/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-8 h-8 hover:text-gray-400 transition" />
                </a>
                <a href="https://github.com/eduardo-gabriel-frainer" target="_blank" rel="noopener noreferrer">
                    <Github className="w-8 h-8 hover:text-gray-400 transition" />
                </a>
            </div>
        </div>
    );
}
