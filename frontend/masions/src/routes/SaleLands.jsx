import { useLoaderData } from "react-router-dom";
import PropertiesList from "../components/PropertiesList/PropertiesList";

export const SaleLands = () => {
  const properties = useLoaderData();
  let propertyLands_sale;
  if (properties) {
    propertyLands_sale = properties.filter((property) => {
      return property.type == "land" && property.propertyStatus == "sale";
    });
  }

  return (
    <>
      {propertyLands_sale.length === 0 && (
        <div className=" w-full min-h-[100px]  flex items-center justify-center">
          <h1 className="capitalize  drop-shadow-xl ">
            {" "}
            No items here please add one
          </h1>
        </div>
      )}

      {propertyLands_sale.length > 0 && (
        <div className="container">
          <section>
            <h1 className="container-header">Lands For Sale</h1>
            <PropertiesList propertyType={propertyLands_sale} />
          </section>
        </div>
      )}
    </>
  );
};
