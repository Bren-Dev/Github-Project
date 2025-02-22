"use client";
import { useMemo, useState } from "react";
import { useGitHubRepos, GitHubRepo } from "../hooks/UseGithubRepos";
import Image from "next/image";
import Dropdown from "./Dropdown";
import RepoCard from "./RepoCard";

export default function GitHubRepositories() {
    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
    const { repos, loading, error } = useGitHubRepos(username);
    const { repos: starredRepos, loading: loadingStarred, error: errorStarred } = useGitHubRepos(username, true);

    const [activeTab, setActiveTab] = useState<"repos" | "starred">("repos");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
    const [selectedType, setSelectedType] = useState<string>("All");
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const typeOptions = ["All", "Sources", "Forks", "Archived", "Mirrors"];

    const languages = useMemo(() => {
        const allLanguages = repos.concat(starredRepos).map((repo) => repo.language).filter(Boolean);
        return ["All", ...Array.from(new Set(allLanguages))];
    }, [repos, starredRepos]);

    const filterRepos = (repos: GitHubRepo[]) => {
        return repos.filter((repo) => {
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
    };

    const filteredRepos = filterRepos(repos);
    const filteredStarredRepos = filterRepos(starredRepos);


    return (
        <div className="bg-white">
            <div className="flex items-center pb-[55px] gap-[57px]">
                <button
                    onClick={() => setActiveTab("repos")}
                    className={`flex pl-[8px] pb-[8px] items-center space-x-1 ${activeTab === "repos" ? "font-semibold border-b-2 border-[#FD8C73]" : "text-gray-500"}`}
                >
                    <Image src={activeTab === "repos" ? "/activeBookIcon.svg" : "/inactiveBookIcon.svg"} alt="Icone Livro" width={18} height={20} priority />
                    <span className="pl-[16px] pr-[8px]">Repositories</span>  <span className="border font-normal text-sm leading-[16.41px] text-[#989898] rounded-[59px] border-solid border-[#DBDBDB] bg-[#F8F8F8] py-[4px] px-[16px]">{repos.length}</span>
                </button>
                <button
                    onClick={() => setActiveTab("starred")}
                    className={`flex pl-[8px] pb-[8px] items-center space-x-1 ${activeTab === "starred" ? "font-semibold border-b-2 border-[#FD8C73]" : "text-gray-500"}`}
                >
                    <Image src={activeTab === "starred" ? "/activeStarIcon.svg" : "/inactiveStarIcon.svg"} alt="Icone Estrela" width={18} height={20} priority />
                    <span className="pl-[16px] pr-[8px]">Starred</span>   <span className="border font-normal text-sm leading-[16.41px] text-[#989898] rounded-[59px] border-solid border-[#DBDBDB] bg-[#F8F8F8] py-[4px] px-[16px]">{starredRepos.length}</span>
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
                <div className="flex space-x-3">
                    <Dropdown
                        label="Type"
                        options={typeOptions}
                        selected={selectedType}
                        onSelect={setSelectedType}
                        isOpen={isTypeDropdownOpen}
                        toggle={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                        className="w-[105px] h-10"
                    />
                    <Dropdown
                        label="Language"
                        options={languages}
                        selected={selectedLanguage}
                        onSelect={setSelectedLanguage}
                        isOpen={isLanguageDropdownOpen}
                        toggle={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                        className="w-[145px] h-10"
                    />
                </div>
            </div>

            <section className="space-y-6 mt-6">
                {activeTab === "repos" ? (
                    loading ? (
                        <p>Carregando...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        filteredRepos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
                    )
                ) : loadingStarred ? (
                    <p>Carregando...</p>
                ) : errorStarred ? (
                    <p className="text-red-500">{errorStarred}</p>
                ) : (
                    filteredStarredRepos.map((repo) => <RepoCard key={repo.id} repo={repo} isStarred />)
                )}
            </section>
        </div>
    );
}