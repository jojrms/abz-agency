import { UserProps } from "../../../types/users";
import { StandardButton } from "../../../ui-components/StandardButton";
import {
  StandardCardGrid,
  StandardUserCard,
} from "../../../ui-components/StandardCard";
import "./style.scss";

type GetBlockProps = {
  users: UserProps[];
  userGetPage: number;
  setUserGetPage: (e: number) => void;
};

export const GetBlock = ({
  users,
  userGetPage,
  setUserGetPage,
}: GetBlockProps) => {
  return (
    <section id="getBlock" className="get-block">
      <div>
        <h1>Working with GET request</h1>
        <>
          <StandardCardGrid>
            {users.map((user) => {
              return (
                <StandardUserCard
                  key={0}
                  name={user.name}
                  position={user.position}
                  email={user.email}
                  phone={user.phone}
                  photo={user.photo}
                />
              );
            })}
          </StandardCardGrid>
          <StandardButton
            title="Show more"
            onClick={() => setUserGetPage(userGetPage + 1)}
          />
        </>
      </div>
    </section>
  );
};
