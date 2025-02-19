'use client'

import { useState, useEffect } from "react";

interface GitHubRepo {
    id: number;
    name: string;
    owner: { login: string };
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
}

const GITHUB_TOKEN = "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";

export function useGitHubRepos(username: string, starred = false) {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!username) return;

        const fetchRepos = async () => {
            try {
                const headers = {
                    Authorization: `token ${GITHUB_TOKEN}`,
                };

                const url = starred
                    ? `https://api.github.com/users/${username}/starred`
                    : `https://api.github.com/users/${username}/repos`;

                const response = await fetch(url, { headers });

                if (!response.ok) throw new Error("Erro ao buscar repositórios");

                const data: GitHubRepo[] = await response.json();
                setRepos(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [username, starred]);

    return { repos, loading, error };
}
