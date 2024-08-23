import { FirstSection } from "./components/first-section";
import {
  StandardButton,
  StandardButtonGrid,
} from "../ui-components/StandardButton";
import testTaskUrl from "../assets/testtask-icon.svg";
import "./style.scss";

export const Home = () => {
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main>
      <header>
        <div>
          <img src={testTaskUrl} />
          <StandardButtonGrid>
            <StandardButton
              title="Users"
              onClick={() => scrollToElement("getBlock")}
            />
            <StandardButton
              title="Sign up"
              onClick={() => scrollToElement("postBlock")}
            />
          </StandardButtonGrid>
        </div>
      </header>
      <div className="div-sections">
        <FirstSection />
      </div>
    </main>
  );
};
