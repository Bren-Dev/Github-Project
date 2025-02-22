import Image from 'next/image';
import { GitHubRepo } from '../hooks/UseGithubRepos';

interface RepoCardProps {
    repo: GitHubRepo;
    isStarred?: boolean;
}

export default function RepoCard({ repo, isStarred = false }: RepoCardProps) {
    return (
        <div key={repo.id} className=" pb-[48px]">
            <p className='lg:text-lg lg:leading-[21.09px] text-black font-light'>
                {repo.owner.login} <span className='font-normal'>/{' '} </span>
                <a href={repo.html_url} target="_blank" className="font-semibold  text-[#0587FF]">
                    {repo.name}
                </a>

            </p>
            <p className="py-[9px] font-normal text-sm leading-[16.41px] text-[#989898]">{repo.description || 'Sem descrição'}</p>

            <div className="text-gray-600 text-sm flex lg:gap-8">
                {isStarred && <p className="font-normal text-sm leading-[16.41px] text-black">{repo.language || 'Sem linguagem'}</p>}
                <div className="flex gap-2">
                    <Image src="/fullStarIcon.svg" alt="Icone Estrela" width={18} height={20} priority />
                    <span className='font-normal text-sm leading-[16.41px] text-black'>{repo.stargazers_count}</span>
                </div>
                {!isStarred && (
                    <div className="flex gap-2">
                        <Image src="/forkIcon.svg" alt="Icone Fork" width={18} height={20} priority />
                        <span className='font-normal text-sm leading-[16.41px] text-black'>{repo.forks_count}</span>
                    </div>
                )}
            </div>
        </div>
    );
}