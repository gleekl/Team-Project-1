import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import NavigationBar from "./components/Nav/NavigationBar";
import TripDetails from "./components/TripDetails";
import TripIndex from "./components/TripIndex";
import CreateTrip from "./components/CreateTrip";
import Login from "./components/Users/Login";
import Logout from "./components/Users/Logout";
import Signup from "./components/Users/Signup";

function App() {
  const [trips, setTrips] = useState(null);
  const [authorised, setAuthorised] = useState(null);

  const navigate = useNavigate();

  const getTrips = async () => {
    const url = "http://localhost:3000/trips";
    const res = await fetch(url);
    const data = await res.json();
    setTrips(data);
  };

  const handleAuthentication = (authed) => {
    setAuthorised(authed);
    navigate("/");
  };

  const handleLogout = () => {
    setAuthorised(false);
    navigate("/");
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
  }, []);

  const handleDelete = async (tripID) => {
    await fetch(`http://localhost:3000/trips/${tripID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTrips(trips.filter((trip) => trip._id !== tripID));
    navigate("/");
  };

  const handleCreate = async (tripObj) => {
    console.log(tripObj);
    const formData = new FormData();
    for (let field in tripObj) {
      formData.append(field, tripObj[field]);
    }
    const res = await fetch("http://localhost:3000/trips", {
      method: "POST",
      body: formData,
    });
    console.log("this is formdata", formData);
    if (res.ok) {
      const newTrip = await res.json();
      setTrips([...trips, newTrip]);
      navigate("/");
    } else {
      console.log("error creating new trip");
    }
  };

  return (
    <div className="App">
      <NavigationBar />
      <main>
        <Routes>
          <Route path="/" element={trips && <TripIndex trips={trips} handleDelete={handleDelete}/>} />
          <Route
            path="/:tripID"
            element={
              trips && <TripDetails trips={trips} handleDelete={handleDelete} />
            }
          />
          <Route
            path="/newtrip"
            element={trips && <CreateTrip handleCreate={handleCreate} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
