'use client';

import Image from "next/image";
import useSWR from "swr";

interface GitHubUser {
    avatar_url: string;
    name: string;
    bio: string;
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
                className="md:w-[150px] md:h-[150px] w-[104px] h-[104px] rounded-full"
                src={user?.avatar_url || "https://via.placeholder.com/96"}
                alt={user?.name || "Usuário"}
            />

            <p className="text-lg font-semibold mt-4">{user?.name || username}</p>
            <p className="text-gray-600 text-sm">{user?.bio || "Sem biografia"}</p>
            <p className="font-normal text-sm leading-[16.41px] text-[#0587FF] pt-[24px] md:hidden">Informações Adicionais</p>
            <div className="mt-4 space-y-2 text-blue-500 text-sm">
                <div className="flex gap-[10px]"> <Image src="/enterpriseIcon.svg" alt="Icone Livro" width={18} height={20} priority /> <p>Magazord - plataforma </p></div>
                <div className="flex gap-[10px]"> <Image src="/pinIcon.svg" alt="Icone Livro" width={18} height={20} priority /> <p>Rio do Sul - SC</p></div>
                <div className="flex gap-[10px]"> <Image src="/chainIcon.svg" alt="Icone Livro" width={18} height={20} priority /> <p>Brenda.hub.uok </p></div>
                <div className="flex gap-[10px]" > <Image src="/instagramIcon.svg" alt="Icone Livro" width={18} height={20} priority /> <p>Brend_ane </p></div>
            </div>
        </section>
    );
}
