import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

const EditEvent = ({ events, handleEditEvent }) => {
  const { tripID, eventID } = useParams();
  const event = events.find((event) => event._id === eventID);
  console.log(event);
  console.log(event.image);
  const [fields, setFields] = useState(event);
  const [image, setImage] = useState(event.image);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate()
  const navigateToTrip = () => {
    navigate(`/${tripID}`)
  }

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFields = {
      ...fields,
      [name]: value,
    };
    console.log(updatedFields);
    setFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditEvent({ ...fields, image: image }, fields._id);
  };

  return (
    <>
      <div className="trip-div">
        <h1 className="trip-heading">Edit event: {fields.title}</h1>
        <form onSubmit={handleSubmit}
          className="trip-form">
          <div>
            <Box
              // component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Event Title"
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
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                label="country"
                variant="outlined"
                name="country"
                value={fields.country}
                onChange={handleChange}
                placeholder="country"
                type="text"
              />
            </Box>
          </div>
          <div>
            <Box
              // component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                label="City"
                variant="outlined"
                name="city"
                value={fields.city}
                onChange={handleChange}
                placeholder="city"
                type="text"
              />
            </Box>
          </div>
          <div>
            <Box
              // component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic totalCost"
                label="Cost"
                variant="outlined"
                name="cost"
                value={fields.cost}
                onChange={handleChange}
                placeholder="Cost"
                type="number"
              />
            </Box>
          </div>
          <div>
            <Box
              // component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
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
              <h4><label htmlFor="image">Upload a cover photo for your event!</label></h4>
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
              <Button variant="contained" type="submit">Submit</Button>
              <Button variant="contained" onClick={navigateToTrip}>Cancel</Button>
            </Stack>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditEvent;
