import { NextResponse } from "next/server";
import { useGitHubStore } from "../store/githubStore";

export async function GET() {
  const { username, token } = useGitHubStore.getState();

  if (!username || !token) {
    return NextResponse.json(
      { error: "Credenciais não fornecidas" },
      { status: 400 }
    );
  }

  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: { Authorization: `token ${token}` },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Erro ao buscar perfil" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
