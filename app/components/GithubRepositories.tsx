'use client'
import { useMemo, useState } from "react";
import { useGitHubRepos } from "../hooks/UseGithubRepos";

export default function GitHubRepositories() {
    const username = "Bren-Dev";
    const { repos, loading, error } = useGitHubRepos(username);
    const { repos: starredRepos, loading: loadingStarred, error: errorStarred } = useGitHubRepos(username, true);

    const [activeTab, setActiveTab] = useState<"repos" | "starred">("repos");
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>("All");
    const [selectedType, setSelectedType] = useState<string>("All");
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

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

        return matchesLanguage && matchesType;
    });

    console.log(filteredRepos)

    return (
        <div className="p-6 bg-white">
            <div className="flex items-center space-x-6 border-b pb-3 ">
                <button
                    onClick={() => setActiveTab("repos")}
                    className={`flex items-center space-x-1 ${activeTab === "repos" ? "font-semibold border-b-2 border-red-500" : "text-gray-500"}`}
                >
                    📂 Repositories <span className="bg-gray-200 text-xs px-2 py-1 rounded-full">{repos.length}</span>
                </button>

                <button
                    onClick={() => setActiveTab("starred")}
                    className={`flex items-center space-x-1 ${activeTab === "starred" ? "font-semibold border-b-2 border-red-500" : "text-gray-500"}`}
                >
                    ⭐ Starred <span className="bg-gray-200 text-xs px-2 py-1 rounded-full">{starredRepos.length}</span>
                </button>
            </div>

            <div className="flex items-center justify-between mt-4">
                <input
                    type="text"
                    placeholder="Search Here"
                    className="border px-4 py-2 w-full max-w-md rounded-md"
                />
                <div className="flex space-x-3 relative">
                    <div className="relative">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md"
                            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}>
                            Type
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
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md"
                            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}>
                            Language
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
                                <a href={repo.html_url} target="_blank" className="text-blue-600">
                                    {repo.name}
                                </a>
                            </h3>
                            <p className="text-gray-500 text-sm">{repo.description || "Sem descrição"}</p>
                            <p className="text-gray-600 text-sm">{repo.language || "Sem linguagem"}</p>
                            <div className="text-gray-600 text-sm flex space-x-4">
                                <span>⭐ {repo.stargazers_count}</span>
                                <span>🔗 {repo.forks_count}</span>
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
