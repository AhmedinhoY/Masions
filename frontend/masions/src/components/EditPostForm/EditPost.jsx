/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../shared/context/auth-context";
import { useToast } from "../../shared/context/Toast-context";
import { ImageUpload } from "../../shared/ImageUpload";
import "../AuthenticationForms/AuthenticationForm.css";

export const EditPost = () => {

  const property = useLoaderData(); // Fetch existing property data
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { showToast } = useToast();

  const [images, setImages] = useState(() =>
    property.img.reduce(
      (acc, img, index) => ({ ...acc, [`image${index}`]: img.imgSrc }),
      {}
    )
  );
  const [features, setFeatures] = useState(property.features || [""]);
  const [type, setType] = useState(property.type || " ");
  const [status, setStatus] = useState(property.status || "");
  const [availability, setAvailability] = useState(property.availability || "");

  const inputRef = useRef();

  const handleInputChange = (index, event) => {
    const newFeatures = [...features];
    newFeatures[index] = event.target.value;
    setFeatures(newFeatures);
  };

  const handleAddInput = () => {
    setFeatures((prevFeatures) => [...prevFeatures, ""]);
  };

  const handleRemoveInput = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  const handleImageInput = (name, file) => {
    setImages((prevImages) => ({
      ...prevImages,
      [name]: file,
    }));
  };

  const handleSubmission = async (event) => {
    event.preventDefault();



    const data = new FormData();
    data.append("type", type);
    data.append("status", status);
    data.append("availability", availability);
    data.append("city", event.target.city.value);
    data.append("address", event.target.address.value);
    data.append("price", event.target.price.value);
    data.append("bedrooms", event.target.bedrooms.value);
    data.append("bathrooms", event.target.bathrooms.value);
    data.append("area", event.target.area.value);
    data.append("description", event.target.description.value);

    features.forEach((feature, index) => {
      data.append(`features[${index}]`, feature);
    });

    Object.keys(images).forEach((key) => {
      if (images[key]) {
        data.append(key, images[key]);
      }
    });

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/places/${property.id}`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update response:", response);
      showToast("success", "Your property has been edited successfully!");
      navigate("/");
    } catch (err) {
      console.error("Update error:", err);
      showToast("error", "Failed. Please try again later.");
    }
  };

  if (!auth.token) {
    return <Navigate to="/" replace />;
  }


  // any user that did not create this post is not allowed to edit it
  if (property.creator.id != auth.user.id) {
    navigate('/');
  }


  return (
    <Form.Root className="FormRoot" onSubmit={handleSubmission}>
      {/* Type */}
      <Form.Field className="FormField" name="type">
        <div className="flex align-baseline justify-between">
          <Form.Label>Type</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please select a type
          </Form.Message>
        </div>
        <div>
          <select
            className="Input"
            onChange={(e) => setType(e.target.value)}
            defaultValue={property.type}
            required
          >
            <option value="">Select type</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Land">Land</option>
          </select>
        </div>
      </Form.Field>

      {/* Status */}
      <Form.Field className="FormField" name="status">
        <div className="flex align-baseline justify-between">
          <Form.Label>Property Status</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please select an option
          </Form.Message>
        </div>
        <div>
          <select
            className="Input"
            onChange={(e) => setStatus(e.target.value)}
            defaultValue={property.status}

            required
          >
            <option value="">Select status</option>
            <option value="Sale">For sale</option>
            <option value="Rent">For rent</option>
          </select>
        </div>
      </Form.Field>

      {/* Avaliability */}
      <Form.Field className="FormField" name="availability">
        <div className="flex align-baseline justify-between">
          <Form.Label>Property Availability</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please select an option
          </Form.Message>
        </div>
        <div>
          <select
            className="Input"
            onChange={(e) => setAvailability(e.target.value)}
            defaultValue={property.availability}
            required
          >
            <option value="">Select status</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>
        </div>
      </Form.Field>

      {/* City */}
      <Form.Field className="FormField" name="city">
        <div className="flex align-baseline justify-between">
          <Form.Label>City</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter a city
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            type="text"
            defaultValue={property.city}
            required
          />
        </Form.Control>
      </Form.Field>

      {/* Address */}
      <Form.Field className="FormField" name="address">
        <div className="flex align-baseline justify-between">
          <Form.Label>Address</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter an address
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            type="text"
            defaultValue={property.address}
            required
          />
        </Form.Control>
      </Form.Field>

      {/* Price */}
      <Form.Field className="FormField" name="price">
        <div className="flex align-baseline justify-between">
          <Form.Label>Price</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter a price
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            type="number"
            defaultValue={property.price}
            required
          />
        </Form.Control>
      </Form.Field>

      {/* Bedrooms */}
      <Form.Field className="FormField" name="bedrooms">
        <div className="flex align-baseline justify-between">
          <Form.Label>Bedrooms</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter the number of bedrooms
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            type="number"
            defaultValue={property.bedrooms}
            required
          />
        </Form.Control>
      </Form.Field>

      {/* Bathrooms */}
      <Form.Field className="FormField" name="bathrooms">
        <div className="flex align-baseline justify-between">
          <Form.Label>Bathrooms</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter the number of bathrooms
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            type="number"
            defaultValue={property.bathrooms}
            required
          />
        </Form.Control>
      </Form.Field>

      {/* Area */}
      <Form.Field className="FormField" name="area">
        <div className="flex align-baseline justify-between">
          <Form.Label>Area</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter the area
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            type="number"
            defaultValue={property.area}
            required
          />
        </Form.Control>
      </Form.Field>

      {/* Features */}
      <Form.Field className="FormField" name="features">
        <div>
          <Form.Label>Features</Form.Label>
          {features.map((feature, index) => (
            <div
              className="relative flex items-center space-x-2 mb-2"
              key={index}
            >
              <input
                ref={inputRef}
                type="text"
                value={feature}
                onChange={(e) => handleInputChange(index, e)}
                className="Input !w-[90%]"
              />
              <button
                type="button"
                className="primary-btn !w-[5%] !h-[90%]"
                onClick={() => handleAddInput(index)}
              >
                +
              </button>
              {features.length > 1 && (
                <button
                  type="button"
                  className="primary-btn !w-[5%] !h-[80%]"
                  onClick={() => handleRemoveInput(index)}
                >
                  x
                </button>
              )}
            </div>
          ))}
        </div>
      </Form.Field>

      {/* Description */}
      <Form.Field className="FormField" name="description">
        <div className="flex align-baseline justify-between">
          <Form.Label>Description</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter a description
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            className="Input"
            defaultValue={property.description}
            required
          />
        </Form.Control>
      </Form.Field>

      {/* Image Upload */}
      <div className="flex flex-row justify-between flex-wrap gap-4">
        {[0, 1, 2, 3].map((index) => (
          <Form.Field
            name={`image${index}`}
            key={index}
            className="FormField h-full w-[48%]"
          >
            <Form.Label>Image {index + 1}</Form.Label>
            <Form.Control asChild>
              <ImageUpload
                name={`image${index}`}
                onInput={handleImageInput}
                errorText={`required.`}
                editImageUploaded={property.img[index].imgSrc}
              />
            </Form.Control>
          </Form.Field>
        ))}
      </div>

      {/* Submit */}
      <Form.Submit
        asChild
        className="!flex flex-row justify-center items-center !mx-auto"
      >
        <button className="primary-btn mt-4 !w-[85%] ">Update Property</button>
      </Form.Submit>
    </Form.Root>
  );
};
