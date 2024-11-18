import * as Form from "@radix-ui/react-form";
import "./AuthenticationForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleInputs = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(data);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/users/login",

        data,
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }

    event.target.reset(); //reset the input fields
  };

  return (
    <Form.Root className="FormRoot" onSubmit={handleInputs}>
      {/* Form.Root is basically the form tag <form> */}
      <Form.Field className="FormField" name="email">
        {/* Form.Field is just a div tag */}
        {/* If you notice here in the Form.Field component we have a prop called name used to identify this field input. (The value of it will be the name of the Form Control which is the input field therefore we can fetch the input data by it) */}
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
  );
};
export default LoginForm;
