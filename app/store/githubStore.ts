import { create } from "zustand";

interface GitHubStore {
  username: string;
  token: string | null;
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
}

export const useGitHubStore = create<GitHubStore>((set) => ({
  username: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Bren-Dev",
  token: process.env.NEXT_PUBLIC_GITHUB_TOKEN || null,
  setUsername: (username) => set({ username }),
  setToken: (token) => set({ token }),
}));
