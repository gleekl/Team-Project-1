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
      <NavLink to="/">
        Log In
      </NavLink>
      <NavLink to="/">
        Sign Up
      </NavLink>
    </nav>
  )
}

export default NavigationBar