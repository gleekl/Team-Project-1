import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const EventDetails = (props) => {
  return (
    <div className='eventDetails-card'>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={props.event.image}
          alt={props.event.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {props.event.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {props.event.country}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {props.event.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${props.event.cost}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.event.description}
          </Typography>
        </CardContent>
        {props.authorised &&
          <CardActions>
            <Button size="small">Edit</Button>
            <Button size="small" onClick={props.handleEventDelete}>Delete</Button>
          </CardActions>
        }
      </Card>
    </div>
  )
}

export default EventDetails