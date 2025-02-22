import Image from 'next/image';
import { GitHubRepo } from '../hooks/UseGithubRepos';

interface RepoCardProps {
    repo: GitHubRepo;
    isStarred?: boolean;
}

export default function RepoCard({ repo, isStarred = false }: RepoCardProps) {
    return (
        <div key={repo.id} className="border-b pb-4">
            <h3 className="font-semibold">
                {repo.owner.login} /{' '}
                <a href={repo.html_url} target="_blank" className="text-[#0587FF]">
                    {repo.name}
                </a>
            </h3>
            <p className="text-gray-500 text-sm">{repo.description || 'Sem descrição'}</p>
            {!isStarred && <p className="text-gray-600 text-sm">{repo.language || 'Sem linguagem'}</p>}
            <div className="text-gray-600 text-sm flex space-x-4">
                <div className="flex gap-2">
                    <Image src="/fullStarIcon.svg" alt="Icone Estrela" width={18} height={20} priority />
                    <span>{repo.stargazers_count}</span>
                </div>
                {!isStarred && (
                    <div className="flex gap-2">
                        <Image src="/forkIcon.svg" alt="Icone Fork" width={18} height={20} priority />
                        <span>{repo.forks_count}</span>
                    </div>
                )}
            </div>
        </div>
    );
}