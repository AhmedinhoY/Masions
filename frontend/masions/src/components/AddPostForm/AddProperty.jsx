/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import * as Form from "@radix-ui/react-form";
import "../AuthenticationForms/AuthenticationForm.css";
import { AuthContext } from "../../shared/context/auth-context";
import axios from "axios";
import { ImageUpload } from "../../shared/ImageUpload";

export const AddProperty = () => {
  const [images, setImages] = useState({}); // To store images by name
  const auth = useContext(AuthContext);

  const handleImageInput = (name, file, isValid) => {
    setImages((prevImages) => ({
      ...prevImages,
      [name]: file,
    }));
  };

  const handleSubmission = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Append other form data
    const data = new FormData();
    data.append("type", formData.get("type"));
    data.append("status", formData.get("status"));
    data.append("city", formData.get("city"));
    data.append("address", formData.get("address"));
    data.append("price", formData.get("price"));
    data.append("bedrooms", formData.get("bedrooms"));
    data.append("bathrooms", formData.get("bathrooms"));
    data.append("area", formData.get("area"));
    data.append("description", formData.get("description"));

    // Append images from state
    Object.keys(images).forEach((key) => {
      if (images[key]) {
        data.append(key, images[key]);
      }
    });

    console.log("FormData:", ...data.entries());

    try {
      const response = await axios.post(
        "http://localhost:3000/api/places/add-property",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Form.Root className="FormRoot" onSubmit={handleSubmission}>
      {/* {console.log(auth.token)}
      {console.log(auth.user)}
      {console.log(auth.isLoggedIn)} */}
      {/* Type */}
      <Form.Field className="FormField" name="type">
        <div className="flex align-baseline justify-between">
          <Form.Label>Type</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please select a type
          </Form.Message>
        </div>
        <Form.Control asChild>
          <select className="Input" required>
            <option value="">Select type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
          </select>
        </Form.Control>
      </Form.Field>

      {/* Status */}
      <Form.Field className="FormField" name="status">
        <div className="flex align-baseline justify-between">
          <Form.Label>Property Status</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please select an option
          </Form.Message>
        </div>
        <Form.Control asChild>
          <select className="Input" required>
            <option value="">Select status</option>
            <option value="sale">For sale</option>
            <option value="rent">For rent</option>
          </select>
        </Form.Control>
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
          <input className="Input" type="text" required />
        </Form.Control>
      </Form.Field>

      {/* Address */}
      <Form.Field className="FormField" name="address">
        <div className="flex align-baseline justify-between">
          <Form.Label>Address (5J8F+M2 Sitra)</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter an address
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="text" required />
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
          <input className="Input" type="number" required />
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
          <input className="Input" type="number" required />
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
          <input className="Input" type="number" required />
        </Form.Control>
      </Form.Field>

      {/* Area */}
      <Form.Field className="FormField" name="area">
        <div className="flex align-baseline justify-between">
          <Form.Label>Area (sq. ft.)</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter the area
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="number" required />
        </Form.Control>
      </Form.Field>

      {/* Features */}
      <Form.Field className="FormField" name="features">
        <div className="flex align-baseline justify-between">
          <Form.Label>Features (comma-separated)</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter features
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="text" />
        </Form.Control>
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
          <textarea className="Input" required />
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
                errorText={`Image ${index + 1} is required.`}
              />
            </Form.Control>
          </Form.Field>
        ))}
      </div>

      {/* Submit Button */}
      <Form.Submit asChild>
        <div className="flex justify-center">
          <button className="primary-btn my-3">Submit</button>
        </div>
      </Form.Submit>
    </Form.Root>
  );
};
