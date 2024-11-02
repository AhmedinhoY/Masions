import * as Form from "@radix-ui/react-form";
import "./AuthenticationForm.css";

const RegisterForm = () => (
  <Form.Root className="FormRoot">
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

    {/* confirm password */}

    <Form.Field className="FormField" name="password">
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
    </Form.Field>

    {/* phone */}

    <Form.Field className="FormField" name="password">
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
        <input className="Input" type="number" required />
      </Form.Control>
    </Form.Field>

    <Form.Submit asChild>
      <div className="flex justify-center">
        <button className="primary-btn my-3">Register</button>
      </div>
    </Form.Submit>
  </Form.Root>
);

export default RegisterForm;
