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

function Home() {
  const [index, setIndex] = useState(0);
  const [product, setProduct] = useState([]);
  const [otherproduct, getOtherproduct] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

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
        const items = data.slice(0, 4);
        const x = Math.round( Math.random())
        const item2 = data.slice(x, x+4);
        console.log(item2);
        getOtherproduct(item2);
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
      <section id="aboutus">
        <center>
          <p className='aboutusheading'>ABOUT US</p>
          <p className='welcome'>Welcome to <a className='artifexlink' href="">Urban Rural Trade</a>, your destination for authentic rural handicrafts, organic products, and handloom items.</p>
          <div className='ourmission'>
            <p className='heading'>Our Mission</p>
            <Grid className='fetdetail' container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="body1">
                      <p className='fettitle'>Empower Rural Artisans</p>
                      <p className='fedetail'>We uplift artisans by providing them with a platform to showcase their crafts and earn fair wages, preserving traditional skills and fostering economic growth.</p>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="body1">
                      <p className='fettitle'> Connect Communities</p>
                      <p className='fedetail'>We bridge the gap between urban and rural communities by offering authentic handmade products, promoting cultural exchange, and celebrating diversity.</p>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="body1">
                      <p className='fettitle'> Promote Sustainability</p>
                      <p className='fedetail'>We advocate for sustainable practices in production and consumption, supporting eco-friendly materials and minimizing environmental impact.</p>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="body1">
                      <p className='fettitle'> Create Social Impact</p>
                      <p className='fedetail'> We aim to make a positive social impact by promoting fair trade, empowering marginalized communities, and contributing to community development.</p>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          </div>
          <div className='solution'>
            <p className='heading'>Our Solutions</p>
            <Grid className='fetdetail' container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="body1">
                      <p className='fettitle'> Direct Buying</p>
                      <p className='fedetail'>Shop directly from artisans, ensuring fair prices and supporting local economies while enjoying unique and high-quality handmade products.</p>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="body1">
                      <p className='fettitle'> Artisan Partnerships</p>
                      <p className='fedetail'> Partner with us to showcase your products and reach a wider audience, benefiting from our marketing and distribution channels.</p>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="body1">
                      <p className='fettitle'>Educational Content</p>
                      <p className='fedetail'> Explore our educational resources to learn about traditional crafts, artisan stories, and the cultural significance behind each product.</p>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="body1">
                      <p className='fettitle'> Community Engagement</p>
                      <p className='fedetail'>Join our community to stay informed about sustainable practices, artisan updates, and opportunities to support meaningful causes.</p>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          </div>
        </center>
      </section>
      <section className='prodct'>
      <center>
      <p className='aboutusheading'>Our latest product</p>
      <Grid className='teamcon' container spacing={2}>
        {otherproduct.map((item, index) => (
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
