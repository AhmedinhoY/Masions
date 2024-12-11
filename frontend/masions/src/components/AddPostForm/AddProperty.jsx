/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import "../AuthenticationForms/AuthenticationForm.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useToast } from "../../shared/context/Toast-context";
import axios from "axios";
import { ImageUpload } from "../../shared/ImageUpload";

export const AddProperty = () => {
  const [images, setImages] = useState({}); // To store images by name
  const [features, setFeatures] = useState([" "]);
  const auth = useContext(AuthContext);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Handle change in input fields
  const handleInputChange = (index, event) => {
    const newFeatures = [...features];
    newFeatures[index] = event.target.value;
    setFeatures(newFeatures);
  };

  // Add a new input field
  const handleAddInput = () => {
    const updatedFeatures = [...features, ""];
    setFeatures(updatedFeatures);
    console.log("Updated Features after Add:", updatedFeatures);
  };

  const handleRemoveInput = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
    console.log("Updated Features after Remove:", updatedFeatures);
  };

  const handleImageInput = (name, file, isValid) => {
    setImages((prevImages) => ({
      ...prevImages,
      [name]: file,
    }));
  };

  const handleSubmission = async (event) => {
    event.preventDefault();
    if (inputRef.current) {
      const value = inputRef.current.value;
      if (value === "") {
        inputRef.current.setCustomValidity("This field cannot be empty");
      } else {
        inputRef.current.setCustomValidity("");
      }
    }

    console.log("Features before submission:", features);

    // Append other form data
    const data = new FormData();
    data.append("type", event.target.type.value);
    data.append("status", event.target.status.value);
    data.append("city", event.target.city.value);
    data.append("address", event.target.address.value);
    data.append("price", event.target.price.value);
    data.append("bedrooms", event.target.bedrooms.value);
    data.append("bathrooms", event.target.bathrooms.value);
    data.append("area", event.target.area.value);
    data.append("description", event.target.description.value);

    // Append images from state
    Object.keys(images).forEach((key) => {
      if (images[key]) {
        data.append(key, images[key]);
      }
    });
    console.log("features before append", features);

    features.forEach((feature, index) => {
      data.append(`features[${index}]`, feature);
    });
    // Log the appended features using getAll()
    const featuresArray = [];
    for (let i = 0; i < features.length; i++) {
      featuresArray.push(data.get(`features[${i}]`));
    }

    console.log("Features in FormData:", featuresArray);

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
      showToast("success", "Your property has been added successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      showToast("error", "Failed. Please try again later.");
    }
  };

  if (!auth.token) {
    return <Navigate to="/" replace />;
  }

  if(auth.user.roles != 'seller'){
    console.log('you are a buyer ha ha ha');
  }


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
          <Form.Label>Address</Form.Label>
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
                className="secondary-btn !w-[5%] !h-[90%]"
                onClick={() => handleAddInput(index)}
              >
                +
              </button>
              {features.length > 1 && (
                <button
                  type="button"
                  className="danger-btn !w-[5%] !h-[80%]"
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
                numOfImages={4}
                onInput={handleImageInput}
                errorText={`required.`}
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
