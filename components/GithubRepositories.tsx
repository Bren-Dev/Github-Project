"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGitHubRepos, GitHubRepo } from "../hooks/UseGithubRepos";
import Image from "next/image";
import Dropdown from "./Dropdown";
import RepoCard from "./RepoCard";

export default function GitHubRepositories() {
    const username = process.env.NEXT_PUBLIC_GITHUB_USER;
    const { repos, loading: loadingRepos, error: errorRepos } = useGitHubRepos(username);
    const { repos: starredRepos, loading: loadingStarred, error: errorStarred } = useGitHubRepos(username, true);
    const [activeTab, setActiveTab] = useState<"repos" | "starred">("repos");
    const [selectedLanguage, setSelectedLanguage] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [activeDropdown, setActiveDropdown] = useState<"language" | "type" | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [tempSearchTerm, setTempSearchTerm] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const typeOptions = ["All", "Sources", "Forks", "Archived", "Mirrors"];
    const languages = useMemo(
        () => ["All", ...new Set([...repos, ...starredRepos].map(repo => repo.language).filter((lang): lang is string => Boolean(lang)))],
        [repos, starredRepos]
    );

    const filterRepos = (repos: GitHubRepo[]) => repos.filter(repo =>
        (selectedLanguage === "All" || repo.language === selectedLanguage) &&
        (selectedType === "All" ||
            (selectedType === "Sources" && !repo.fork) ||
            (selectedType === "Forks" && repo.fork) ||
            (selectedType === "Archived" && repo.archived) ||
            (selectedType === "Mirrors" && repo.mirror_url)) &&
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredRepos = filterRepos(activeTab === "repos" ? repos : starredRepos);
    const isLoading = activeTab === "repos" ? loadingRepos : loadingStarred;
    const error = activeTab === "repos" ? errorRepos : errorStarred;

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && setSearchTerm(tempSearchTerm);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const toggleDropdown = (dropdown: "language" | "type") => setActiveDropdown(prev => prev === dropdown ? null : dropdown);
    const toggleSearch = () => setIsSearchOpen(prev => !prev);

    const searchIconRef = useRef<HTMLImageElement>(null);
    const dropdownsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchIconRef.current && dropdownsRef.current) {
            searchIconRef.current.classList.toggle('search-icon-animation', isSearchOpen);
            dropdownsRef.current.classList.toggle('dropdowns-animation', isSearchOpen);
        }
    }, [isSearchOpen]);

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

            <div className="flex flex-row lg:items-center sm:flex-col-reverse lg:flex-row sm:justify-between mt-6 sm:mt-0">
                <div className="sm:flex hidden gap-[16px] border-b border-[#C4C4C4] pb-[6px] w-[444px] mb-[40px] lg:mb-0">
                    <Image src="/searchIcon.svg" alt="Icone Procurar" width={24} height={24} priority />
                    <input type="text" placeholder="Search Here" className="outline-none w-full text-[18px] text-[#989898]" value={tempSearchTerm} onChange={(e) => setTempSearchTerm(e.target.value)} onKeyDown={handleSearchKeyDown} />
                </div>

                <div className="bg-[#F8F8F8] rounded-lg w-full sm:w-auto py-3 px-2 flex justify-between mb-8 sm:bg-transparent sm:rounded-none sm:py-0 sm:px-0 sm:mb-0">
                    <div className="flex gap-2 lg:gap-4 sm:pb-[28px] lg:pb-0" ref={dropdownsRef}>
                        {["Type", "Language"].map((label, idx) => (
                            <Dropdown
                                key={label}
                                label={label}
                                options={idx === 0 ? typeOptions : languages}
                                selected={idx === 0 ? selectedType : selectedLanguage}
                                onSelect={idx === 0 ? setSelectedType : setSelectedLanguage}
                                isOpen={activeDropdown === (idx === 0 ? "type" : "language")}
                                toggle={() => toggleDropdown(idx === 0 ? "type" : "language")}
                                className={`lg:w-[${idx === 0 ? 105 : 145}px] lg:h-10 w-[${idx === 0 ? 88 : 120}px] h-8`}
                            />
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <Image
                            src="/searchBlueIcon.svg"
                            alt="Icone Procurar"
                            width={24}
                            height={24}
                            priority
                            className="sm:hidden"
                            onClick={toggleSearch}
                            ref={searchIconRef}
                        />
                        {isSearchOpen && (
                            <input
                                type="text"
                                placeholder="Type Something Here..."
                                className="bg-transparent outline-none text-[#989898] font-normal text-sm leading-[16.41px] sm:hidden"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        )}
                    </div>
                </div>
            </div>

            <section className="lg:mt-10">
                {isLoading ? <p>Carregando...</p> : error ? <p className="text-red-500">{error}</p> : filteredRepos.map(repo => <RepoCard key={repo.id} repo={repo} isStarred={activeTab === "starred"} />)}
            </section>
        </div>
    );
}