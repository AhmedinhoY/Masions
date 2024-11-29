/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router-dom";
import PropertiesList from "../components/PropertiesList/PropertiesList";

export const SaleHouses = () => {
  const properties = useLoaderData();
  const propertyHoueses_sale = properties.filter((property) => {
    return property.type == "house" && property.status == "sale";
  });

  return (
    <>
      {propertyHoueses_sale.length === 0 && (
        <div className=" w-full min-h-[100px]  flex items-center justify-center">
          <h1 className="capitalize  drop-shadow-xl ">
            No items here please add one
          </h1>
        </div>
      )}

      {propertyHoueses_sale.length > 0 && (
        <div className="container">
          <section>
            <h1 className="container-header">Houses For Sale</h1>
            <PropertiesList propertyType={propertyHoueses_sale} />
          </section>
        </div>
      )}
    </>
  );
};
