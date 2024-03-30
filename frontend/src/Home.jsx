import { useState } from 'react';
// import { map } from "./chunk-CKXVUD7P.js";
import Carousel from 'react-bootstrap/Carousel';
import saree1 from '/images/slider/saree1.png';
import saree2 from '/images/slider/saree2.png';
import frock1 from '/images/slider/frock1.png';
import frock2 from '/images/slider/frock2.png';
import suit1 from '/images/slider/suit1.png';
import suit2 from '/images/slider/suit2.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRankingStar, faTag, faShield } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';

function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const slides = [
    { image1: saree1, image2: saree2, label: 'Silken Splendor', text: 'Luxurious handloom sarees, woven with tradition and grace', bgColor: '#FAF3E9' },
    { image1: frock1, image2: frock2, label: 'Charming Chic', text: 'Cute and comfy handloom frocks for your little fashionistas.', bgColor: '#FAF3E9' },
    { image1: suit1, image2: suit2, label: 'Sophisticated Threads', text: 'Timeless handloom suits that blend tradition with modern flair.', bgColor: '#FAF3E9' },
  ];

  return (
    <>
    <Header />
      <section id="home">
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
              </div>
              <div className="image-container">
                <img src={slide.image2} alt={`Slide ${idx + 1}`} />
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
      <section id="features">
        <Grid className='fetdetail' container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  <p className='fettitle'> <FontAwesomeIcon icon={faCartShopping} style={{color: "#8a9a5b",}} /> Free Delivery</p>
                  <p className='fedetail'>Enjoy hassle-free shopping with complimentary doorstep delivery on all orders.</p>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  <p className='fettitle'> <FontAwesomeIcon icon={faRankingStar} style={{color: "#8a9a5b",}} /> Quality Guarantee</p>
                  <p className='fedetail'>Shop confidently knowing that our products come with a quality assurance guarantee.</p>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  <p className='fettitle'> <FontAwesomeIcon icon={faTag} style={{color: "#8a9a44",}} /> Daily Offer</p>
                  <p className='fedetail'>Discover exciting daily deals and discounts on handloom treasures every day.</p>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  <p className='fettitle'> <FontAwesomeIcon icon={faShield} style={{color: "#8a9a44",}} /> 100% Secure Payments</p>
                  <p className='fedetail'>Shop with peace of mind with our secure payment options and encrypted transactions.</p>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </section>
    </>
  );
}

export default Home;
