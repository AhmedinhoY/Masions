/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import * as Form from "@radix-ui/react-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import "./AuthenticationForm.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useSellerReqDialog } from "../../shared/context/dropdowndialog-context";
import { useToast } from "../../shared/context/Toast-context";
import { ImageUpload } from "../../shared/ImageUpload";
import axios from "axios";

const SellerReqForm = () => {
  const auth = useContext(AuthContext);
  const { closeSellerReqDialog } = useSellerReqDialog();
  const { showToast } = useToast();

  const [isFreelancer, setIsFreelancer] = useState(false);
  const [agencyInput, setAgencyInput] = useState("");
  const [images, setImages] = useState({});

  const handleFreelancerToggle = () => {
    setIsFreelancer((prevState) => {
      if (prevState) {
        setAgencyInput("");
      }
      return !prevState;
    });
  };

  const handleInputChange = (event) => {
    setAgencyInput(event.target.value);
  };

  const handleImageInput = (name, file, isValid) => {
    setImages((prevImages) => ({
      ...prevImages,
      [name]: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("cpr", event.target.cpr.value);
    data.append("agency", event.target.agency.value);

    if (images.image) {
      data.append("image", images.image); // Key must match backend's expectation
    } else {
      alert("Please upload an image before submitting!");
      return;
    }

    console.log(
      "form data: ",
      data.get("cpr"),
      data.get("agency"),
      data.get("image")
    );

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/users/updateToSeller/${auth.user.id}`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);
      closeSellerReqDialog();
      showToast("success", "Your request has been sent successfully");
    } catch (err) {
      console.error("Error:", err);
      showToast("error", "Failed. Please try again later.");
    }

    // event.target.reset(); //reset the input fields
  };

  return (
    <Form.Root className="FormRoot" onSubmit={handleSubmit}>
      <Form.Field className="FormField" name="cpr">
        <div className="flex align-baseline justify-between">
          <Form.Label className="">CPR</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your CPR
          </Form.Message>
          <Form.Message className="FormMessage" match="patternMismatch">
            Please provide a valid CPR
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            type="number"
            pattern="^(6[0-9]|7[0-9]|8[0-9]|9[0-9]|0[1-9]|1[0-9]|2[0-4])(0[1-9]|1[0-2])\d{5}$"
            required
          />
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="">
        <div className="flex items-center">
          <label className="pr-[15px] leading-none" htmlFor="c1">
            <Form.Label className="">Are you a freelancer?</Form.Label>
          </label>
          <Checkbox.Root
            className="flex size-[20px] appearance-none items-center justify-center  outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px_black]"
            style={{
              borderRadius: "var(--border-radius-input)",
              borderColor: "var(--border-seperator-color)",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            checked={isFreelancer} // Controlled by state
            onClick={handleFreelancerToggle} // Handle change
            id="c1"
          >
            <Checkbox.Indicator style={{ color: "var(--primary)" }}>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
        </div>
      </Form.Field>
      <Form.Field className="FormField" name="agency">
        <div className="flex align-baseline justify-between">
          <Form.Label className="">Agency</Form.Label>

          <Form.Message className="FormMessage" match="valueMissing">
            Please chose an agency
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid agency
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
              value={agencyInput} // Controlled input
              onChange={handleInputChange} // Handle input change
              required
            />
          )}
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="image">
        <Form.Label>Image</Form.Label>
        <Form.Control asChild>
          <ImageUpload
            name="image"
            numOfImages={1}
            onInput={handleImageInput}
            errorText={`required.`}
            className="img-input"
          />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <div className="flex justify-center">
          <button className="primary-btn my-3">Submit</button>
        </div>
      </Form.Submit>
    </Form.Root>
  );
};
export default SellerReqForm;
