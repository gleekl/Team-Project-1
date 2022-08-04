import { useState } from "react";
import { useParams } from "react-router-dom";

const initialState = {
  title: "",
  country: "",
  city: "",
  description: "",
  cost: 0
};

const CreateEvent = (props) => {
  const [fields, setFields] = useState(initialState);
  const [image, setImage] = useState(null);

  const { tripID } = useParams()

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFields = {
      ...fields,
      [name]: value,
    };
    setFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleCreateEvent({ ...fields, image: image }, tripID);
    setFields(initialState);
    setImage(null);
  };

  return (
    <>
      <h1>Create a new trip event!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Trip Event Title</label>
          <input
            name="title"
            value={fields.title}
            onChange={handleChange}
            placeholder="title"
            type="text"
            id="title"
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            name="country"
            value={fields.country}
            onChange={handleChange}
            type="text"
            id="country"
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            name="city"
            value={fields.city}
            onChange={handleChange}
            type="text"
            id="city"
          />
        </div>
        <div>
          <label htmlFor="cost">Cost</label>
          <input
            name="cost"
            value={fields.cost}
            onChange={handleChange}
            type="number"
            id="cost"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            name="description"
            value={fields.description}
            onChange={handleChange}
            placeholder="Enter some information about your event!"
            type="text"
            id="description"
          />
        </div>
        <div>
          <label htmlFor="image">Upload a photo for your trip event!</label>
          <br />
          <input
            name="image"
            onChange={handleImageChange}
            id="image"
            type="file"
          />
          <input type="submit" value="Upload" />
        </div>
        <button>Submit</button>
        <button>Cancel</button>
      </form>
    </>
  );
}

export default CreateEvent