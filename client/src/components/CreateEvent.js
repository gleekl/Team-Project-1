import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { tripID } = useParams()

  const navigate = useNavigate()

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
    const isDisabled = Object.values(updatedFields).some((v) => !v);
    setButtonDisabled(isDisabled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleCreateEvent({ ...fields, image: image }, tripID);
    setFields(initialState);
    setImage(null);
    navigate(`/${tripID}`)
  };

  return (
    <>
      <div className="trip-div">
        <h1 className="trip-heading">Create a new trip event!</h1>
        <form onSubmit={handleSubmit}>
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
                id="outlined-basic title"
                label="Title"
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
                id="outlined-basic country"
                label="Country"
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
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic city"
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
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic cost"
                label="Cost"
                variant="outlined"
                name="cost"
                value={fields.cost}
                onChange={handleChange}
                placeholder="cost"
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
                id="outlined-basic description"
                label="Description"
                variant="outlined"
                name="description"
                value={fields.description}
                onChange={handleChange}
                placeholder="description"
                type="text"
              />
            </Box>
          </div>
          <div className="form-padding">
            <div>
              <h4>
                <label htmlFor="image">Upload a cover photo for your event!</label>
              </h4>
              {/* <Button variant="contained" component='label'>Upload Photo */}
              <input
                name="image"
                onChange={handleImageChange}
                id="image"
                type="file"
              />
              {/* </Button> */}
            </div>
            <br />
            <br />
            <Stack spacing={2} direction="row">
              <Button variant="contained" type="submit" disabled={buttonDisabled}>
                Submit
              </Button>
              <Button variant="contained" onClick={() => navigate(`/${tripID}`)}>Cancel</Button>
            </Stack>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateEvent