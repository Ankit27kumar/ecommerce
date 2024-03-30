import './App.css';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import Link from '@mui/material/Link';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons'
// import Writenode from './Writenode';
// import { useHistory } from 'react-router-dom';




function Signin() {
  const [username, getUsername] = useState("");
  const [password, getPassword] = useState("");
  const [user, userExit] = useState(null);
  const [mess, getMess] = useState(null);
  // const history = useHistory(); 

  function onPress() {
    fetch("http://localhost:4000/user/signin", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(resp => resp.json())
      .then(data => {
        console.log(data);
        getMess(data.message);
        localStorage.setItem("token", data.token);
        userExit(data.token);
      });
  }

  if (user) {
    return (
      <div>

        {window.open("/")}
      </div>

    )
  }
  return (
    <center className='sg'>
      <Card className='signupcard'>
        <h4>Welcome to Skai</h4>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control className='formdet' type="email" placeholder="Email/Username" onChange={(e) => {
              getUsername(e.target.value)
            }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control className='formdet' type="password" placeholder="Password" onChange={(e) => {
              getPassword(e.target.value)
            }} />
          </Form.Group>
          <Button className='signupbutton' variant="primary" type="submit" onClick={onPress}>
            Sign In
          </Button>


          <p className="connect">Connect With</p>
          <Button className='facebook' variant="dark" href=""><FontAwesomeIcon icon={faFacebookF} /></Button>
          <Button className='twitter' variant="dark" href=""> <FontAwesomeIcon icon={faTwitter} /></Button>
          <Button className='envelope' variant="dark" href=""><FontAwesomeIcon icon={faEnvelope} /></Button>
          <p><Link className='fgpas' href="">Forgot Password?</Link></p>
          <p className='notmember'> Not a member yet?  </p><Link className='signinq' href="/signup">Sign Up</Link>

        </Form>
      </Card>
    </center>

  )
}

export default Signin;
