import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const TripCard = ({ trip, handleDelete, authorised }) => {
  const navigate = useNavigate();

  return (
    <Grid item key={trip._id} xs={12} sm={4} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to={trip._id}>
          <CardMedia
            component="img"
            sx={{
              16: 9,
              // pt: "56.25%",
            }}
            image={trip.image}
            alt={trip.title}
          />
        </Link>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {trip.title}
          </Typography>
          <Typography>{trip.author}</Typography>
        </CardContent>
        {authorised && (
          <CardActions>
            <Button size="small" onClick={() => navigate(`/${trip._id}/edit`)}>
              Edit
            </Button>
            <Button size="small" onClick={() => handleDelete(trip._id)}>
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};

const TripIndex = ({ trips, handleDelete, authorised }) => {
  const navigate = useNavigate();

  const navigateCreatePage = () => {
    navigate("/newtrip");
  };

  return (
    <main className="trip-index">
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Travel Log
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            The travel diary you can access at anytime, all on the web. Log your trips and special events
            wherever you are.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            {authorised ? (
              <Button variant="contained" onClick={navigateCreatePage}>
                Create New Trip
              </Button>
            ) : (
              <>
                <Button variant="contained" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
                <Button variant="outlined" onClick={() => navigate("/login")}>
                  Log In
                </Button>
              </>
            )}
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={2}>
          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              handleDelete={handleDelete}
              authorised={authorised}
            />
          ))}
        </Grid>
      </Container>
    </main>
  );
};

export default TripIndex;
