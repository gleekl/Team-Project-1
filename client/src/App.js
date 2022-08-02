import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'

import "./App.css";
import NavigationBar from './components/Nav/NavigationBar';
import TripDetails from './components/TripDetails';
import TripIndex from './components/TripIndex';
import Login from './components/Users/Login';
import Logout from './components/Users/Logout';
import Signup from './components/Users/Signup';

function App() {
  const [trips, setTrips] = useState(null)

  const getTrips = async () => {
    const url = 'http://localhost:3000/trips'
    const res = await fetch(url)
    const data = await res.json()
    setTrips(data)
  }

  useEffect(() => {
    getTrips()
  }, [])
  
  return (
    <div className="App">
      <NavigationBar />
      <main>
        <Routes>
          <Route
            path="/"
            element={trips && <TripIndex trips={trips} />}
          />
          <Route
            path="/:tripID"
            element={trips && <TripDetails trips={trips} />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/logout"
            element={<Logout />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
        </Routes>
      </main>

    </div>
  );
}

export default App;
