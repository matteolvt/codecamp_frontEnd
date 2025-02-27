import { ReportHeader } from "../../components/reportHeader/reportHeader";
import { ReportForm } from "../../components/reportForm/reportForm";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import "./signalerUnFait.css";

export const SignalerUnFait = () => {
  return (
    <div className="flex flex-col items-center">
      <ReportHeader />
      <ReportForm />
    </div>
  );
};
