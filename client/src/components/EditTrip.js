import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const EditTrip = ({ trips, handleEdit }) => {
  const { tripID } = useParams();
  const trip = trips.find((trip) => trip._id === tripID);

  const [fields, setFields] = useState(trip);
  const [image, setImage] = useState(trip.image);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const navigateToIndex = () => {
    navigate("/");
  };

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
      <div className="trip-div">
        <h1 className="trip-heading">Edit trip: {trip.title}</h1>
        <form onSubmit={handleSubmit} className="trip-form">
          <div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Author"
                variant="outlined"
                name="author"
                value={fields.author}
                onChange={handleChange}
                placeholder="author"
                type="text"
              />
            </Box>
          </div>
          <div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Trip Title"
                variant="outlined"
                name="title"
                value={fields.title}
                onChange={handleChange}
                placeholder="title"
                type="text"
              />
            </Box>
          </div>
          <div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                label="Trip Start Date"
                variant="outlined"
                name="startDate"
                value={fields.startDate}
                onChange={handleChange}
                placeholder="startDate"
                type="date"
              />
            </Box>
          </div>
          <div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                label="Trip End Date"
                variant="outlined"
                name="endDate"
                value={fields.endDate}
                onChange={handleChange}
                placeholder="endDate"
                type="date"
              />
            </Box>
          </div>
          <div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic totalCost"
                label="Total Cost"
                variant="outlined"
                name="totalCost"
                value={fields.totalCost}
                onChange={handleChange}
                placeholder="Total Cost"
                type="number"
              />
            </Box>
          </div>
          <div>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Trip Description"
                multiline={true}
                rows={5}
                variant="outlined"
                name="description"
                value={fields.description}
                onChange={handleChange}
                placeholder="description"
                type="text"
              />
            </Box>
          </div>
          <br />
          <div className="form-padding">
            <div>
              <h4>
                <label htmlFor="image">
                  Upload a cover photo for your trip!
                </label>
              </h4>
              <br />
              <input
                name="image"
                onChange={handleImageChange}
                id="image"
                type="file"
              />
            </div>
            <br />
            <br />
            <Stack spacing={2} direction="row" className="button">
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button variant="contained" onClick={navigateToIndex}>
                Cancel
              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditTrip;
