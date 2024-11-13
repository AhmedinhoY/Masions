import { useLoaderData } from "react-router-dom";
import PropertiesList from "../components/PropertiesList/PropertiesList";

export const SaleApartments = () => {

  const properties = useLoaderData();
  const propertyApartments_sale = properties.filter((property) => {
    return (property.type == 'apartment' && property.propertyStatus == 'sale')
  });


  return (

    <>
      {propertyApartments_sale.length === 0 && (
        <main className=" w-full min-h-[70vh]  flex items-center justify-center">
          <h1
            className="font-serif font-bold capitalize text-[5vh] drop-shadow-xl "
          > no items here please add one</h1>
        </main>
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
