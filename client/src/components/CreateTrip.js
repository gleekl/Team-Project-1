import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  author: "",
  title: "",
  startDate: "",
  endDate: "",
  totalCost: 0,
  description: "",
};

const CreateTrip = (props) => {
  const [fields, setFields] = useState(initialState);
  const [image, setImage] = useState(null);

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
    props.handleCreate({ ...fields, image: image });
    setFields(initialState);
    setImage(null);
  };

  return (
    <>
      <h1>Create a new trip!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="author">Author</label>
          <input
            name="author"
            value={fields.author}
            onChange={handleChange}
            placeholder="author"
            type="text"
            id="author"
          />
        </div>
        <div>
          <label htmlFor="title">Trip Title</label>
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
          <label htmlFor="startDate">Start Date</label>
          <input
            name="startDate"
            value={fields.startDate}
            onChange={handleChange}
            type="date"
            id="startDate"
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            name="endDate"
            value={fields.endDate}
            onChange={handleChange}
            type="date"
            id="endDate"
          />
        </div>
        <div>
          <label htmlFor="totalCost">Total Cost</label>
          <input
            name="totalCost"
            value={fields.totalCost}
            onChange={handleChange}
            type="number"
            id="totalCost"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            name="description"
            value={fields.description}
            onChange={handleChange}
            placeholder="Enter some information about your trip!"
            type="text"
            id="description"
          />
        </div>
        <div>
          <label htmlFor="image">Upload a cover photo for your trip!</label>
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
        <button>
          <Link to={`/`}>Cancel</Link>
        </button>
      </form>
    </>
  );
};

export default CreateTrip;
