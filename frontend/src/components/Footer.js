import React from "react";
// import "./Footer.css"; // Import the CSS file for styling
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquarePinterest } from "react-icons/fa6";



const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section ">
      <div className="flex items-center space-x-2 text-white">
      <RiCustomerService2Fill  className="mb-3 text-xl cursor-pointer" />
      <h4>Customer Support</h4>
    </div>
      
        
        <p>We are happy to help you with your purchase</p>
        <p>Call 1800-833-4488</p>
      </div>

      <div className="footer-section">
        <h4>About Us</h4>
        <ul>
          <li>The Collective</li>
          <li>Careers</li>
          <li>Feedback</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Shopping Online</h4>
        <ul>
          <li>FAQs</li>
          <li>Offers Terms & Conditions</li>
          <li>Shipping Policy</li>
          <li>Return / Exchange Policy</li>
          <li>Site Map</li>
          <li>Terms of Use</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Customer Services</h4>
        <ul>
          <li>Made To Measure</li>
          <li>Privacy Policy</li>
          <li>Gift Cards</li>
          <li>Personal Shopping</li>
          <li>Loyalty Terms & Conditions</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Our Stores & Events</h4>
        <ul>
          <li>Store Locator</li>
          <li>Brand Directory</li>
        </ul>
      </div>

      <div className="footer-social">
        <a href="https://www.instagram.com/" aria-label="Instagram">
        <FaInstagramSquare className="text-xl"/>
        </a>
        <a href="https://www.facebook.com/" aria-label="Facebook">
        <FaFacebookSquare className="text-xl"/>
        </a>
        <a href="https://x.com/?lang=en" aria-label="X">
        <FaSquareXTwitter className="text-xl"/>
        </a>
        <a href="https://www.youtube.com/" aria-label="YouTube">
        <IoLogoYoutube className="text-xl"/>
        </a>
        <a href="https://in.pinterest.com/" aria-label="Pinterest">
        <FaSquarePinterest className="text-xl"/>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
