import React from "react";
import playStore from "../../../Images/playstore.png";
import appStore from "../../../Images/Appstore.png";
import "./Footer.css";

function Footer() {
  return (
    <footer id="footer">
      {" "}
      <div className="leftFooter">
        <h4>Download Our App</h4>
        <p>Download App for Android and IOS mobile phone</p>
        {/* images will be here */}
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="appstore" />
      </div>
      <div className="midFooter">
        <h1>Gkart Official</h1>
        <p>We Deliver Always On Time</p>
        <p>Copyright 2022 &copy; Prashant Singh Ranawat</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="/">Instagram</a>
        <a href="/">Github</a>
        <a href="/">Linkedin</a>
      </div>
    </footer>
  );
}

export default Footer;
