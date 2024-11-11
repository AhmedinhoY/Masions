import { ImageSlider } from "../ImageSlider/ImageSlider";
import "./PropertiesList.css";

const PropertiesList = ({ propertyType, limit }) => {
  return (
    <div className="products-grid">
      {limit
        ? propertyType.slice(0, limit).map((property) => (
            <div key={property.id} className="group">
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
            </div>
          ))
        : propertyType.map((property) => (
            <div key={property.id} className="group">
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
            </div>
          ))}
    </div>
  );
};

export default PropertiesList;
