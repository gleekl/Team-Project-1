import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

const TripCard = ({ trip, handleDelete, authorised }) => {
  const navigate = useNavigate();

  return (
    <div className="trip-card">
      <Card sx={{ maxWidth: 345 }}>
        <Link to={trip._id}>
          <CardMedia
            component="img"
            alt={trip.title}
            height="300"
            image={trip.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {trip.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {trip.author}
            </Typography>
          </CardContent>
        </Link>
        {authorised && (
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                navigate(`/${trip._id}/edit`);
              }}
            >
              Edit
            </Button>
            <Button size="small" onClick={() => handleDelete(trip._id)}>
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

const TripIndex = ({ trips, handleDelete, authorised }) => {
  const navigate = useNavigate();
  const tripList = trips.map((trip) => {
    return (
      <TripCard
        key={trip._id}
        trip={trip}
        handleDelete={handleDelete}
        authorised={authorised}
      />
    );
  });

  const navigateCreatePage = () => {
    navigate("/newtrip");
  };

  return (
    <div className="trip-index">
      <div className="index-heading-button">
        <h1>Here are all your Trips!</h1>
        {authorised && (
          <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={navigateCreatePage}>Create New Trip</Button>
          </Stack>
        )}
      </div>
        {tripList}
    </div>
  );
};

export default TripIndex;

{/* <Button variant="contained">Contained</Button> */}