'use client';

import Image from "next/image";
import useSWR from "swr";
import { useState } from "react";

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
    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    const { data: user, error, isLoading } = useSWR<GitHubUser>(
        username ? [`https://api.github.com/users/${username}`, token] : null,
        ([url, token]) => fetcher(url, token)
    );

    const [isExpanded, setIsExpanded] = useState(false);

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error.message}</p>;

    return (
        <section className="flex flex-col  bg-white rounded-lg pb-[49px] lg:pb-[0px]">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <img
                        className="md:w-[150px] md:h-[150px] w-[104px] h-[104px] rounded-full"
                        src={user?.avatar_url || "https://via.placeholder.com/96"}
                        alt={user?.name || "Usuário"}
                    />

                    <div className="absolute left-[70%] bottom-[1%] flex items-center justify-center w-[27px] h-[27px] lg:w-10 lg:h-10 rounded-full shadow-[0px_0px_16px_0px_#4F4F5026] text-[10px] lg:text-[18px] bg-white">👽</div>
                </div>
                <p className="text-xl leading-[23.44px] font-bold lg:text-2xl lg:leading-[28.13px] text-neutral-800 mt-6">{user?.name || username}</p>
                <p className="font-normal text-base leading-[18.75px] text-[#989898] mt-1 max-w-[261px] text-center">{user?.bio || "Head development team Front-End Magazord - Tagged (#BZ)"}</p>
                <div className="flex flex-col items-center gap-[11px] sm:hidden " onClick={() => setIsExpanded(!isExpanded)}>
                    <p className="font-normal text-sm leading-[16.41px] text-[#0587FF] pt-[24px]">Informações Adicionais</p>
                    <button >
                        <Image
                            src="/arrowDownBlueIcon.svg"
                            alt="Icone Seta Para Baixo"
                            width={12}
                            height={6}
                            priority
                            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                    </button>
                </div>
            </div>
            <div className={`mt-4 sm:mt-11 bg-[#F8F8F8] font-normal text-sm leading-[16.41px] rounded-2xl sm:bg-transparent p-4 sm:p-0 lg:mt-8 flex flex-col gap-4 w-full sm:w-auto text-[#0587FF] ${isExpanded ? 'block' : 'hidden sm:flex'} `}>
                <div className="flex gap-[10px]">
                    <Image src="/enterpriseIcon.svg" alt="Icone Livro" width={18} height={20} priority />
                    <p>Magazord - plataforma</p>
                </div>
                <div className="flex gap-[10px]">
                    <Image src="/pinIcon.svg" alt="Icone Livro" width={18} height={20} priority />
                    <p>Rio do Sul - SC</p>
                </div>
                <div className="flex gap-[10px]">
                    <Image src="/chainIcon.svg" alt="Icone Livro" width={18} height={20} priority />
                    <p>Brenda.hub.uok</p>
                </div>
                <div className="flex gap-[10px]">
                    <Image src="/instagramIcon.svg" alt="Icone Livro" width={18} height={20} priority />
                    <p>Brend_ane</p>
                </div>
            </div>
        </section>
    );
}