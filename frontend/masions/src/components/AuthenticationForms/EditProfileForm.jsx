/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import "./AuthenticationForm.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useEditProfileDialog } from "../../shared/context/dropdowndialog-context";
import { useToast } from "../../shared/context/Toast-context";
import { ImageUpload } from "../../shared/ImageUpload";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const EditProfileForm = () => {
  const auth = useContext(AuthContext);
  const { closeEditProfileDialog } = useEditProfileDialog();
  const { showToast } = useToast();
  const navigate = useNavigate()


  // State for user data, freelancer status, and agency input
  const [user, setUser] = useState({});
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [agencyInput, setAgencyInput] = useState("");
  const [image, setImage] = useState({});

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/getUser/${auth.user.id}`,
          { withCredentials: true }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching the user:", error);
      }
    };

    fetchUserData();
  }, [auth.user.id]);

  // Set the agency and image values after user data is fetched
  useEffect(() => {
    if (user.agency) {
      setAgencyInput(user.agency);
    }
    if (user.image) {
      setImage(user.image);
    }
  }, [user]);

  // Handle freelancer toggle
  const handleFreelancerToggle = () => {
    setIsFreelancer((prevState) => {
      if (prevState) {
        setAgencyInput(user.agency);
      }
      return !prevState;
    });
  };

  // Handle agency input change
  const handleAgencyInputChange = (event) => {
    setAgencyInput(event.target.value);
  };

  // Handle image input change
  const handleImageInput = (name, file, isValid) => {
    setImage((prevImages) => ({
      ...prevImages,
      [name]: file,
    }));
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("name", event.target.name.value);
    data.append("agency", event.target.agency.value);
    data.append("phoneNumber", event.target.phoneNumber.value);

    console.log(event.target.image.files[0]); // this is the image file - send it to the backend
    // Only append image if a new file is selected
    if (event.target.image.files[0]) {
      data.append("image", event.target.image.files[0]);
    } else if (user.image) {
      // Keep the old image if no new file is selected
      data.append("image", user.image);
    } else {
      alert("Please upload an image before submitting!");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/users/editProfile/${auth.user.id}`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }

      );


      console.log("Response:", response);
      closeEditProfileDialog();
      showToast("success", "Your info has been updated successfully");
      navigate("/")
    } catch (err) {
      console.error("Error:", err);
      showToast("error", "Failed. Please try again later.");
    }
  };

  return (
    <Form.Root className="FormRoot" onSubmit={handleSubmit}>
      {/* Name Field */}
      <Form.Field className="FormField" name="name">
        <div className="flex align-baseline justify-between">
          <Form.Label>Name</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your name
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            type="string"
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </Form.Control>
      </Form.Field>

      {/* Phone Number Field */}
      <Form.Field className="FormField" name="phoneNumber">
        <div className="flex align-baseline justify-between">
          <Form.Label>Phone Number</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your phone number
          </Form.Message>
          <Form.Message className="FormMessage" match="patternMismatch">
            Please enter a valid Bahraini phone number
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            type="tel"
            pattern="^(36|34|33|35|39|37|66|67)\d{6}$"
            value={user.phoneNumber || ""}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            required
          />
        </Form.Control>
      </Form.Field>

      {/* Freelancer Checkbox */}
      <Form.Field className="FormField" name="freelancer">
        <div className="flex items-center">
          <Form.Label>Are you a freelancer?</Form.Label>
          <Checkbox.Root
            className="flex size-[20px] appearance-none items-center justify-center outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px_black]"
            checked={isFreelancer}
            onClick={handleFreelancerToggle}
          >
            <Checkbox.Indicator style={{ color: "var(--primary)" }}>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
        </div>
      </Form.Field>

      {/* Agency Field */}
      <Form.Field className="FormField" name="agency">
        <div className="flex align-baseline justify-between">
          <Form.Label>Agency</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please choose an agency
          </Form.Message>
        </div>
        <Form.Control asChild>
          {isFreelancer ? (
            <input
              className="Input"
              type="text"
              value="Freelancer"
              disabled
              readOnly
              required
            />
          ) : (
            <input
              className="Input"
              type="text"
              value={agencyInput}
              onChange={handleAgencyInputChange}
              required
            />
          )}
        </Form.Control>
      </Form.Field>

      {/* Image Upload */}
      <Form.Field className="FormField" name="image">
        <Form.Label>Image</Form.Label>
        <Form.Control asChild>
          <ImageUpload
            name="image"
            numOfImages={1}
            onInput={handleImageInput}
            errorText="Image is required"
            className="img-input"
            editImageUploaded={user.image}
          />
        </Form.Control>
      </Form.Field>

      {/* Submit Button */}
      <Form.Submit asChild>
        <div className="flex justify-center">
          <button className="primary-btn my-3">Submit</button>
        </div>
      </Form.Submit>
    </Form.Root>
  );
};

export default EditProfileForm;
