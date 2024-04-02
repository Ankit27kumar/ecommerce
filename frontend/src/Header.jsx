import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
   <marquee className="uppernav">Welcome to ARTIFEX - Shop Now for Special Discounts!</marquee>
      <Navbar expand="lg" className="bg-body-tertiary mainnav">
        <Container>
          <Navbar.Brand href="/">Artifex</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto navlink">
              <Nav.Link href="#home">Home</Nav.Link>
              <NavDropdown title="Shop" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Sarees</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Fabrics</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Accessories</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Home decor</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Apparels</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">All Products</NavDropdown.Item>
                {/* Other dropdown items */}
              </NavDropdown>
              <Nav.Link href="#link">Men</Nav.Link>
              <Nav.Link href="#link">Women</Nav.Link>
              <Nav.Link href="#aboutus">About us</Nav.Link>
              <Nav.Link href="#contactus">Contact us</Nav.Link>
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
              <IconButton aria-label="cart">
                <Badge badgeContent={4} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
