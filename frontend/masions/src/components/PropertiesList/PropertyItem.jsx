/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { ImageSlider } from "../ImageSlider/ImageSlider";

export const PropertyItem = ({ property }) => {
  return (
    <>
      <div className="group">
        <div className="product-img-container">
          <ImageSlider imgCollection={property.img} propertyID={property._id} />
        </div>
        <Link to={`/${property._id}/post-details`}>
          <div>
            <h2>{property.city}</h2>
            <h3>
              {property.type} for {property.status}
            </h3>
            <h3>
              {property.area} m<sup>2</sup> - {property.bedrooms} bedrooms
            </h3>
            <div className="flex flex-row justify-between mt-1">
              <p className="">{property.price.toLocaleString()} BD</p>
              <p>{property.availability}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
