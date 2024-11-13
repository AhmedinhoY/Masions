/* eslint-disable react/prop-types */

import "./PropertiesList.css";
import { PropertyItem } from "./PropertyItem";

const PropertiesList = ({ propertyType, limit }) => {
  return (
    <div className="products-grid">
      {limit
        ? propertyType.slice(0, limit).map((property) => (
          // Property Item - renders a single property 
          <PropertyItem
            key={property.id}
            property={property}

          />
        ))
        : propertyType.map((property) => (
          <PropertyItem
            key={property.id}
            property={property}

          />
        ))}
    </div>
  );
};

export default PropertiesList;
