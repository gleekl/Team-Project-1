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
    return <EventDetails event={event} key={event._id}/>
  })
  return (
    <div className="trip-details">
      <h3>Trip Details:</h3>
      <h4>{trip.title}</h4>
      <h5>
        <span>Author:</span> {trip.author}
      </h5>
      <h5>
        <span>Start Date:</span> {trip.startDate}
      </h5>
      <h5>
        <span>End Date:</span> {trip.endDate}
      </h5>
      <h5>
        <span>Events:</span> {events}
      </h5>
      <h5>
        <span>Total Cost:</span> ${trip.totalCost}
      </h5>
    </div>
  )
}

export default TripDetails