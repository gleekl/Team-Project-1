const { useParams } = require("react-router-dom")

const TripDetails = ({ trips }) => {
  const { tripID } = useParams()
  const trip = trips.find((trip) => trip._id === tripID)
  console.log(trip);
  return (
    <div className="trip-details">
      <h3>Trip Details:</h3>
      <h4>{trip.title}</h4>
      <h5>
        <span>Author:</span> {trip.author}
      </h5>
      <h5>
        <span>Start Date:</span> {trip.startDate}
      </h5>
      <h5>
        <span>End Date:</span> {trip.endDate}
      </h5>
      <h5>
        <span>Events:</span> {trip.events}
      </h5>
      <h5>
        <span>Total Cost:</span> ${trip.totalCost}
      </h5>
    </div>
  )
}

export default TripDetails