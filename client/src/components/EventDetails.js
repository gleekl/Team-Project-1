import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const EventDetails = ({ tripID, event, handleEventDelete, authorised }) => {
  const navigate = useNavigate();

  const navigateEditEventPage = () => {
    navigate(`/${tripID}/editevent`)
  }

  return (
    <div className='eventDetails-card'>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={event.image}
          alt={event.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {event.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {event.country}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {event.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${event.cost}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.description}
          </Typography>
        </CardContent>
        {authorised &&
          <CardActions>
            <Button size="small" onClick={navigateEditEventPage}>Edit</Button>
            <Button size="small" onClick={handleEventDelete}>Delete</Button>
          </CardActions>
        }
      </Card>
    </div>
  )
}
       

export default EventDetails;
