import { NavLink } from "react-router-dom"

const NavigationBar = ({ authorised }) => {
  return (
    <nav>
      <NavLink to="/"><h1>Home</h1></NavLink>
      {authorised && <NavLink to="/">My Trips</NavLink>}
      {authorised
        ?
        <NavLink to="/logout">Log Out</NavLink>
        :
        <NavLink to="/login">Log In</NavLink>
      }
      {!authorised && <NavLink to="/signup">Sign Up</NavLink>}
    </nav>
  )
}

export default NavigationBar