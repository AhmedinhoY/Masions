/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../shared/context/auth-context";
import LoadingSpinner from "../shared/UI-Elements/LoadingSpinner";
import PropertiesList from "../components/PropertiesList/PropertiesList";
import axios from "axios";

export const WishList = () => {
  const auth = useContext(AuthContext);

  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/wishlist/get-wishlist`,
          { withCredentials: true }
        );
        const resData = response.data;
        setWishlist(resData.wishlist);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [auth?.user?.id]);

  // Display loading or error state
  if (loading) return <LoadingSpinner asOverlay />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {wishlist && wishlist.places.length > 0 ? (
        <div className="container">
          <section>
            <h1 className="container-header">Wishlist</h1>
            <PropertiesList propertyType={wishlist.places} />
          </section>
        </div>
      ) : (
        <div className="w-full min-h-[100px] flex items-center justify-center">
          <h1 className="capitalize drop-shadow-xl">
            No items here, please add one
          </h1>
        </div>
      )}
    </div>
  );
};
