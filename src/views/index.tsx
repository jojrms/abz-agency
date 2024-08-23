import { FirstSection } from "./components/first-section";
import {
  StandardButton,
  StandardButtonGrid,
} from "../ui-components/StandardButton";
import testTaskUrl from "../assets/testtask-icon.svg";
import "./style.scss";
import { GetBlock } from "./components/get-block";
import { usersService } from "../services/users";
import { useEffect, useState } from "react";
import { UserProps } from "../types/users";

export const Home = () => {
  // STATES
  const [userGetPage, setUserGetPage] = useState<number>(1);
  const [users, setUsers] = useState<UserProps[]>([]);

  // SERVICES
  const { getUsers } = usersService();

  // FUNCTIONS
  const getUsersFunction = async () => {
    const { data } = await getUsers(userGetPage);

    if (data) {
      setUsers((prevUsers) => [...prevUsers, ...data.users]);
    }
  };

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    getUsersFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userGetPage]);

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
        <GetBlock
          users={users}
          userGetPage={userGetPage}
          setUserGetPage={setUserGetPage}
        />
      </div>
    </main>
  );
};
