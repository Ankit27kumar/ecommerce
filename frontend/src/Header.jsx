import React, { useState, useEffect, useContext, createContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
// import { CountproductContext } from './Cart';

// const CountproductContext = createContext();

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(""); // Initialize user state with null
  const [token, setToken] = useState(localStorage.getItem('token')); // Initialize token state with the token from localStorage
  // const { count } = useContext(CountproductContext);
  // console.log(count);

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null);
    setUser(null)
    window.location.href = '/';
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/username", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });
        const data = response.data;
        console.log(data);
        setUser(data); // Set user state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <>

      {/* <marquee className="uppernav">Welcome to Artifex - Shop Now for Special Discounts!</marquee> */}

      <Navbar expand="lg" className="bg-body-tertiary mainnav">
        <Container>
          <Navbar.Brand href="/">ShopSphere</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto navlink">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/shop">Shop</Nav.Link>
              <Nav.Link href="#link">Men</Nav.Link>
              <Nav.Link href="#link">Women</Nav.Link>
              <Nav.Link href="#aboutus">About us</Nav.Link>
              <Nav.Link href="#contactus">Contact us</Nav.Link>
              

              {user ? (
                <>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <PersonIcon />
              </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link className='menuitem' to="/admin-login">{user.username}</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                  <Link className='loginbu' variant="contained" onClick={logout}>Logout</Link>
                  </MenuItem>
                </Menu>
              </>
              ) : (
                <>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <PersonIcon />
              </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link className='menuitem' to="/admin-login">Admin Login</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link className='menuitem' to="/user-login">User Login</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link className='menuitem' to="/profile">Profile</Link>
                  </MenuItem>
                </Menu>
                </>
              )}
               
              <Nav.Link href="/cart"><IconButton aria-label="cart">
                <Badge badgeContent={4} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton></Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
