import { Link } from "react-router-dom";
import { Card } from "../../shared/Card";

/* eslint-disable react/prop-types */
export const PlaceItem = ({ place, classes }) => {
  return (
    <>
      <Card classes={classes}>
        <li>
          <Link to={`${place.id}`}>
            <img
              src={place.image}
              alt={place.title}
              className=" w-[240px] h-[240px]"
            />
            <div>
              <h1>{place.title}</h1>
              <p>{place.description}</p>
            </div>
          </Link>
        </li>
      </Card>
    </>
  );
};

// improve the design:
// - make the cards fade in
// - style the cards to look more beautiful
