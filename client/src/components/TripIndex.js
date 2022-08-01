const TripCard = ({ trip }) => {
  return (
    <>
      <div>
        <h3>{trip.title}</h3>
        <h3>By: {trip.author}</h3>
        <img src={trip.image} />
      </div>
    </>
  )
}

const TripIndex = ({ trips }) => {
  console.log(trips);
  const tripList = trips.map((trip) => {
    return (
      <TripCard key={trip._id} trip={trip} />
    )
  })

  return (
    <>
      <h1>Test TripComponent.</h1>
      {tripList}
    </>
  )
}

export default TripIndex