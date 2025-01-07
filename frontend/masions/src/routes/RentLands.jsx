/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router-dom";
import PropertiesList from "../components/PropertiesList/PropertiesList";
import { useState } from "react";

export const RentLands = ({ limit }) => {
  const properties = useLoaderData();
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [area, setArea] = useState("");

  // Clear filters function
  const clearFilters = () => {
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setBathrooms("");
    setArea("");
  };

  const filteredProperties = properties.filter((property) => {
    return (
      property.type.toLowerCase() === "land" &&
      property.status.toLowerCase() === "rent" &&
      (city
        ? property.city.toLowerCase().includes(city.toLowerCase())
        : true) &&
      (minPrice ? property.price >= parseFloat(minPrice) : true) &&
      (maxPrice ? property.price <= parseFloat(maxPrice) : true) &&
      (bedrooms ? property.bedrooms >= parseInt(bedrooms) : true) &&
      (bathrooms ? property.bathrooms >= parseInt(bathrooms) : true) &&
      (area ? property.area >= parseFloat(area) : true)
    );
  });

  return (
    <>
      <div className="container">
        <section>
          {/* Filter Section */}
          {!limit ? (
            <div className="filters-container  mb-4 flex flex-col lg:flex-row justify-between items-stretch lg:items-center w-[95%] gap-4">
              {/* Input Group */}
              <div className="w-full lg:w-[90%] flex flex-wrap gap-4">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="Input flex-1 min-w-[120px]"
                />
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="Input flex-1 min-w-[120px]"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="Input flex-1 min-w-[120px]"
                />
                <input
                  type="number"
                  placeholder="Min Bedrooms"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="Input flex-1 min-w-[120px]"
                />
                <input
                  type="number"
                  placeholder="Min Bathrooms"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="Input flex-1 min-w-[120px]"
                />
                <input
                  type="number"
                  placeholder="Min Area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="Input flex-1 min-w-[120px]"
                />
              </div>

              {/* Clear Button */}
              <button
                className="primary-btn !w-[90%] lg:!w-[10%] !py-1.5 !mx-auto"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          ) : null}
          {limit ? (
            <h1 className="container-header">Trending Lands For Rent</h1>
          ) : (
            <h1 className="container-header">Lands For Rent</h1>
          )}{" "}
          {filteredProperties.length === 0 ? (
            <h3 className="capitalize drop-shadow-xl flex justify-center">
              No properties found
            </h3>
          ) : (
            <PropertiesList propertyType={filteredProperties} />
          )}
        </section>
      </div>
    </>
  );
};
