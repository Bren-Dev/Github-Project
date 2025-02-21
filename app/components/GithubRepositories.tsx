'use client'
import { useMemo, useState } from "react";
import { useGitHubRepos } from "../hooks/UseGithubRepos";
import Image from "next/image";

export default function GitHubRepositories() {
    const username = "Bren-Dev";
    const { repos, loading, error } = useGitHubRepos(username);
    const { repos: starredRepos, loading: loadingStarred, error: errorStarred } = useGitHubRepos(username, true);

    const [activeTab, setActiveTab] = useState<"repos" | "starred">("repos");
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>("All");
    const [selectedType, setSelectedType] = useState<string>("All");
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const languages = useMemo(() => {
        return ["All", ...Array.from(new Set(repos.map(repo => repo.language).filter(Boolean)))];
    }, [repos]);

    const typeOptions = ["All", "Sources", "Forks", "Archived", "Mirrors"];

    const filteredRepos = repos.filter(repo => {
        const matchesLanguage = selectedLanguage === "All" || repo.language === selectedLanguage;
        const matchesType =
            selectedType === "All" ||
            (selectedType === "Sources" && !repo.fork) ||
            (selectedType === "Forks" && repo.fork) ||
            (selectedType === "Archived" && repo.archived) ||
            (selectedType === "Mirrors" && repo.mirror_url);
        const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesLanguage && matchesType && matchesSearch;
    });

    return (
        <div className="bg-white">
            <div className="flex items-center pb-[57px] gap-[57px]">
                <button
                    onClick={() => setActiveTab("repos")}
                    className={`flex items-center space-x-1 ${activeTab === "repos" ? "font-semibold border-b-2 border-[#FD8C73]" : "text-gray-500"}`}
                >
                    <Image src="/bookIcon.svg" alt="Icone Livro" width={18} height={20} priority />
                    Repositories<span className="bg-gray-200 text-xs px-2 py-1 rounded-full">{repos.length}</span>
                </button>

                <button
                    onClick={() => setActiveTab("starred")}
                    className={`flex items-center space-x-1 ${activeTab === "starred" ? "font-semibold border-b-2 border-[#FD8C73]" : "text-gray-500"}`}
                >
                    <Image src="/starIcon.svg" alt="Icone Estrela" width={18} height={20} priority />
                    Starred <span className="bg-gray-200 text-xs px-2 py-1 rounded-full">{starredRepos.length}</span>
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex gap-[16px] border-b border-[#F4F4F4] pb-[6px] w-[444px]">
                    <Image src="/searchIcon.svg" alt="Icone Procurar" width={24} height={24} priority />
                    <input
                        type="text"
                        placeholder="Search Here"
                        className="outline-none w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex space-x-3 relative">
                    <div className="relative">
                        <button
                            className="bg-[linear-gradient(89.89deg,#0056A6_-30.01%,#0587FF_125.65%)] w-[105px] h-10 flex items-center px-[14px] font-normal text-lg leading-[21.09px] text-white rounded-[42px] gap-[16px]"
                            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                        >
                            <Image src="/arrowDownIcon.svg" alt="Icone Seta Para Baixo" width={12} height={6} priority />
                            <span>Type</span>
                        </button>

                        {isTypeDropdownOpen && (
                            <div className="absolute mt-2 w-48 bg-white border shadow-md rounded-md">
                                <ul>
                                    {typeOptions.map((type) => (
                                        <li key={type}
                                            className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${selectedType === type ? 'font-semibold' : ''}`}
                                            onClick={() => {
                                                setSelectedType(type);
                                                setIsTypeDropdownOpen(false);
                                            }}>
                                            {selectedType === type ? "✔ " : ""}{type}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            className="bg-[linear-gradient(89.89deg,#0056A6_-30.01%,#0587FF_125.65%)] w-[145px] h-[40px] flex items-center px-[14px] font-normal text-lg leading-[21.09px] text-white rounded-[42px] gap-[16px]"
                            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                        >
                            <Image src="/arrowDownIcon.svg" alt="Icone Seta Para Baixo" width={12} height={6} priority />
                            <span>Language</span>
                        </button>

                        {isLanguageDropdownOpen && (
                            <div className="absolute mt-2 w-48 bg-white border shadow-md rounded-md">
                                <ul>
                                    {languages.map((lang) => (
                                        <li key={lang}
                                            className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${selectedLanguage === lang ? 'font-semibold' : ''}`}
                                            onClick={() => {
                                                setSelectedLanguage(lang);
                                                setIsLanguageDropdownOpen(false);
                                            }}>
                                            {selectedLanguage === lang ? "✔ " : ""}{lang}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <section className="space-y-6 mt-6">
                {activeTab === "repos" ? (
                    loading ? <p>Carregando...</p> : error ? <p className="text-red-500">{error}</p> : filteredRepos.map((repo) => (
                        <div key={repo.id} className="border-b pb-4">
                            <h3 className="font-semibold">
                                {repo.owner.login} /{" "}
                                <a href={repo.html_url} target="_blank" className="text-[#0587FF]">
                                    {repo.name}
                                </a>
                            </h3>
                            <p className="text-gray-500 text-sm">{repo.description || "Sem descrição"}</p>
                            <p className="text-gray-600 text-sm">{repo.language || "Sem linguagem"}</p>
                            <div className="text-gray-600 text-sm flex space-x-4">
                                <div className="flex gap-2">
                                    <Image src="/fullStarIcon.svg" alt="Icone Estrela" width={18} height={20} priority />
                                    <span>{repo.stargazers_count}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Image src="/forkIcon.svg" alt="Icone Fork" width={18} height={20} priority />
                                    <span>{repo.forks_count}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    loadingStarred ? <p>Carregando...</p> : errorStarred ? <p className="text-red-500">{errorStarred}</p> : starredRepos.map(repo => (
                        <div key={repo.id} className="border-b pb-4">
                            <h3 className="font-semibold">
                                {repo.owner.login} /{" "}
                                <a href={repo.html_url} target="_blank" className="text-blue-600">
                                    {repo.name}
                                </a>
                            </h3>
                            <p className="text-gray-500 text-sm">{repo.description || "Sem descrição"}</p>
                            <div className="text-gray-600 text-sm flex space-x-4">
                                <span>⭐ {repo.stargazers_count}</span>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
}
