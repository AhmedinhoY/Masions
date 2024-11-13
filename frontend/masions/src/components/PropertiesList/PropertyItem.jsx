/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { ImageSlider } from "../ImageSlider/ImageSlider";




export const PropertyItem = ({ property }) => {
  return (
    <>
      <div className="group">
        <Link to={`/${property.id}/post-details`}>
          <div className="product-img-container">
            <ImageSlider
              imgCollection={property.img}
              propertyID={property.id}
            />
          </div>
          <h2>{property.city}</h2>
          <h3>{property.type} for Sale</h3>
          <h3>
            {property.area} m<sup>2</sup> - {property.bedrooms} bedrooms
          </h3>
          <p className="mt-1">{property.price.toLocaleString()} BD</p>
        </Link>
      </div>
    </>
  );
}