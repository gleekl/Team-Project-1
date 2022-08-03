import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

const TripCard = ({ trip, handleDelete }) => {
  return (
    <div className="trip-card">
      <Card sx={{ maxWidth: 345 }}>
        <Link to={trip._id}>
          <CardMedia
            component="img"
            alt={trip.title}
            height="140"
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
        <CardActions>
          <Button size="small">
            <Link to={`/${trip._id}/edit`}>Edit</Link>
          </Button>
          <Button size="small" onClick={() => handleDelete(trip._id)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

const TripIndex = ({ trips, handleDelete }) => {
  const navigate = useNavigate();
  const tripList = trips.map((trip) => {
    return <TripCard key={trip._id} trip={trip} handleDelete={handleDelete} />;
  });

  const navigateCreatePage = () => {
    navigate("/newtrip");
  };

  return (
    <>
      <h1>Test TripComponent.</h1>
      <button onClick={navigateCreatePage}>Create New Trip</button>
      {tripList}
    </>
  );
};

export default TripIndex;
