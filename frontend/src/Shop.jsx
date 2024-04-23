import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Carousel from 'react-bootstrap/Carousel';
import saree1 from '/images/slider/art1.png';
import saree2 from '/images/slider/art2.png';
import frock1 from '/images/slider/painting1.png';
import frock2 from '/images/slider/painting2.png';
import suit1 from '/images/slider/pot1.png';
import suit2 from '/images/slider/pot2.png';
import Dropdown from 'react-bootstrap/Dropdown';

function Shop() {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);

  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getproduct", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });
        const data = response.data;
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

 

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const slides = [
    { image1: saree1, image2: saree2, label: 'Hand painted pot', text: 'Buy authentic hand painted product', bgColor: '#FAF3E9' },
   { image1: suit1, image2: suit2, label: 'Mud Pot', text: 'Buy hand made mud pot', bgColor: '#FAF3E9' }
  ];

  return (
    <>
    <section id="shopnow">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {slides.map((slide, idx) => (
            <Carousel.Item key={idx} style={{ backgroundColor: slide.bgColor }}>
              <div className="slide-content">
                <div className="image-container">
                  <img src={slide.image1} alt={`Slide ${idx + 1}`} />
                </div>
                <div className="text-container">
                  <h3>{slide.label}</h3>
                  <p>{slide.text}</p>
                  <Button variant="primary" className="shop-button">Shop Now</Button> {/* Add a button below the text */}
                </div>
                <div className="image-container">
                  <img src={slide.image2} alt={`Slide ${idx + 1}`} />
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
    <section id="shopsection">
    
      <div className='drop'>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
       Sort By:Featured
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* <Dropdown.Item href="#/action-1">Featured</Dropdown.Item> */}
        <Dropdown.Item href="#/action-2">Price: Low to High</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Price: High to Low</Dropdown.Item>
        <Dropdown.Item href="#/action-1">Avg. Customer Review</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Newest Arrivals</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </div>
      <div className='productlist'>
      <center>
      <Stack spacing={2}>
     
      <Grid className='teamcon' container spacing={2}>
        {displayedProducts.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
          <Card key={item._id} className="carddetail">
            <CardContent>
              <Typography>
                <p >
                 <a href="/{item._id}"> <img  className="teamimg" src={item.image} alt={item.title} /></a>
                </p>
                <p className="dic">{item.title}</p>
                <p className="dic">{item.description}</p>
                <span className='acprice'>&#8377;{item.price}</span>
                <span className="mainprice">
                  <span>&#8377;{item.price - Math.round((item.offer / 100) * item.price)}</span> 
                </span>
                <span className="off">save {item.offer}%</span>
                <br />
              
                <br />
              </Typography>
            </CardContent>
          </Card>
          </Grid>
        ))}
        </Grid>
        
        <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
      />
      
    </Stack>
    </center>
      </div>
      </section>
    </>
  )
}

export default Shop;
