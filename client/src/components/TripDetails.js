import { useParams } from "react-router-dom"
import EventDetails from './EventDetails'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const TripDetails = ({ trips }) => {
  const { tripID } = useParams()
  const trip = trips.find((trip) => trip._id === tripID)
  console.log(trip);
  const events = trip.events.map((event) => {
    return <EventDetails event={event} key={event._id} />
  })
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
          <Typography gutterBottom variant="h5" component="div">
            {trip.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
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
            <Button size="small">Delete</Button>
          </CardActions>
          <br />
          <Typography gutterBottom variant="h5" component="div">
            Events {events}
          </Typography>
        </CardContent>
        {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </Card>
    </div>

    // <div className="trip-details">
    //   <h3>Trip Details:</h3>
    //   <h4>{trip.title}</h4>
    //   <h5>
    //     <span>Author:</span> {trip.author}
    //   </h5>
    //   <h5>
    //     <span>Start Date:</span> {trip.startDate}
    //   </h5>
    //   <h5>
    //     <span>End Date:</span> {trip.endDate}
    //   </h5>
    //   <h5>
    //     <span>Total Cost:</span> ${trip.totalCost}
    //   </h5>
    //   <h5>
    //     <span>Events:</span> {events}
    //   </h5>
    // </div>
  )
}

export default TripDetails