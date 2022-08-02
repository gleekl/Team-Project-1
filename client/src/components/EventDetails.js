const EventDetails = (props) => {
    return(
       <div className="event-details">
        <h3>Event Title: </h3>
        <h4>{props.event.title}</h4>
        <h5>
            <span>City: </span> {props.event.city}
        </h5>
        <h5>
            <span>Country: </span> {props.event.author}
        </h5>
        <h5>
            <span>Description: </span> {props.event.description}
        </h5>
        <h5>
            <span>Cost: </span> ${props.event.cost}
        </h5>
        <img src={props.event.image} />
        
       </div> 
    )
}

export default EventDetails