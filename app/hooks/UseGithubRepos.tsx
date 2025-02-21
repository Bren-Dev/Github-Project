'use client'

import useSWR from "swr";

interface GitHubRepo {
    id: number;
    name: string;
    owner: { login: string };
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    fork: boolean;
    archived: boolean;
    mirror_url: string | null;
}

const GITHUB_TOKEN = "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";

const fetcher = (url: string) =>
    fetch(url, {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
    }).then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar repositórios");
        return res.json();
    });

export function useGitHubRepos(username: string, starred = false) {
    const url = starred
        ? `https://api.github.com/users/${username}/starred`
        : `https://api.github.com/users/${username}/repos`;

    const { data, error, isLoading } = useSWR<GitHubRepo[]>(username ? url : null, fetcher, {
        revalidateOnFocus: true,
    });

    return {
        repos: data || [],
        loading: isLoading,
        error: error?.message || null,
    };
}
