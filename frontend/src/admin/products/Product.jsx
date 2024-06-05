import Card from '@mui/material/Card';
import { useEffect } from "react";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import { API_URL } from '../../API_URL';

function Product() {
    const [title, getTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, getPrice] = useState("");
    const [offer, setOffer] = useState("");
    const [image, getImage] = useState("");
    const[product, getProduct] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${API_URL}/admin/product`, {
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
              }
            });
            const data = response.data.Items;
            console.log(data);
            getProduct(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
      }, []);


    const addProduct = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post("http://localhost:4000/admin/addproduct", {
            title: title,
            description: description,
            price:price,
            offer:offer,
            image:image
          }, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          });
          const newProduct = response.data;
        //   cons
          getProduct(prevproduct => [...prevproduct, newProduct]);
          getTitle(""); // Clear input fields after adding note
          setDescription("");
          getPrice("");
          setOffer("");
          getImage("");
          forceUpdate();
          alert("product added succesfully")
        } catch (error) {
          console.error('Error adding note:', error);
        }
      }

      const deleteproduct = async (productId) => {
        console.log(productId)
        try {
          const response = await axios.delete(`http://localhost:4000/admin/delete/${productId}`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          });
          // Update state to remove the deleted note
          getProduct(prevproduct => prevproduct.filter(product => product._id !== productId));
    
        } catch (error) {
          console.error('Error deleting note:', error);
        }
      };

    return (
        <>
            <section id="product">
                <Grid container spacing={2}>
                    {/* First column */}
                    <Grid item xs={12} sm={6}>
                        <Card className="scroll-box">
                            <CardContent>
                                <Typography>
                                    <p>Your product:-</p>
                                    <div className='productlist'>
                                    {product.map((item, index) => (
            <Card key={item._id} className="carddetial">
              <CardContent>
               {/* <p>{date}</p> */}
                <Typography>               
                  <p className="img">
                  <img src={item.image} />
                  {/* {item.image} */}
                  </p>

                  <p className="dic">{item.title}</p>
                  <p className="dic">{item.description}</p>
                  <p className="dic"><span>{item.price - Math.round((item.offer / 100) * item.price)}</span> {item.price}</p><span></span>

                  <p className="dic">({item.offer}% off)</p>
                  <Button onClick={() => deleteproduct(item._id)}>Delete</Button>
                  {/* </div> */}
                  <br />
                </Typography>
              </CardContent>
            </Card>
          
        ))}
        </div>
                                  
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Second column */}
                    <Grid item xs={12} sm={6}>
                        <Card>
                            <CardContent>
                                <Typography>
                                    <p className='contactdec'>Add your product here</p>
                                    <form>
                                        <p className='fomes'>Title</p>
                                        <TextField fullWidth placeholder='authenticate saree' type="text" variant="outlined" onChange={(e) => {
                                            getTitle(e.target.value)
                                        }} />
                                        <p className='fomes'>Description</p>
                                        <TextField fullWidth placeholder='this hand made saree' type="text" variant="outlined" onChange={(e) => {
                                            setDescription(e.target.value)
                                        }} />
                                        <p className='fomes'>Price</p>
                                        <TextField fullWidth placeholder='1200' type="number" variant="outlined" onChange={(e) => {
                                            getPrice(e.target.value)
                                        }} />
                                        <p className='fomes'>Offer(%)</p>
                                        <TextField fullWidth placeholder='20' type="number" variant="outlined" onChange={(e) => {
                                            setOffer(e.target.value)
                                        }} />
                                        <p className='fomes'>Category</p>
                                        <Form.Select className='dropmenu' aria-label="Default select example">
                                            <option>Sarees</option>
                                            <option value="1">Fabrics</option>
                                            <option value="2">Accessories</option>
                                            <option value="3">Home decor</option>
                                            <option value="3">Apparels</option>
                                            <option value="3">Others</option>
                                        </Form.Select>
                                        <p className='fomes'>Image link</p>
                                        <TextField fullWidth placeholder='image link' type="text" variant="outlined" onChange={(e) => {
                                            getImage(e.target.value)
                                        }} />
                                        <Button className='sendmessage' variant="contained" type="submit" onClick={addProduct}>Add Product</Button>
                                    </form>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </section>
        </>
    )
}

export default Product;
