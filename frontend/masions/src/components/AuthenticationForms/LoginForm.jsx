import * as Form from "@radix-ui/react-form";
import "./AuthenticationForm.css";

const LoginForm = () => (
  <Form.Root className="FormRoot">
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
);

export default LoginForm;
