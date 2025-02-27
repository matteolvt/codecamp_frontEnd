import { Header } from "../../components/header/header";
import { HeroSectionDem } from "../../components/heroSectionDem/heroSectionDem";
import { StepCards } from "../../components/stepCards/stepCards";
import { Footer } from "../../components/footer/footer";
import "./vosDemarches.css";

export const VosDemarches = () => {
  return (
    <div className="flex flex-col items-center">
      <HeroSectionDem />
      <StepCards />
    </div>
  );
};
