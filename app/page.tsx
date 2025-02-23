import GitHubRepositories from "../components/GithubRepositories";
import Header from "../components/Header";
import ProfileSection from "../components/ProfileSection";

export default function Home() {
  return (

    <div>
      <Header />
      <div className="flex justify-center">
        <div className="max-w-[1200px] w-full sm:gap-[65px] flex flex-col sm:flex-row py-[33px] px-[24px]">
          <ProfileSection />
          <GitHubRepositories />
        </div>
      </div>
    </div>
  );
}
