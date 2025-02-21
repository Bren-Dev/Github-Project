'use client';

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

const fetcher = (url: string, token: string) =>
    fetch(url, {
        headers: { Authorization: `token ${token}` },
    }).then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar perfil");
        return res.json();
    });

export default function ProfileSection() {
    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

    const { data: user, error, isLoading } = useSWR<GitHubUser>(
        username ? [`https://api.github.com/users/${username}`, token] : null,
        ([url, token]) => fetcher(url, token)
    );

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error.message}</p>;

    return (
        <section className="flex flex-col items-center bg-white rounded-lg ">
            <img
                className="w-[150px] h-[150px] rounded-full"
                src={user?.avatar_url || "https://via.placeholder.com/96"}
                alt={user?.name || "Usuário"}
            />
            <h2 className="text-lg font-semibold mt-4">{user?.name || username}</h2>
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
