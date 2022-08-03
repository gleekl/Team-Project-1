import { useState } from "react";

import { useParams } from "react-router-dom";
import EventDetails from "./EventDetails";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const TripDetails = ({ trips, handleDelete }) => {
  const { tripID } = useParams();
  const trip = trips.find((trip) => trip._id === tripID);
  const [events, setEvents] = useState(trip.events);
  const handleEventDelete = async (eventID) => {
    console.log("Delete this event", eventID);
    await fetch(`/events/${eventID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setEvents(events.filter((evt) => evt._id !== eventID));
  };
  const eventList = events.map((event) => {
    return (
      <EventDetails
        event={event}
        key={event._id}
        handleEventDelete={handleEventDelete}
      />
    );
  });
  return (
    <div className="trip-details">
      <Card sx={{ maxWidth: 480 }}>
        <CardMedia
          component="img"
          height="140"
          image={trip.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {trip.title}
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            {trip.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Trip Start Date: {trip.startDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Trip End Date: {trip.endDate}
          </Typography>
          <br />
          <Typography gutterBottom variant="h7" component="div">
            Total Cost: ${trip.totalCost}
          </Typography>
          <br />
          <Typography gutterBottom variant="h7" component="div">
            What did you get upto?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {trip.description}
          </Typography>
          <CardActions>
            <Button size="small">Edit</Button>
            <Button size="small" onClick={() => handleDelete(trip._id)}>
              Delete
            </Button>
          </CardActions>
          <br />
          <Typography gutterBottom variant="h5" component="div">
            Events {eventList}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TripDetails;
