import { FirstSection } from "./components/first-section";
import {
  StandardButton,
  StandardButtonGrid,
} from "../ui-components/StandardButton";
import testTaskUrl from "../assets/testtask-icon.svg";
import "./style.scss";
import { GetBlock } from "./components/get-block";
import { useEffect, useState } from "react";
import { UserProps } from "../types/users";
import { PostBlock } from "./components/post-block";
import { useUsers } from "../hooks/useUsers";

export const Home = () => {
  // STATES
  const [users, setUsers] = useState<UserProps[]>([]);

  // SERVICES
  const { data, isLoading, refetch, nextPage } = useUsers();

  // FUNCTIONS
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (data) {
      setUsers((prevUsers) => [...prevUsers, ...data.users]);
    }
  }, [data]);

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
        <GetBlock users={users} isLoading={isLoading} nextPage={nextPage} />
        <PostBlock refetchGetUsers={refetch} />
      </div>
    </main>
  );
};
