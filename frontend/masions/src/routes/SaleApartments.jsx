import { useLoaderData } from "react-router-dom";
import PropertiesList from "../components/PropertiesList/PropertiesList";

export const SaleApartments = () => {
  const properties = useLoaderData();
  const propertyApartments_sale = properties.filter((property) => {
    return property.type == "apartment" && property.status == "sale";
  });

  return (
    <>
      {propertyApartments_sale.length === 0 && (
        <div className=" w-full min-h-[100px]  flex items-center justify-center">
          <h1 className="capitalize  drop-shadow-xl ">
            No items here please add one
          </h1>
        </div>
      )}

      {propertyApartments_sale.length > 0 && (
        <div className="container">
          <section>
            <h1 className="container-header">Apartments For Sale</h1>
            <PropertiesList propertyType={propertyApartments_sale} />
          </section>
        </div>
      )}
    </>
  );
};
