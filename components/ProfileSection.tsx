'use client';

import Image from "next/image";
import useSWR from "swr";
import { useState } from "react";

interface GitHubUser {
    avatar_url: string;
    name: string;
    bio: string;
}
const fetcher = (url: string, token: string | unknown) =>
    fetch(url, { headers: { Authorization: `token ${token}` } })
        .then(res => res.ok ? res.json() : Promise.reject(new Error("Erro ao buscar perfil")));

const infoUser = [
    { src: "/enterpriseIcon.svg", alt: "Icone Livro", text: "Magazord - plataforma" },
    { src: "/pinIcon.svg", alt: "Icone Livro", text: "Rio do Sul - SC" },
    { src: "/chainIcon.svg", alt: "Icone Livro", text: "Brenda.hub.uok" },
    { src: "/instagramIcon.svg", alt: "Icone Livro", text: "Brend_ane" }
]
export default function ProfileSection() {
    const username = "Bren-Dev";
    const token = "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";
    const { data: user, error, isLoading } = useSWR<GitHubUser>(
        username ? [`https://api.github.com/users/${username}`, token] : null,
        ([url, token]) => fetcher(url, token)
    );
    const [isExpanded, setIsExpanded] = useState(false);

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error.message}</p>;

    return (
        <section className="flex flex-col bg-white rounded-lg pb-[49px] lg:pb-0 ">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <img
                        className="md:w-[150px] md:h-[150px] w-[104px] h-[104px] rounded-full"
                        src={user?.avatar_url || "https://via.placeholder.com/96"}
                        alt={user?.name || "Usuário"}
                    />
                    <div className="absolute left-[70%] bottom-[1%] flex items-center justify-center w-[27px] h-[27px] md:w-10 md:h-10 rounded-full shadow-[0px_0px_16px_0px_#4F4F5026] text-[10px] md:text-[18px] bg-white">👽</div>
                </div>
                <p className="text-xl lg:text-2xl font-bold text-neutral-800 mt-4 lg:mt-6">{user?.name || username}</p>
                <p className=" text-[12px] leading-[14.06px] lg:text-base text-[#989898] mt-1 max-w-[261px] text-center lg:font-normal">{user?.bio || "Head development team Front-End Magazord - Tagged (#BZ)"}</p>
                <div className="flex flex-col items-center gap-[11px] sm:hidden" onClick={() => setIsExpanded(!isExpanded)}>
                    <p className="text-sm text-[#0587FF] pt-[24px]">Informações Adicionais</p>
                    <button>
                        <Image src="/arrowDownBlueIcon.svg" alt="Icone Seta Para Baixo" width={12} height={6} priority className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>
            <div className={`font-normal text-sm leading-[16.41px] mt-4 sm:mt-11 bg-[#F8F8F8] sm:bg-transparent p-4 sm:p-0 lg:mt-8 flex flex-col gap-4 w-full sm:w-auto text-[#0587FF] ${isExpanded ? 'block' : 'hidden sm:flex'}`}>
                {infoUser.map((item, index) => (
                    <div key={index} className="flex gap-[10px]">
                        <Image src={item.src} alt={item.alt} width={16} height={16} priority className="lg:w-[18px] lg:h-[20px]" />
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}