import { ImageSlider } from "../../components/ImageSlider/ImageSlider";
import "./PropertiesList.css";

const PropertiesList = ({ propertyType } = props) => {
  return (
    <div className="products-grid">
      {propertyType.map((property) => (
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
