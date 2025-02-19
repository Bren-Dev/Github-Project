'use client'

import { useState, useEffect } from "react";

interface GitHubUser {
    avatar_url: string;
    name: string;
    bio: string;
    location: string;
    blog: string;
    twitter_username: string;
    html_url: string;
}

const GITHUB_USERNAME = "Bren-Dev";

export default function ProfileSection() {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
                if (!response.ok) throw new Error("Erro ao buscar perfil");

                const data: GitHubUser = await response.json();
                setUser(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <section className="flex flex-col items-center text-center p-6 bg-white rounded-lg w-80">
            <img
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                src={user?.avatar_url || "https://via.placeholder.com/96"}
                alt={user?.name || "Usuário"}
            />
            <h2 className="text-lg font-semibold mt-4">{GITHUB_USERNAME || "Nome não disponível"}</h2>
            <p className="text-gray-600 text-sm">{user?.bio || "Sem biografia"}</p>
            <div className="mt-4 space-y-2 text-blue-500 text-sm">
                <p>📄 Magazord - plataforma</p>
                <p>📍 Rio do Sul - SC</p>
                <p>🔗 Cordiaz.hub.wack</p>
                <p>📷 Gabriel.s.cordeiro</p>
            </div>
        </section>
    );
}
