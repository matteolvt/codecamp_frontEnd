import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { HeroSection } from "../../components/heroSection/heroSection";
import { InfoCards } from "../../components/homeSections/homeSections";
import  { Map }  from "../../components/map/map";
import "./homePage.css";
import { MapContainer } from "react-leaflet";
// import { DossiersEnquetes } from "./components/dossiersEnquetes/dossiersEnquetes";
// import { Actualites } from "./components/actualites/actualites";

export const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <InfoCards />
      <Map />
    </div>
  );
};
