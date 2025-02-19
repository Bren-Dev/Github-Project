import GitHubRepositories from "./components/GithubRepositories";
import Header from "./components/Header";
import ProfileSection from "./components/ProfileSection";

export default function Home() {
  return (

    <div>
      <Header />
      <div className="flex ">
        <ProfileSection />
        <GitHubRepositories />
      </div>
    </div>
  );
}
