import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



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
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
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
              id="author"
            />
          </Box>
        </div>

        <div>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
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
              id="title"
            />
          </Box>
        </div>

        <div>
          {/* <label htmlFor="startDate">Trip Start Date</label> */}
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField InputLabelProps={{ shrink: true }}
              id="outlined-basic"
              label="Trip Start Date"
              variant="outlined"
              name="startDate"
              value={fields.startDate}
              onChange={handleChange}
              placeholder="startDate"
              type="date"
              id="startDate"
            />
          </Box>
        </div>
        <div>
          {/* <label htmlFor="endDate">Trip End Date</label> */}
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField InputLabelProps={{ shrink: true }}
              id="outlined-basic"
              label="Trip End Date"
              variant="outlined"
              name="endDate"
              value={fields.endDate}
              onChange={handleChange}
              placeholder="endDate"
              type="date"
              id="endDate"
            />
          </Box>
        </div>
        <div>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Total Cost"
              variant="outlined"
              name="TotalCost"
              value={fields.totalCost}
              onChange={handleChange}
              placeholder="author"
              type="number"
              id="totalCost"
            />
          </Box>
        </div>
        <div>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Trip Description"
              variant="outlined"
              name="description"
              value={fields.description}
              onChange={handleChange}
              placeholder="description"
              type="text"
              id="description"
            />
          </Box>
        </div>
        <div>
          <label htmlFor="image">Upload a cover photo for your trip!</label>
          <br />
          <br />
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
          <Button variant="contained" type="submit">Submit</Button>
          <Button variant="contained">Cancel</Button>
        </Stack>
      </form>
    </>
  );
};

export default CreateTrip;


