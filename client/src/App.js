import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'

import "./App.css";
import NavigationBar from './components/Nav/NavigationBar';
import TripDetails from './components/TripDetails';
import TripIndex from './components/TripIndex';
import Login from './components/Users/Login';
import Logout from './components/Users/Logout';
import Signup from './components/Users/Signup';

function App() {
  const [trips, setTrips] = useState(null)
  const [authorised, setAuthorised] = useState(null)

  const navigate = useNavigate()

  const getTrips = async () => {
    const url = 'http://localhost:3000/trips'
    const res = await fetch(url)
    const data = await res.json()
    setTrips(data)
  }

  const handleAuthentication = (authed) => {
    setAuthorised(authed)
    navigate('/')
  }

  const handleLogout = () => {
    setAuthorised(false)
    navigate('/')
  }

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const res = await fetch('/users/isauthorised')
      const data = await res.json()
      console.log(data.msg);
      setAuthorised(data.authorised)
    }
    checkIfLoggedIn()
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
