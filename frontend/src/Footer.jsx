import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedinIn, faInstagram,faFacebookF, faTwitter, faYoutube, faDhl, faFedex, faCcVisa, faCcPaypal, faCcMastercard  } from '@fortawesome/free-brands-svg-icons'


function Footer() {
    return (
        <div className='footer'>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                <p className='mainbrand'>Artifex</p>
                    <p className='fodetail'> Cutting-edge manufacturer of economical and efficient smart home automation systems.</p>
                    <FontAwesomeIcon className='socialhandle'  icon={faFacebookF} size="xl"/>
                    <FontAwesomeIcon className='socialhandle'   icon={faLinkedinIn}  size="xl"/>
                    <FontAwesomeIcon className='socialhandle'   icon={faInstagram}  size="xl"/>
                    <FontAwesomeIcon className='socialhandle'   icon={faTwitter}  size="xl"/>
                    <FontAwesomeIcon className='socialhandle'   icon={faYoutube} size="xl"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <h4 className='fotitle'>QUICK LINKS</h4>
                    <ul>
                   <li> <Link className='folink' href="#home">HOME</Link></li>
                   <li><Link className='folink' href="#home">SHOP</Link></li>
                   <li> <Link className='folink' href="#team">MEN</Link></li>
                   <li> <Link className='folink'  href="#achieve">WOMEN</Link></li>
                   <li> <Link  className='folink' href="#contact">CONTACT</Link></li>
                    </ul>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <h4 className='fotitle'>HELP & INFO HELP</h4>
                <ul>
                   <li> <Link className='folink' href="#home">TRACK YOUR ORDER</Link></li>
                   <li><Link className='folink' href="#home">RATURNS POLICIES</Link></li>
                   <li> <Link className='folink' href="#team">SHIPPING + DELIVERY</Link></li>
                   <li> <Link className='folink'  href="#achieve">CONTACTS US</Link></li>
                   <li> <Link  className='folink' href="#contact">FAQS</Link></li>
                    </ul>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <h4 className='fotitle'>CONTACT US</h4>
                <div>  
                <p className='query'>DO you have any queries of suggestions?</p>
                <p>artifexinfo@gmail.com</p>
                </div>
               <div>
                <p className='query'>If you need support? Just give us</p>
                <p>+55 111 222 333 44</p>
               </div>
                </Grid>
            </Grid>
            <hr />
        <Grid  container spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
                <div> We ship with: 
                <FontAwesomeIcon className='socialhandle' icon={faDhl} size="xl" />
                <FontAwesomeIcon className='socialhandle' icon={faFedex} size="xl"/>
                 </div>
             </Grid>
          <Grid item xs={12} sm={4} md={4}>
           <div>Payment options: 
           <FontAwesomeIcon className='socialhandle' icon={faCcVisa} size="xl" />
           <FontAwesomeIcon className='socialhandle' icon={faCcPaypal}  size="xl" />
           <FontAwesomeIcon className='socialhandle' icon={faCcMastercard} size="xl" />
           </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <div>&copy; Copyright 2024 Artifex</div>
          </Grid>
        </Grid>
        </div>
    )
}
export default Footer;