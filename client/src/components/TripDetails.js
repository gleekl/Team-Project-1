const { useParams } = require("react-router-dom")

const TripDetails = ({ trips }) => {
  const { tripID } = useParams()
  const trip = trips.find((trip) => trip._id === tripID)
  
  return (
    <div>
      <h3>Trip Details:</h3>
      <h4>{trip.name}</h4>
    </div>
  )
}

export default TripDetails