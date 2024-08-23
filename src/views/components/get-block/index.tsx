import { UserProps } from "../../../types/users";
import { StandardButton } from "../../../ui-components/StandardButton";
import {
  StandardCardGrid,
  StandardUserCard,
} from "../../../ui-components/StandardCard";
import "./style.scss";

type GetBlockProps = {
  isLoading: boolean;
  users: UserProps[];
  nextPage: () => void;
};

export const GetBlock = ({ isLoading, users, nextPage }: GetBlockProps) => {
  return (
    <section id="getBlock" className="get-block">
      <div>
        <h1>Working with GET request</h1>
        <>
          <StandardCardGrid>
            {isLoading ? (
              <p>loading...</p>
            ) : (
              users.map((user, index) => {
                return (
                  <StandardUserCard
                    key={index}
                    name={user.name}
                    position={user.position}
                    email={user.email}
                    phone={user.phone}
                    photo={user.photo}
                  />
                );
              })
            )}
          </StandardCardGrid>
          <StandardButton title="Show more" onClick={() => nextPage()} />
        </>
      </div>
    </section>
  );
};
