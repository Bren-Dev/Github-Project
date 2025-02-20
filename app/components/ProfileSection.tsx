'use client'

import useSWR from "swr";

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

const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar perfil");
        return res.json();
    });

export default function ProfileSection() {
    const { data: user, error, isLoading } = useSWR<GitHubUser>(
        `https://api.github.com/users/${GITHUB_USERNAME}`,
        fetcher,
        { revalidateOnFocus: true }
    );

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error.message}</p>;

    return (
        <section className="flex flex-col items-center text-center py-6 bg-white rounded-lg w-80">
            <img
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                src={user?.avatar_url || "https://via.placeholder.com/96"}
                alt={user?.name || "Usuário"}
            />
            <h2 className="text-lg font-semibold mt-4">{user?.name || "Nome não disponível"}</h2>
            <p className="text-gray-600 text-sm">{user?.bio || "Sem biografia"}</p>
            <div className="mt-4 space-y-2 text-blue-500 text-sm">
                <p>📄 Magazord - plataforma</p>
                <p>📍 {user?.location || "Localização não disponível"}</p>
                <p>🔗 <a href={user?.blog} target="_blank" rel="noopener noreferrer">{user?.blog || "Sem blog"}</a></p>
                <p>📷 {user?.twitter_username || "Sem Twitter"}</p>
            </div>
        </section>
    );
}
