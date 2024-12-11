/* eslint-disable no-unused-vars */
import {
  Await,
  Link,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { Suspense, useContext, useRef } from "react";
import Card from "../components/Card/Card";
import PropertiesList from "../components/PropertiesList/PropertiesList";
import { Button } from "../shared/Button";
import LoadingSpinner from "../shared/UI-Elements/LoadingSpinner";
import { AuthContext } from "../shared/context/auth-context";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDialog } from "../shared/context/dialog-context";
import { useDropDownDialog } from "../shared/context/dropdowndialog-context";
import DropDownDialog from "../shared/DropDownDialog";
import Alert from "../shared/Alert";
import { ImageSlider } from "../components/ImageSlider/ImageSlider";
import { Modal } from "../shared/Modal";
import { Map } from "../shared/UI-Elements/Map";

export default function PostDetails() {
  const { property, properties } = useLoaderData();
  const submit = useSubmit();
  const auth = useContext(AuthContext);
  const { openDialog } = useDialog();
  const { openDropDownDialog } = useDropDownDialog();
  const navigate = useNavigate();

  const openLogInAlert = () => {
    openDialog({
      title: "Login Required",
      description: "You must be logged in to use this functionality.",
      confirmText: "Go to Login",
      cancelText: "Dismiss",
      onConfirm: () => {
        openDropDownDialog();
      },
      onCancel: () => { },
    });
  };

  const [isInWishlist, setIsInWishlist] = useState(false);
  const userId = auth?.user?.id;
  const propertyId = property?.id;
  useEffect(() => {
    if (!userId) {
      return;
    }
    const checkWishlist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/wishlist/get-wishlist`,
          { withCredentials: true }
        );
        console.log("Wishlist Response:", response.data); // Log the response
        const wishlist = response.data.wishlist.places;
        console.log("Wishlist:", wishlist); // Log the extracted wishlist

        const isPropertyInWishlist = wishlist.some(
          (property) => property._id === propertyId
        );
        setIsInWishlist(isPropertyInWishlist);
      } catch (err) {
        console.error("Error checking wishlist:", err);
      }
    };

    checkWishlist();
  }, [userId, propertyId]);

  // Add or remove property from wishlist
  const toggleWishlistHandler = async () => {
    if (!userId) {
      return; // Prevent further execution
    }

    try {
      if (isInWishlist) {
        // Remove from wishlist
        await axios.post(
          "http://localhost:3000/api/wishlist/remove-from-wishlist",
          { userId: userId, propertyId: propertyId },
          { withCredentials: true }
        );
        console.log("removed!");
      } else {
        // Add to wishlist
        await axios.post(
          "http://localhost:3000/api/wishlist/add-to-wishlist",
          { userId: userId, propertyId: propertyId },
          { withCredentials: true }
        );
        console.log("added!");
      }
      setIsInWishlist((prevState) => !prevState);
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  const handleDelete = async () => {

    modal.current.open();

  };

  const modal = useRef();
  const mapsModal = useRef();
  const deleteConfirmation = async () => {
    // submit(null, { method: 'DELETE' });

    try {
      await axios.delete(
        `http://localhost:3000/api/places/delete-property/${propertyId}`,
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error deleting property:", error);
    }


    console.log('deleted!');
    navigate('/');
  }

  let location = {
    'lat': +property.location.lat, 'lng': +property.location.lng
  }

  return (
    <div className="pt-6">
      <Suspense fallback={<LoadingSpinner asOverlay />}>
        <Await resolve={{ property, properties }}>
          {({ property: chosenHouse, properties: loadedProperties }) => {
            if (!chosenHouse) {
              return <p>Property details are unavailable.</p>;
            }

            // Filter out the current property from the similar properties list
            const similarProperties = loadedProperties.filter(
              (p) => chosenHouse.id !== p.id
            );

            return (
              <div>
                {/* Image Gallery */}
                <div className="hidden lg:grid mx-auto mt-6 max-w-2xl sm:px-6  lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                  <div className=" lg:grid lg:grid-cols-1 lg:gap-y-8">
                    {chosenHouse.img?.slice(0, 2).map((image, index) => (
                      <div
                        key={index}
                        className="aspect-h-1 aspect-w-2 overflow-hidden rounded-lg"
                      >
                        <img
                          src={`http://localhost:3000/uploads/images/${image.imgSrc}`}
                          className="h-full w-full object-cover object-center"
                          alt={`Image ${index + 2}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className=" lg:grid lg:grid-cols-1 lg:gap-y-8">
                    {chosenHouse.img?.slice(2, 4).map((image, index) => (
                      <div
                        key={index}
                        className="aspect-h-1 aspect-w-2 overflow-hidden rounded-lg"
                      >
                        <img
                          src={`http://localhost:3000/uploads/images/${image.imgSrc}`}
                          className="h-full w-full object-cover object-center"
                          alt={`Image ${index + 2}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="block lg:hidden mx-auto mt-6 max-w-2xl sm:px-6">
                  <ImageSlider
                    imgCollection={chosenHouse.img}
                    propertyID={chosenHouse.id}
                  />
                </div>

                {/* Post Header */}
                <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pt-16 justify-around">
                  <div className="lg:col-span-2 lg:pr-8">
                    <div className="flex justify-between">
                      <h1 className="text-2xl sm:text-3xl font-bold">
                        {chosenHouse.type} for {chosenHouse.status} in{" "}
                        {chosenHouse.city}
                      </h1>
                      <h1 className="text-2xl sm:text-3xl font-bold">
                        {chosenHouse.price} BD
                      </h1>
                    </div>
                    <h3 className="text-lg text-gray-600">
                      {chosenHouse.address}
                    </h3>
                  </div>

                  {/* Use Modal here */}
                  <Modal
                    ref={modal}
                    className={' w-1/2 min-h-[15rem] drop-shadow-2xl rounded-md p-8'}
                    title={'Are you Sure? '}
                    titleClass={' font-bold font-serif w-full my-3 '}
                    contentClass={' w-full h-[5rem]  mb-2 flex items-center justify-center '}
                    footerClass={' flex items-center justify-end gap-3'}
                    footer={
                      <>
                        <Button
                          type={'submit'}
                        > Cancel </Button>
                        <Button
                          danger
                          type={'submit'}
                          onClick={deleteConfirmation}
                        >
                          Confirm
                        </Button>
                      </>
                    }

                  >
                    <p className=" capitalize font-serif font-semibold">
                      if you confirm the post is <span className=" uppercase text-red-900"> deleted </span> forever.
                    </p>
                  </Modal>

                  {/* Google Maps Modal */}
                  <Modal
                    ref={mapsModal}
                    className={' min-w-[1024px] min-h-[30rem] drop-shadow-2xl rounded-md p-8'}
                    // title={'Are you Sure? '}
                    titleClass={' font-bold font-serif w-full my-3 '}
                    contentClass={' w-full h-[30rem]  mb-2 flex items-center justify-center '}
                    footerClass={' flex items-center justify-end gap-3'}
                    footer={
                      <>
                        <Button
                          type={'submit'}
                          blue
                        > Done </Button>
                      </>
                    }

                  >
                    <Map center={location} zoom={16} />
                  </Modal>

                  {auth.isLoggedIn && auth.user.id == chosenHouse.creator.id ? (
                    <div className="w-full">
                      <div className="mb-4 mt-4 lg:mt-0 mx-auto w-full flex items-center justify-between">
                        <Link
                          to={`/${chosenHouse.id}/edit`}
                          className="secondary-btn h-10"
                        >
                          Edit
                        </Link>
                        <button
                          className="danger-btn h-8"
                          onClick={handleDelete}
                        >
                          {" "}
                          Delete
                        </button>

                        <Button
                          inverse
                          type={'button'}
                          onClick={() => { mapsModal.current.open(); }}
                        >
                          Map
                        </Button>
                      </div>
                    </div>
                  ) : auth.isLoggedIn ? (
                    <div className="w-full">
                      <div className="mb-4 mt-4 lg:mt-0 mx-auto w-full lg:w-[80%] flex justify-center items-center">
                        <button
                          onClick={toggleWishlistHandler}
                          className="primary-btn h-8"
                        >
                          {isInWishlist
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"}
                        </button>

                        <Button
                          inverse
                          type={'button'}
                          onClick={() => { mapsModal.current.open(); }}
                        >
                          Map
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="mb-4 mt-4 lg:mt-0 mx-auto w-full lg:w-[80%] flex justify-center items-center">
                        <button
                          onClick={openLogInAlert}
                          className="primary-btn h-8"
                        >
                          {isInWishlist
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"}
                        </button>
                        <Button
                          inverse
                          type={'button'}
                          onClick={() => { mapsModal.current.open(); }}
                        >
                          Map
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mx-auto max-w-2xl px-4 pb-16 pt-2 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-4">
                  {/* columns */}

                  {/* Col 1 */}
                  <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    {/* Overview */}
                    <div>
                      <ul className="horizontal-list">
                        <li className="list-item">
                          <h2 className="item-heading">Size</h2>
                          <p className="item-text">{chosenHouse.area} sqm</p>
                        </li>
                        <li className="list-item">
                          <h2 className="item-heading">Bedrooms</h2>
                          <p className="item-text"> {chosenHouse.bedrooms}</p>
                        </li>
                        <li className="list-item">
                          <h2 className="item-heading">Bathrooms</h2>
                          <p className="item-text"> {chosenHouse.bathrooms}</p>
                        </li>
                      </ul>
                    </div>

                    {chosenHouse.features.length > 0 && (
                      <div className="mt-6">
                        <h2 className="">Features</h2>
                        <div className="mt-3 ml-3">
                          <ul role="list" className="list-disc space-y-2 pl-4">
                            {chosenHouse.features.map((feature, index) => (
                              <li key={index}>
                                <p>{feature}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {chosenHouse.description && (
                      <div className="mt-6">
                        <h2 className="">Description</h2>

                        <div className="mt-3 ml-3 space-y-6">
                          <p className="">{chosenHouse.description}</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <h2 className="">Similar Properties</h2>

                      <div className="mt-3 ml-3 space-y-6">
                        {similarProperties.length > 0 ? (
                          <PropertiesList
                            propertyType={similarProperties}
                            limit={3}
                          />
                        ) : (
                          <p>No similar places exist</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Col2: Agent Card */}
                  <div className="lg:row-span-5 lg:mt-0">
                    <Card
                      title={chosenHouse.creator.name}
                      subtitle="Grnata"
                      imageUrl={`http://localhost:3000/uploads/images/${chosenHouse.creator.image}`}
                      buttons={[
                        {
                          label: "Call",
                          onClick: () => {
                            window.location.href = `tel:${chosenHouse.creator.phoneNumber}`;
                          },
                        },
                      ]}
                      Links={[
                        {
                          label: "Message",
                          url: `/messages/${chosenHouse.creator.id}`,
                        },
                      ]}
                    />
                  </div>
                </div>
                <Alert />
                <DropDownDialog />
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
