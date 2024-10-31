import "./PropertiesList.css";

const PropertiesList = ({ propertyType } = props) => {
  return (
    <div className="products-grid">
      {propertyType.map((property) => (
        <a key={property.id} href="#" className="group">
          <div className="product-img-container">
            <img src={property.img} />
          </div>
          <h2>{property.city}</h2>
          <h3>{property.type} for Sale</h3>
          <h3>
            {property.area} m<sup>2</sup> - {property.bedrooms} bedrooms
          </h3>
          <p className="mt-1">{property.price.toLocaleString()} BD</p>
        </a>
      ))}
    </div>
  );
};

export default PropertiesList;
