import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'

import "./App.css";
import TripComponent from './components/TripComponent';

function App() {
  const [trips, setTrips] = useState(null)

  const getTrips = async () => {
    const url = 'http://localhost:4000/trips'
    const res = await fetch(url)
    const data = await res.json()
    setTrips(data)
  }

  useEffect(() => {
    getTrips()
  }, [])

  console.log(trips);

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={<TripComponent trips={trips} />} 
        />
      </Routes>
    </div>
  ); 
}

export default App;
