import { RentApartments } from "./RentApartments";
import { RentHouses } from "./RentHouses";
import { SaleApartments } from "./SaleApartments";
import { SaleHouses } from "./SaleHouses";
import { SaleLands } from "./SaleLands";
import { Wishist } from "./Wishist";

export default function HomePage() {
  return (
    <>
      <SaleHouses />
      <RentHouses />
      <SaleApartments />
      <RentApartments />
      <Wishist />
      <SaleLands />
    </>
  );
}
