import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import h1 from '/images/homeimg.png';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { API_URL } from './API_URL';
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
        const response = await axios.get(`${API_URL}/getproduct`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });
        const data = response.data;
        // console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

 

 

  

  return (
    <>
    <section id="home">
      <div className='home1'>
                    <Grid container spacing={2}>
                        {/* First column */}
                        <Grid className='homedetail' item xs={12} sm={6} >
                            <p className='hometitle'>Your Gateway to Global Trends</p>
                            <p className='homedescription'>ShopSphere is an innovative ecommerce platform offering a curated selection of trending products from around the world, bringing the latest in fashion, tech, home decor, and more right to your doorstep.</p>
                            <Button className='learnmore' variant="dark" href="#pricing">Shop Now</Button>
                        </Grid>
                        {/* Second column */}
                        <Grid item xs={12} sm={6}  >
                            <img src={h1} className='homeimage' height="500px" width="500px" />
                        </Grid>
                    </Grid>
                </div>
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
                 <a href={`/product/${item._id}`} target="_blank"> <img  className="teamimg" src={item.image} alt={item.title} /></a>
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
        <center>
        <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
      />

        </center>
      
      
    </Stack>
    </center>
      </div>
      </section>
    </>
  )
}

export default Shop;
