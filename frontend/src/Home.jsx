import React, { useState, useEffect } from 'react';
import axios from 'axios';
import h1 from '/images/homeimg.png';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRankingStar, faTag, faShield, faLocationDot, faPhoneVolume, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import { API_URL } from './API_URL';

function Home() {
  const [index, setIndex] = useState(0);
  const [product, setProduct] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

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
        console.log(data);
        const items = data.slice(0, 8);
        setProduct(items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  // const slides = [
  //   { image1: saree1, image2: saree2, label: 'Hand painted pot', text: 'Buy authentic hand painted product', bgColor: '#FAF3E9' },
  //   { image1: suit1, image2: suit2, label: 'Mud Pot', text: 'Buy hand made mud pot', bgColor: '#FAF3E9' }
  // ];

  return (
    <>
      {/* <Header /> */}
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
      <section id="features">
        <Grid className='fetdetail' container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  <p className='fettitle'> <FontAwesomeIcon icon={faCartShopping} style={{ color: "#8a9a5b", }} /> Free Delivery</p>
                  <p className='fedetail'>Enjoy hassle-free shopping with complimentary doorstep delivery on all orders.</p>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  <p className='fettitle'> <FontAwesomeIcon icon={faRankingStar} style={{ color: "#8a9a5b", }} /> Quality Guarantee</p>
                  <p className='fedetail'>Shop confidently knowing that our products come with a quality assurance guarantee.</p>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  <p className='fettitle'> <FontAwesomeIcon icon={faTag} style={{ color: "#8a9a44", }} /> Daily Offer</p>
                  <p className='fedetail'>Discover exciting daily deals and discounts on handloom treasures every day.</p>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  <p className='fettitle'> <FontAwesomeIcon icon={faShield} style={{ color: "#8a9a44", }} /> 100% Secure Payments</p>
                  <p className='fedetail'>Shop with peace of mind with our secure payment options and encrypted transactions.</p>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </section>
      <section id="shopcon">
        <center className="cntr">
          <p className="limoffer">LIMITED OFFERS 20% OFF</p>
          <h4 className="summerpromo">Summer Promo</h4>
          <p className="offerdetails">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure, delectus dignissimos facilis neque nulla earum.</p>
          <button className="shopnow">Shop Now</button>
          

        </center>

      </section>
      <section className='prodct'>
      <center>
      <p className='aboutusheading'>Our latest product</p>
      <Grid className='teamcon' container spacing={2}>
        {product.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
          <Card key={item._id} className="carddetail">
            <CardContent>
              <Typography>
                <p >
                 <img  className="teamimg" src={item.image} alt={item.title} />
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
        </center>
      </section>
      <div>
      
      <section id="shopof">
        <center className="cntr">
          <p className="limoffer">LIMITED OFFERS 20% OFF</p>
          <h4 className="summerpromo">Summer Promo</h4>
          <p className="offerdetails">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure, delectus dignissimos facilis neque nulla earum.</p>
          <button className="shopnow" href="/men">Shop Now</button>
        </center>

      </section>
      
    </div>
      <section id="contactus">
  <center>
    <p className='aboutusheading'>Contact us</p>
    <p  className='welcome'>Feel free to reach out to us for any inquiries or assistance.</p>
  </center>
  <div className='condetail'>
    <Grid container spacing={2}>
      {/* First column */}
      <Grid item xs={12} sm={6}>
        <p className='detail'>
          <FontAwesomeIcon icon={faLocationDot} size="2xl" style={{ color: "#8a9a5b" }} />
          <span> Plot No 32, 34, Knowledge Park III, Greater Noida, Ruhallapur, Uttar Pradesh 201310</span>
        </p>
        <p className='detail'>
          <FontAwesomeIcon icon={faPhoneVolume} size="2xl" style={{ color: "#8a9a5b" }} />
          <span> +91 9875678947</span>
        </p>
        <p className='detail'>
          <FontAwesomeIcon icon={faEnvelope} size="2xl" style={{ color: "#8a9a5b" }} />
          <span> example@atrifex.co.in</span>
        </p>
      </Grid>
      {/* Second column */}
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography>
              <p className='contactdec'>Send us Message</p>
              <form>
                <p className='fomes'>Name*</p>
                <TextField fullWidth placeholder='Nilesh Singh' type="text" variant="outlined" />
                <p className='fomes'>Email Address*</p>
                <TextField fullWidth placeholder='example@gmail.com' type="email" variant="outlined" />
                <p className='fomes'>Phone number*</p>
                <TextField fullWidth placeholder='+919999999999' type="tel" variant="outlined" />
                <p className='fomes'>Message*</p>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder='Type your message here'
                  variant="outlined"
                /><br />
                <Button className='sendmessage' variant="contained" type="submit">Send Message</Button>
              </form>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </div>
</section>

    </>
  );
}

export default Home;
