import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import EventDetails from "./EventDetails";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";

const TripDetails = ({
  trips,
  handleDelete,
  handleEventDelete,
  handleCreateEvent,
  handleEditEvent,
  authorised,
}) => {
  const { tripID } = useParams();
  const navigate = useNavigate();

  const trip = trips.find((trip) => trip._id === tripID);

  const eventList = trip.events.map((event) => {
    return (
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={2}>
          <EventDetails
            tripID={trip._id}
            event={event}
            key={event._id}
            handleEventDelete={() => {
              handleEventDelete(trip._id, event._id);
            }}
            handleEditEvent={handleEditEvent}
            authorised={authorised}
          />
        </Grid>
      </Container>
    );
  });

  let strStartDate = trip.startDate
    .substring(0, 10)
    .split("-")
    .reverse()
    .join("-");
  let strEndDate = trip.endDate.substring(0, 10).split("-").reverse().join("-");

  const navigateCreateEventPage = () => {
    navigate(`/${tripID}/newevent`);
  };

  return (
    <div className="trip-details">
      <Card sx={{ maxWidth: 900 }}>
        <CardMedia
          component="img"
          height="200"
          image={trip.image}
          alt={trip.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {trip.title}
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            {trip.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Trip Start Date: {strStartDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Trip End Date: {strEndDate}
          </Typography>
          <br />
          <Typography gutterBottom variant="h7" component="div">
            Total Cost: ${trip.totalCost}
          </Typography>
          <br />
          <Typography gutterBottom variant="h7" component="div">
            What did you get up to?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {trip.description}
          </Typography>
          {authorised && (
            <CardActions>
              <Button
                size="small"
                onClick={() => navigate(`/${trip._id}/edit`)}
              >
                Edit
              </Button>
              <Button size="small" onClick={() => handleDelete(trip._id)}>
                Delete
              </Button>
            </CardActions>
          )}
        </CardContent>

      </Card>
      <br />
      <Grid item key={trip._id} xs={12} sm={4} md={4}>
        <Typography gutterBottom variant="h5" component="div">
          Events
        </Typography>
        {authorised && (
          <Button onClick={navigateCreateEventPage} size="small">
            Add a new event
          </Button>
        )}
        {eventList}
      </Grid>
    </div>
  );
};
export default TripDetails;
