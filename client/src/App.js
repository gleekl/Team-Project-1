import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import TripDetails from "./components/TripDetails";
import TripIndex from "./components/TripIndex";
import CreateTrip from "./components/CreateTrip";

function App() {
  const [trips, setTrips] = useState(null);
  const navigate = useNavigate();

  const getTrips = async () => {
    const url = "http://localhost:3000/trips";
    const res = await fetch(url);
    const data = await res.json();
    setTrips(data);
  };

  useEffect(() => {
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
    const formData = new FormData();
    for (let field in tripObj) {
      formData.append(field, tripObj[field]);
    }

    const res = await fetch("http://localhost:3000/trips", {
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

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={trips && <TripIndex trips={trips} />} />
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
        {/* <Route
          path="/:tripID/edit"
          element={trips && <EditTrip trips={trips} />}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
