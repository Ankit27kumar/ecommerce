import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import h1 from '/images/discount.png';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { API_URL } from './API_URL';
// import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';


//  const CountproductContext =React.createContext();



function Cart() {

  const [product, getProduct] = useState([]);
  // const[ price, getPrice] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/getcart`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });
        const data = response.data;
        getProduct(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
 const count = product.length;
  var sum = 0;
  var res = 0;
  for (let i = 0; i < product.length; i++) {
    res = res + product[i].price;
    var daam = product[i].price - Math.round((product[i].offer / 100) * product[i].price);
    sum = sum + daam;
  }
  const totalprice = res;
  const actualprice = sum;
  const discountprice = res - sum;

  function onpress(){
    return(
      alert("your have placed your succesfully")
    )
  }

  return (
    <>
    {/* <CountproductContext.Provider  value={{count}}> */}
      <section id="cart">
        <Box className="carbox" sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid className='productlist' item xs={12} sm={6}>
              <div className='deliverytime'>
                Check delivery time & services
                <span className='enterpin'>ENTER PIN CODE</span>
              </div>

              <Card className='availoffer'>
                <CardContent>
                  <Typography>
                    <p>
                      <img src={h1} width="25px" height="25px" alt="Offer icon" /> &nbsp; &nbsp;<span style={{ fontSize: "15px", fontWeight: 600 }}>Available Offers</span>
                    </p>
                    <p className='offerdetails'>10% Instant Discount on SBI Credit Card and EMI transactions on min. spend of &#8377;3000.</p>
                    <Button className='showmore'>Show More</Button>
                  </Typography>
                </CardContent>
              </Card>
              {product.map((item, index) => (
                <Card className='prcard' key={index}>
                  <CardContent>
                    <Typography>
                      <tr>
                        <td><img src={item.image} width="100%" height="10%" /></td>
                        <td className='prodet'>
                          <h6 style={{ fontSize: "15px", fontWeight: 600 }}>{item.title}</h6>
                          <p className='dis'>{item.description}</p>
                          <div className='prsize'>
                            <label for="size">Size:</label>

                            <select name="size" className="size">
                              <option value="">28</option>
                              <option value="">30</option>
                              <option value="">32</option>
                              <option value="">36</option>
                              <option value="">38</option>
                            </select>
                          </div>
                          <div className='prsize abc'>
                            <label for="quantity">Qty:</label>

                            <select name="quantity" className="size">
                              <option value="">1</option>
                              <option value="">2</option>
                              <option value="">3</option>
                              <option value="">4</option>
                              <option value="">5</option>
                            </select>
                          </div>
                           <br />
                           <p className='prdetail'>
                          <span className='acprice'>&#8377;{item.price}</span>
                          <span className="mainprice">
                            <span>&#8377;{item.price - Math.round((item.offer / 100) * item.price)}</span>
                          </span>
                          <span className="off">save {item.offer}%</span>
                          </p>
                          <p className='return'><FontAwesomeIcon icon={faRotateLeft} style={{color: "#525f75",}} />14 days return available.</p>
                        </td>
                      </tr>
                    </Typography>
                  </CardContent>
                </Card>
              ))}

            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className='detpric'>
                <CardContent>
                  <Typography className='pricecard'>
                    <p>COUPONS</p>
                    <div>

                    </div>
                    <p><a className='showmore' href=" ">Login</a> to get upto &#8377;500 OFF on first order</p>
                    <hr />
                    <p>SUPPORT TRANFORMATIVE SOCIAL WORK IN INDIA</p>
                    <FormControlLabel control={<Checkbox />} label="Donate and make a differnce" /> ,<br />
                    <Button>&#8377;10</Button>
                    <Button>&#8377;20</Button>
                    <Button>&#8377;50</Button>
                    <Button>&#8377;100</Button><br />
                    <a className='showmore' href=" ">Know More</a>
                    <hr />
                    <p>PRICE DETAILS</p>
                    <div className='pricddetail'>
                      <p className='paraise'>Total MRP:<span>&#8377;{totalprice}</span> </p>
                      <p className='paraise'>Discount on MRP:    <span style={{ color: "green" }}>-&#8377;{discountprice} </span> </p>
                      <p className='paraise'>Coupon Discount:  <span><a className='showmore' href=" ">Apply Coupon</a></span> </p>
                      <p className='paraise'>Platform Fee:  <span style={{ color: "green" }}> FREE</span> </p>
                      <p className='paraise'>Shipping Fee: <span style={{ color: "green" }}>FREE</span> </p>
                    </div>
                    <hr />
                    <p className='paraise'>Total Amount: <span>&#8377;{actualprice}</span> </p>
                    <Button className='plcorder' onClick={onpress}>PLACE ORDER</Button>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </section>
      {/* </CountproductContext.Provider> */}
    </>
  );
}


export default Cart;
// export { CountproductContext };