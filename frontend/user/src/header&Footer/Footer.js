import React from 'react';
import './footer.css'
function EcommerceFooter() {
  return (
    <footer className="ecommerce-footer">
      <div className="footer-section">
        <h3>Customer Service</h3>
        <ul>
          <li><a  className='aa' href="#">Contact Us</a></li>
          <li><a  className='aa' href="#">Returns & Exchanges</a></li>
          <li><a  className='aa' href="#">Shipping & Delivery</a></li>
          <li><a  className='aa' href="#">FAQs</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Information</h3>
        <ul>
          <li><a  className='aa' href="#">About Us</a></li>
          <li><a  className='aa' href="#">Privacy Policy</a></li>
          <li><a  className='aa' href="#">Terms & Conditions</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Shop</h3>
        <ul>
          <li><a className='aa' href="#">Products</a></li>
          <li><a  className='aa' href="#">Categories</a></li>
          <li><a  className='aa' href="#">Brands</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Connect With Us</h3>
        <ul>
          <li><a className='aa' href="#">Facebook</a></li>
          <li><a  className='aa' href="#">Twitter</a></li>
          <li><a  className='aa' href="#">Instagram</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default EcommerceFooter;
