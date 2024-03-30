import * as React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



function Header() {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 13,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
      }));

      
  return(
    <>
         <Navbar expand="lg" className="bg-body-tertiary mainnav">
      <Container>
        <Navbar.Brand href="signin">Artifex</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navlink">
            <Nav.Link href="#home">Home</Nav.Link>
            
            <NavDropdown title="Shop" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Clothing</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Footwear</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Accessories</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Home Decor</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Gift & Souvenirs</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Collections</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Arts & 
              Crafts</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Footwear</NavDropdown.Item>
             
            </NavDropdown>
            <Nav.Link href="#link">Men</Nav.Link>
            <Nav.Link href="#link">Women</Nav.Link>
            <Nav.Link href="#link">About us</Nav.Link>
            <Nav.Link href="#link">Contact us</Nav.Link>

            <Nav.Link className='userbutton' href="/signin"><PersonIcon /></Nav.Link>
            
            <IconButton  aria-label="cart">
      <StyledBadge badgeContent={4} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
     
    </Navbar>
    </>
  )
}

export default Header;
