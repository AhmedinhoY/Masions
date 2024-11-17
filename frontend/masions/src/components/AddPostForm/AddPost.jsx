import * as Form from "@radix-ui/react-form";
import "../AuthenticationForms/AuthenticationForm.css";

export const AddPost = () => {
  return (
    <Form.Root className="FormRoot">
      <Form.Field className="FormField" name="type">
        <div className="flex align-baseline justify-between">
          <Form.Label className="">Type</Form.Label>
          {/* <Form.Message className="FormMessage" match="valueMissing">
            Please select post type
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid email
          </Form.Message> */}
        </div>
        <Form.Control asChild>
          <select className="Input">
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
          </select>
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="status">
        <div className="flex align-baseline justify-between">
          <Form.Label className="">Status</Form.Label>
        </div>
        <Form.Control asChild>
          <select className="Input">
            <option value="sale">For Sale</option>…
            <option value="rent">For Rent</option>…
          </select>
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="city">
        <div className="flex align-baseline justify-between">
          <Form.Label className="">City</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter a city
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid city
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="text" required />
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="address">
        <div className="flex align-baseline justify-between">
          <Form.Label className="">Address</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter a address
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid address
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="text" required />
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="bedrooms">
        <div className="flex align-baseline justify-between">
          <Form.Label className="">Bedrooms</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter bedrooms
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid bedrooms
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="number" required />
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="bathrooms">
        <div className="flex align-baseline justify-between">
          <Form.Label className="">Bathrooms</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter bathrooms
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid bathrooms
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="number" required />
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="Area">
        <div className="flex align-baseline justify-between">
          <Form.Label className="">Area</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter Area in m<sub>2</sub>
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid Area
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="number" required />
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="price">
        <div className="flex align-baseline justify-between">
          <Form.Label className="">Price</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter price
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid price
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="number" required />
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="features">
        <div className="flex align-baseline justify-between">
          <Form.Label className="">Features</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter features
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid features
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="text" required />
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="description">
        <div className="flex align-baseline justify-between">
          <Form.Label className="">Description</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter description
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid description
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="text" required />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <div className="flex justify-center">
          <button className="primary-btn my-3">Add Post</button>
        </div>
      </Form.Submit>
    </Form.Root>
  );
};
