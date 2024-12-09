/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import * as Form from "@radix-ui/react-form";
import "./AuthenticationForm.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useDropDownDialog } from "../../shared/context/dropdowndialog-context";
import { useToast } from "../../shared/context/Toast-context";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const { closeDropDownDialog } = useDropDownDialog();
  const { showToast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      await login(data.email, data.password);
      closeDropDownDialog();
      showToast("success", "Log in successful! Welcome back to Maisons!");
      event.target.reset();
    } catch (error) {
      console.error("Log in error:", error);
      showToast("error", "Log in failed. Please try again.");
    }
  };

  return (
    <>
      <Form.Root className="FormRoot" onSubmit={handleSubmit}>
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
        <Form.Submit asChild>
          <div className="flex justify-center">
            <button className="primary-btn my-3">Log in</button>
          </div>
        </Form.Submit>
      </Form.Root>
    </>
  );
};
export default LoginForm;
