import { RentApartments } from "./RentApartments";
import { RentHouses } from "./RentHouses";
import { SaleApartments } from "./SaleApartments";
import { SaleHouses } from "./SaleHouses";
import { SaleLands } from "./SaleLands";
import { WishList } from "./WishList";

export default function HomePage() {
  return (
    <>
      <SaleHouses />
      <RentHouses />
      <SaleApartments />
      <RentApartments />
      <WishList />
      <SaleLands />
    </>
  );
}
