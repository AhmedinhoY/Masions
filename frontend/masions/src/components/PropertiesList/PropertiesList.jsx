/* eslint-disable react/prop-types */

import "./PropertiesList.css";
import { PropertyItem } from "./PropertyItem";

const PropertiesList = ({ propertyType, limit }) => {
  return (
    <div className="products-grid">
      {limit
        ? propertyType
            .slice(0, limit)
            .map((property) => (
              <PropertyItem key={property._id} property={property} />
            ))
        : propertyType.map((property) => (
            <PropertyItem key={property._id} property={property} />
          ))}
    </div>
  );
};

export default PropertiesList;
