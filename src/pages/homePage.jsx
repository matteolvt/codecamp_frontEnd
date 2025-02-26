import { Header } from "../components/header/header";
// import { Footer } from "./components/footer/footer";
import { HeroSection } from "../components/heroSection/heroSection";
import { InfoCards } from "../components/homeSections/homeSections";
// import { DossiersEnquetes } from "./components/dossiersEnquetes/dossiersEnquetes";
// import { Actualites } from "./components/actualites/actualites";

export const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <InfoCards />
    </div>
  );
};
