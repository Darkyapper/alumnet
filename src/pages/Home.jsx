import LandingPage from "../components/landingPage/LandingPage";
import LandingNavbar from "../components/landingNavbar/LandingNavbar";
import "../components/landingPage/LandingPage.css"
import LandingFooter from "../components/landingFooter/LandingFooter";

function Home() {
  return (
    <div>
      <LandingNavbar />
      <LandingPage />
      <LandingFooter />
    </div>
  );
}

export default Home;
