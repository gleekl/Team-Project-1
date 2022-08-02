const { useState } = require("react");
const { Link } = require("react-router-dom");

const Login = (props) => {
  const [fields, setFields] = useState({ username: "", password: "" })

  const handleChange = (evt) => {
    setFields({
      ...fields,
      [evt.target.name]: evt.target.value
    })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const res = await fetch('/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    })
    const data = await res.json()
    console.log(data.msg)
    props.handleLogin(data.authorised)
  }

  return (
    <form>
      <h1>Log In</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input 
          value={fields.username}
          onChange={handleChange}
          name="username"
          type="text"
          id="username"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input 
          value={fields.password}
          onChange={handleChange}
          name="password"
          type="password"
          id="password"
        />
      </div>
      <input type="submit" value="Login" />
      <p>No account yet? <Link to="/register">Register here</Link></p>
    </form>
  )
}

export default Login