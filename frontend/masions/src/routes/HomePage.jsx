import { Link } from "react-router-dom";
import { RentApartments } from "./RentApartments";
import { RentHouses } from "./RentHouses";
import { RentLands } from "./RentLands";
import { SaleApartments } from "./SaleApartments";
import { SaleHouses } from "./SaleHouses";
import { SaleLands } from "./SaleLands";

export default function HomePage() {
  return (
    <>
      <div className="container">
        <section className="hero-section mx-auto flex flex-col lg:flex-row items-center justify-between py-10 px-6">
          {/* Text Content */}
          <div className="text-content flex flex-col justify-start items-start lg:items-start w-full lg:w-1/2 relative">
            <h1 className="text-4xl font-bold mb-4">
              Discover Your Property's <br /> True Value
            </h1>
            <h3 className="text-lg mb-6 leading-relaxed relative z-10">
              Al-Muthammen!! <br />
              Use our AI-powered price prediction tool to instantly get <br />
              accurate, AI-driven property price estimates based on <br />
              real-time market data.
            </h3>
            <Link
              to="ai/house-price-prediction"
              className="primary-btn px-3 py-3 lg:!w-[80%] shadow-lg relative z-10"
            >
              Try It Now
            </Link>
          </div>

          {/* Image */}
          <div className="image-container flex justify-end items-center w-full lg:w-1/2 mt-6 lg:mt-0">
            <img
              src={`http://localhost:3000/uploads/images/trees-design-house-lawn-wallpaper-preview.jpg`} // Replace with your image path
              alt="House Price Prediction"
              className="max-w-full h-auto object-contain rounded-md shadow-lg"
            />
          </div>
        </section>
      </div>

      <SaleHouses limit={4} />
      <RentHouses limit={4} />
      <SaleApartments limit={4} />
      <RentApartments limit={4} />
      <SaleLands limit={4} />
      <RentLands limit={4} />
    </>
  );
}
