import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { isDisabled } from "@testing-library/user-event/dist/utils";

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
    const isDisabled = Object.values(updatedFields).some((v) => !v);
    setButtonDisabled(isDisabled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleCreate({ ...fields, image: image });
    setFields(initialState);
    setImage(null);
  };

  return (
    <>
      <h1 className="create-trip-heading">Create a new trip!</h1>
      <form onSubmit={handleSubmit} className="create-trip-form">
        <div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic author"
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
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic title"
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
          {/* <label htmlFor="startDate">Trip Start Date</label> */}
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              InputLabelProps={{ shrink: true }}
              id="outlined-basic startDate"
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
          {/* <label htmlFor="endDate">Trip End Date</label> */}
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              InputLabelProps={{ shrink: true }}
              id="outlined-basic endDate"
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
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic totalCost"
              label="totalCost"
              variant="outlined"
              name="totalCost"
              value={fields.totalCost}
              onChange={handleChange}
              placeholder="total cost"
              type="number"
            />
          </Box>
        </div>
        <div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic description"
              label="Trip Description"
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
        <div>
          <h4>
            <label htmlFor="image">Upload a cover photo for your trip!</label>
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
          <Button variant="contained">
            <Link to={`/`}>Cancel</Link>
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default CreateTrip;
