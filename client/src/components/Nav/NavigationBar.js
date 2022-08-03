import { NavLink } from "react-router-dom"

const NavigationBar = () => {
  return (
    <nav>
      <NavLink to="/">
        <h1>Home</h1>
      </NavLink>
      <NavLink to="/">
        My Trips
      </NavLink>
      <NavLink to="/login">
        Log In
      </NavLink>
      {/* TEMP LOGOUT BUTTON FOR TEST */}
      <NavLink to="/logout">
        Log Out
      </NavLink>
      <NavLink to="/signup">
        Sign Up
      </NavLink>
    </nav>
  )
}

export default NavigationBar