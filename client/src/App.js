import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import NavigationBar from "./components/Nav/NavigationBar";
import TripDetails from "./components/TripDetails";
import TripIndex from "./components/TripIndex";
import CreateTrip from "./components/CreateTrip";
import CreateEvent from "./components/CreateEvent";
import EditTrip from "./components/EditTrip";
import Login from "./components/Users/Login";
import Logout from "./components/Users/Logout";
import Signup from "./components/Users/Signup";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import EditEvent from "./components/EditEvent";

function App() {
  const [trips, setTrips] = useState(null);
  const [events, setEvents] = useState(null);
  const [authorised, setAuthorised] = useState(null);

  const navigate = useNavigate();

  const getTrips = async () => {
    const url = "/trips";
    const res = await fetch(url);
    const data = await res.json();
    setTrips(data);
  };

  const getEvents = async () => {
    const url = "/events";
    const res = await fetch(url);
    const data = await res.json();
    setEvents(data);
  };

  const handleAuthentication = (authed) => {
    setAuthorised(authed);
    navigate("/");
  };

  const handleLogout = () => {
    setAuthorised(false);
    navigate("/");
  };

  const handleDelete = async (tripID) => {
    await fetch(`/trips/${tripID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTrips(trips.filter((trip) => trip._id !== tripID));
    navigate("/");
  };

  const handleEventDelete = async (tripID, eventID) => {
    await fetch(`/events/${eventID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let updatedTrip = { ...trips.find((trip) => trip._id === tripID) };
    updatedTrip.events = updatedTrip.events.filter(
      (event) => event._id !== eventID
    );

    const index = trips.findIndex((trip) => trip._id === tripID);
    setTrips([...trips.slice(0, index), updatedTrip, ...trips.slice(index)]);
  };

  const handleCreate = async (tripObj) => {
    console.log("tripObj in handleCreate", tripObj);
    const formData = new FormData();
    for (let field in tripObj) {
      formData.append(field, tripObj[field]);
    }
    const res = await fetch("/trips", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const newTrip = await res.json();
      setTrips([...trips, newTrip]);
      navigate("/");
    } else {
      console.log("error creating new trip");
    }
  };

  const handleCreateEvent = async (eventObj, tripID) => {
    const formData = new FormData();
    for (let field in eventObj) {
      formData.append(field, eventObj[field]);
    }
    const res = await fetch(`/events/${tripID}`, {
      method: "POST",
      body: formData,
    });
    console.log("This is the formData of", formData);
    if (res.ok) {
      const newTrip = await res.json();
      const index = trips.findIndex((trip) => trip._id === tripID);
      setTrips([...trips.slice(0, index), newTrip, ...trips.slice(index + 1)]);
      // Need to redirect to the parent Trip
      navigate("/");
    } else {
      console.log("Error creating new Event.");
    }
  };

  const handleEdit = async (tripObj, tripID) => {
    const formData = new FormData();
    for (let field in tripObj) {
      formData.append(field, tripObj[field]);
    }
    const res = await fetch(`/trips/${tripID}`, {
      method: "PUT",
      body: formData,
    });
    if (res.ok) {
      getTrips();
      let updatedTrip = { ...trips.find((trip) => trip._id === tripID) };
      const index = trips.findIndex((trip) => trip._id === tripID);
      setTrips([...trips.slice(0, index), updatedTrip, ...trips.slice(index + 1)]);
      navigate(`/${tripID}`);
    } else {
      console.log("error editing trip ", tripID);
    }
  };

  const handleEditEvent = async (eventObj, eventID) => {
    console.log("EventID selected,", eventID);
    console.log("this is the field for updating", eventObj);
    const formData = new FormData();
    for (let field in eventObj) {
      formData.append(field, eventObj[field]);
    }
    const res = await fetch(`/events/${eventID}`, {
      method: "PUT",
      body: formData,
    });
    if (res.ok) {
      let updatedTrip = await res.json();
      const index = trips.findIndex((trip) => trip._id === updatedTrip._id);
      setTrips([...trips.slice(0, index), updatedTrip, ...trips.slice(index + 1)]);
      navigate(`/${updatedTrip._id}`);
    } else {
      console.log("Error editing event ", eventID);
    }
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const res = await fetch("/users/isauthorised");
      const data = await res.json();
      console.log(data.msg);
      setAuthorised(data.authorised);
    };
    checkIfLoggedIn();
    getTrips();
    getEvents();
  }, []);

  return (
    <div className="App">
      <NavigationBar authorised={authorised} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              trips && (
                <TripIndex
                  trips={trips}
                  handleDelete={handleDelete}
                  handleAuthentication={handleAuthentication}
                  authorised={authorised}
                />
              )
            }
          />
          <Route
            path="/:tripID"
            element={
              trips && (
                <TripDetails
                  trips={trips}
                  handleDelete={handleDelete}
                  handleEventDelete={handleEventDelete}
                  handleCreateEvent={handleCreateEvent}
                  handleEditEvent={handleEditEvent}
                  authorised={authorised}
                />
              )
            }
          />
          <Route
            path="/newtrip"
            element={trips && <CreateTrip handleCreate={handleCreate} />}
          />
          <Route
            path="/:tripID/newevent"
            element={
              events && <CreateEvent handleCreateEvent={handleCreateEvent} />
            }
          />
          <Route
            path="/:tripID/edit"
            element={
              trips && <EditTrip trips={trips} handleEdit={handleEdit} />
            }
          />
          <Route
            path="/:tripID/:eventID/editevent"
            element={
              events && <EditEvent events={events} handleEditEvent={handleEditEvent} />
            }
          />
          <Route
            path="/login"
            element={<Login handleLogin={handleAuthentication} />}
          />
          <Route
            path="/logout"
            element={<Logout handleLogout={handleLogout} />}
          />
          <Route
            path="/signup"
            element={<Signup handleSignup={handleAuthentication} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
