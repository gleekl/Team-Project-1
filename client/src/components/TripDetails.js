import { useParams } from "react-router-dom";
import EventDetails from "./EventDetails";

const TripDetails = ({ trips, handleDelete }) => {
  const { tripID } = useParams();
  const trip = trips.find((trip) => trip._id === tripID);
  const Events = trip.events.map((event) => {
    return <EventDetails event={event} key={event._id} />;
  });
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
        <span>Events:</span> {Events}
      </h5>
      <h5>
        <span>Total Cost:</span> ${trip.totalCost}
      </h5>
      <button>Edit</button>
      <button onClick={() => handleDelete(trip._id)}>Delete</button>
    </div>
  );
};

export default TripDetails;
