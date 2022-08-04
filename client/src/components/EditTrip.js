import { useState } from "react";
import { useParams, Link } from "react-router-dom";

const EditTrip = ({ trips, handleEdit }) => {
  const { tripID } = useParams();
  const trip = trips.find((trip) => trip._id === tripID);

  const [fields, setFields] = useState(trip);
  const [image, setImage] = useState(trip.image);
  const [buttonDisabled, setButtonDisabled] = useState(true);

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
    handleEdit({ ...fields, image: image }, fields._id);
  };

  return (
    <>
      <h1>Edit trip: {trip.title}</h1>
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
          <Link to={`/${trip._id}`}>Cancel</Link>
        </button>
      </form>
    </>
  );
};

export default EditTrip;
