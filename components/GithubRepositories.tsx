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
    const [activeDropdown, setActiveDropdown] = useState<"language" | "type" | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [tempSearchTerm, setTempSearchTerm] = useState("");
    const typeOptions = ["All", "Sources", "Forks", "Archived", "Mirrors"];

    const languages = useMemo(() => ["All", ...new Set(repos.concat(starredRepos).map(repo => repo.language).filter(Boolean))], [repos, starredRepos]);

    const filterRepos = (repos: GitHubRepo[]) => repos.filter(repo =>
        (selectedLanguage === "All" || repo.language === selectedLanguage) &&
        (selectedType === "All" ||
            (selectedType === "Sources" && !repo.fork) ||
            (selectedType === "Forks" && repo.fork) ||
            (selectedType === "Archived" && repo.archived) ||
            (selectedType === "Mirrors" && repo.mirror_url)) &&
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredRepos = filterRepos(repos);
    const filteredStarredRepos = filterRepos(starredRepos);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && setSearchTerm(tempSearchTerm);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempSearchTerm(e.target.value);
        if (e.target.value === "") setSearchTerm("");
    };
    const toggleDropdown = (dropdown: "language" | "type") => setActiveDropdown(prev => prev === dropdown ? null : dropdown);

    return (
        <div className="bg-white">
            <div className="flex items-center sm:pb-[30px] lg:pb-[55px] gap-[30px] lg:gap-[55px]">
                {["repos", "starred"].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab as "repos" | "starred")}
                        className={`flex pl-[8px] pb-[8px] items-center ${activeTab === tab ? "font-semibold border-b-2 border-[#FD8C73]" : "text-gray-500"}`}>
                        <Image src={`/${activeTab === tab ? "active" : "inactive"}${tab === "repos" ? "Book" : "Star"}Icon.svg`} alt={`Icone ${tab === "repos" ? "Livro" : "Estrela"}`} width={24} height={24} priority />
                        <span className="lg:pl-[16px] lg:pr-[8px] pr-[16px] pl-[8px] text-base font-normal lg:text-lg lg:leading-[21.09px]">{tab === "repos" ? "Repositories" : "Starred"}</span>
                        <span className="border font-normal text-sm leading-[16.41px] text-[#989898] rounded-[59px] border-solid border-[#DBDBDB] bg-[#F8F8F8] py-[4px] px-[12px] lg:px-[16px]">{tab === "repos" ? repos.length : starredRepos.length}</span>
                    </button>
                ))}
            </div>

            <div className="flex flex-row-reverse lg:items-center sm:flex-col-reverse lg:flex-row justify-between mt-6 sm:mt-0">
                <div className="flex gap-[16px] border-b border-[#F4F4F4] pb-[6px] w-[444px] mb-[40px] lg:mb-0">
                    <Image src="/searchIcon.svg" alt="Icone Procurar" width={24} height={24} priority />
                    <input type="text" placeholder="Search Here" className="outline-none w-full" value={tempSearchTerm} onChange={handleInputChange} onKeyDown={handleSearch} />
                </div>
                <div className="flex gap-2 lg:gap-4 sm:pb-[28px] lg:pb-0">
                    {["Type", "Language"].map((label, idx) => (
                        <Dropdown key={label} label={label} options={idx === 0 ? typeOptions : languages} selected={idx === 0 ? selectedType : selectedLanguage}
                            onSelect={idx === 0 ? setSelectedType : setSelectedLanguage} isOpen={activeDropdown === (idx === 0 ? "type" : "language")}
                            toggle={() => toggleDropdown(idx === 0 ? "type" : "language")} className={`lg:w-[${idx === 0 ? 105 : 145}px] lg:h-10 w-[${idx === 0 ? 88 : 120}px] h-8`} />
                    ))}
                </div>
            </div>

            <section className="lg:mt-10">
                {activeTab === "repos" ? (loading ? <p>Carregando...</p> : error ? <p className="text-red-500">{error}</p> : filteredRepos.map(repo => <RepoCard key={repo.id} repo={repo} />))
                    : loadingStarred ? <p>Carregando...</p> : errorStarred ? <p className="text-red-500">{errorStarred}</p> : filteredStarredRepos.map(repo => <RepoCard key={repo.id} repo={repo} isStarred />)}
            </section>
        </div>
    );
}