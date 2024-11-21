import * as Form from "@radix-ui/react-form";
import "./AuthenticationForm.css";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterForm = ({ closeDialog, onLoginSuccess }) => {
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleInputs = async (event) => {
    event.preventDefault();

    // Fetch form data using formData API
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirmPassword"),
      phoneNumber: formData.get("phoneNumber"),
      image: formData.get("image"),
    };

    try {
      // Send POST request to the backend to register the user
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        data,
        {
          withCredentials: true,
        }
      );
      const { success, message } = response.data;

      alert("Logged in successfully");
      setTimeout(() => {
        closeDialog();
        onLoginSuccess();
      }, 500);
      // Close the dialog
    } catch (error) {
      console.log(error);
      handleError("Something went wrong, please try again.");
    }

    // Reset form fields
    event.target.reset();
  };

  return (
    <Form.Root className="FormRoot" onSubmit={handleInputs}>
      {/* email */}

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
          <input className="Input" type="string" />
        </Form.Control>
      </Form.Field>

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

      {/* confirm password */}

      {/* <Form.Field className="FormField" name="confirmPassword">
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

      {/* phone */}

      <Form.Field className="FormField" name="phoneNumber">
        <div className="flex align-baseline justify-between">
          <Form.Label className="">Phone Number</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your phone number
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid phone number
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="number" />
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="image">
        <div className="flex align-baseline justify-between">
          <Form.Label className="">Image</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please chose an image
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid phone number
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="file" required />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <div className="flex justify-center">
          <button className="primary-btn my-3">Register</button>
        </div>
      </Form.Submit>
    </Form.Root>
  );
};

export default RegisterForm;
