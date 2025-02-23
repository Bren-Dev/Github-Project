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

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearchTerm(tempSearchTerm);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTempSearchTerm(value);

        if (value === "") {
            setSearchTerm("");
        }
    };

    const toggleDropdown = (dropdown: "language" | "type") => {
        setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
    };

    return (
        <div className="bg-white">
            <div className="flex items-center sm:pb-[30px] lg:pb-[55px] gap-[30px] lg:gap-[55px]">
                <button
                    onClick={() => setActiveTab("repos")}
                    className={`flex pl-[8px] pb-[8px] items-center ${activeTab === "repos" ? "font-semibold border-b-2 border-[#FD8C73]" : "text-gray-500"}`}
                >
                    <Image src={activeTab === "repos" ? "/activeBookIcon.svg" : "/inactiveBookIcon.svg"} alt="Icone Livro" width={24} height={24} priority />
                    <span className="lg:pl-[16px] pr-[8px] text-base font-normal lg:text-lg lg:leading-[21.09px]">Repositories</span>  <span className="border font-normal text-sm leading-[16.41px] text-[#989898] rounded-[59px] border-solid border-[#DBDBDB] bg-[#F8F8F8] lg:py-[4px] lg:px-[16px]">{repos.length}</span>
                </button>
                <button
                    onClick={() => setActiveTab("starred")}
                    className={`flex pl-[8px] pb-[8px] items-center ${activeTab === "starred" ? "font-semibold border-b-2 border-[#FD8C73]" : "text-gray-500"}`}
                >
                    <Image src={activeTab === "starred" ? "/activeStarIcon.svg" : "/inactiveStarIcon.svg"} alt="Icone Estrela" width={24} height={24} priority />
                    <span className="lg:pl-[16px] pr-[8px] text-base font-normal lg:text-lg lg:leading-[21.09px]" >Starred</span>   <span className="border font-normal text-sm leading-[16.41px] text-[#989898] rounded-[59px] border-solid border-[#DBDBDB] bg-[#F8F8F8] lg:py-[4px] lg:px-[16px]">{starredRepos.length}</span>
                </button>
            </div>

            <div className="flex flex-row-reverse lg:items-center sm:flex-col-reverse lg:flex-row justify-between">
                <div className="flex gap-[16px] border-b border-[#F4F4F4] pb-[6px] w-[444px] mb-[40px] lg:mb-0">
                    <Image src="/searchIcon.svg" alt="Icone Procurar" width={24} height={24} priority />
                    <input
                        type="text"
                        placeholder="Search Here"
                        className="outline-none w-full "
                        value={tempSearchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleSearch}
                    />
                </div>
                <div>
                    <div className="flex gap-2 lg:gap-4 sm:pb-[28px] lg:pb-0">
                        <Dropdown
                            label="Type"
                            options={typeOptions}
                            selected={selectedType}
                            onSelect={setSelectedType}
                            isOpen={activeDropdown === "type"}
                            toggle={() => toggleDropdown("type")}
                            className="lg:w-[105px] lg:h-10 w-[88px] h-8"
                        />
                        <Dropdown
                            label="Language"
                            options={languages}
                            selected={selectedLanguage}
                            onSelect={setSelectedLanguage}
                            isOpen={activeDropdown === "language"}
                            toggle={() => toggleDropdown("language")}
                            className="lg:w-[145px] lg:h-10 w-[120px] h-8"
                        />
                    </div>
                    <div>

                    </div>
                </div>
            </div>

            <section className="lg:mt-10">
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