import { RentApartments } from "./RentApartments";
import { RentHouses } from "./RentHouses";
import { RentLands } from "./RentLands";
import { SaleApartments } from "./SaleApartments";
import { SaleHouses } from "./SaleHouses";
import { SaleLands } from "./SaleLands";

export default function HomePage() {
  return (
    <>
      <SaleHouses />
      <RentHouses />
      <SaleApartments />
      <RentApartments />
      <SaleLands />
      <RentLands/>
    </>
  );
}
