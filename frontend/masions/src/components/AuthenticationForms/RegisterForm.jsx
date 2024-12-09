/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useToast } from "../../shared/context/Toast-context";
import * as Form from "@radix-ui/react-form";
import "./AuthenticationForm.css";
import { useDropDownDialog } from "../../shared/context/dropdowndialog-context";

const RegisterForm = () => {
  const { signUp } = useContext(AuthContext);
  const { closeDropDownDialog } = useDropDownDialog();
  const { showToast } = useToast();

  const handleInputs = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      phoneNumber: formData.get("phoneNumber"),
    };

    try {
      await signUp(data);
      closeDropDownDialog();
      showToast("success", "Sign up successful! Welcome to Maisons!");

      event.target.reset();
    } catch (error) {
      console.error("Sign up error:", error);
      showToast("error", "Sign up failed. Please try again.");
    }
  };

  return (
    <>
      <Form.Root className="FormRoot" onSubmit={handleInputs}>
        {/* name */}
        <Form.Field className="FormField" name="name">
          <div className="flex align-baseline justify-between">
            <Form.Label className="">Name</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your name
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid name
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="string" required />
          </Form.Control>
        </Form.Field>

        {/* email */}
        <Form.Field className="FormField" name="email">
          <div className="flex align-baseline justify-between">
            <Form.Label className="">Email</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your email
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="email" required />
          </Form.Control>
        </Form.Field>

        {/* password */}
        <Form.Field className="FormField" name="password">
          <div className="flex align-baseline justify-between">
            <Form.Label className="">Password</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your password
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid password
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="password" required />
          </Form.Control>
        </Form.Field>

        {/* confirm password

        <Form.Field className="FormField" name="confirmPassword">
          <div className="flex align-baseline justify-between">
            <Form.Label className="">Confirm Password</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your password
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide the same password
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="password" required />
          </Form.Control>
        </Form.Field> */}

        {/* Phone Number */}
        <Form.Field className="FormField" name="phoneNumber">
          <div className="flex align-baseline justify-between">
            <Form.Label>Phone Number</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your phone number
            </Form.Message>
            <Form.Message className="FormMessage" match="patternMismatch">
              Please enter Bahraini phone number
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="tel"
              pattern="^(36|34|33|35|39|37|66|67)\d{6}$"
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <div className="flex justify-center">
            <button className="primary-btn my-3">Register</button>
          </div>
        </Form.Submit>
      </Form.Root>
    </>
  );
};

export default RegisterForm;
