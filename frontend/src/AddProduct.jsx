import { useState } from 'react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import h1 from '/images/discount.png';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from '@mui/material/Alert';
import { API_URL } from './API_URL';

function AddProduct() {

  const { itemId } = useParams();

  const [product, getProduct] = useState([]);
  const[recommend, redommendProduct] = useState([]);
  const [items, getItems] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/getproduct/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });
        const data = response.data;
        console.log(data);
        const it = data.slice(0,4);
        redommendProduct(it);
        getProduct(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(`${API_URL}/getproduct/${itemId}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });
        const data = response.data;
        console.log("this is one product detail")
        console.log(data);
        getItems(data);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData1();
  }, []);
 
  
  const onPress = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/addcart/${itemId}`,
        {}, // Assuming no body is required, else include the required body data here
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        }
      );
      const data = response.data;
      console.log("ran till here");
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
 
  
 

  
  // console.log("this is items product");
  // console.log(items);


  if(!items){
    return(
      <center>
        <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
      </center>
    )
  }

  return (
    <>
    <section id="addproduct">
    <Grid container spacing={2}>
  {items.map((item, index) => (
    <React.Fragment key={index}>
      <Grid item xs={12} sm={6} md={6}>
        <div>
          <p><img className='itemimage' src={item.image} alt={item.title} /></p>
          <Button className='addcartbutton' variant="contained" onClick={onPress}>Add to Cart</Button>
        </div>
      </Grid>

      <Grid className='aboutitem' item xs={12} sm={6} md={6}>
        <div className='productdetail'>
          <p className='itemtitle'>{item.title}</p>
          <p className="itemdic">{item.description}</p>
          <span className='acprice1'>&#8377;{item.price}</span>
          <span className="mainprice1">
            <span>&#8377;{item.price - Math.round((item.offer / 100) * item.price)}</span>
          </span>
          <br />
          <span className="off1">save {item.offer}%</span>
          <br />
        </div>
        <hr />
        <p>Inclusive of all taxes</p>
        <p>EMI starts at &#8377;{Math.round(item.price / 100)}. No Cost EMI available <a className='emioption' href=" ">EMI options</a> </p>
        <hr />
        <p>
          <img src={h1} width="25px" height="25px" alt="Offer icon" /> &nbsp; &nbsp;<span style={{ fontSize: "15px", fontWeight: 500 }}>Offers</span>
        </p>
        <div>
          <Card className='offerbox'>
            <CardContent>
              <Typography>
                <h6 className='offerhead'>Bank Offer</h6>
                <p className='offerdet'>Additional Flat &#8377;400 Instant Discount on HDFC Bank Credit.</p>
              </Typography>
            </CardContent>
          </Card>
          <Card className='offerbox'>
            <CardContent>
              <Typography>
                <h6 className='offerhead'>No Cost EMI</h6>
                <p className='offerdet'>Upto &#8377;{Math.round(item.price / 100)} EMI interest savings on select Credit Cards.</p>
              </Typography>
            </CardContent>
          </Card>
          <Card className='offerbox'>
            <CardContent>
              <Typography>
                <h6 className='offerhead'>Partner Offers</h6>
                <p className='offerdet'>Get GST invoice and save up to 28% on business purchase</p>
              </Typography>
            </CardContent>
          </Card>
        </div>
        <hr />
      </Grid>
    </React.Fragment>
  ))}
</Grid>

   
    <p className='recopid'>You may like this product also:-</p>
    <center>
      
      <Grid className='teamcon' container spacing={2}>
        {recommend.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
          <Card key={item._id} className="carddetail">
            <CardContent>
              <Typography>
                <p >
                 <img  className="teamimg" src={item.image} alt={item.title} />
                </p>
                <p className="dic">{item.title}</p>
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
        </center>
        </section>
    </>)
}

export default AddProduct;