import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const TripCard = ({ trip }) => {
  return (
    <div className='trip-card'>
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
          <Button size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    </div>
  )
}

const TripIndex = ({ trips }) => {
  console.log(trips);
  const tripList = trips.map((trip) => {
    return (
      <TripCard key={trip._id} trip={trip} />
    )
  })

  return (
    <>
      <h1>Test TripComponent.</h1>
      {tripList}
    </>
  )
}

export default TripIndex