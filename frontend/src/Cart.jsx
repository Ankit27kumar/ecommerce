import * as React from 'react';
import axios from 'axios';
import { useState ,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { API_URL } from './API_URL';



 function Cart() {

    const[product, getProduct] = useState([]);


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


  return (
    <>   
    <TableContainer className='productcart' component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Offer</TableCell>
            <TableCell align="right">Price</TableCell>            
            {/* <TableCell align="right">Quantity</TableCell> */}
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((item, index) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="right">{item.offer}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}


export default Cart;