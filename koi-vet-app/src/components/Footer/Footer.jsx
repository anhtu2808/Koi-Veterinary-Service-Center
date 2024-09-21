import React from "react";
import logo from "../../assets/img/logo.png";
import "../../pages/Home/Home.css"
function Footer() {
  return (
    <>
      <footer className="footer text-center">
        <div className="container" >
        <div className="row">
          <div className="col-md-3 text-start">
          <img src={logo} alt="logo" />
          <p>Leading the Way in Medical Excellence, Trusted Care.</p>
          </div>
          <div className="col-md-3 text-start">
            <h4>Contact Us</h4>
            <p>
              Call: 0987654321 <br/>Email: grouptoo@gmail.com 
              Address: Thu Duc City
            </p>
          </div>
          <div className="col-md-3 text-start">
            <h4>Mail</h4>
            <div className="input-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                aria-label="Email"
              />
              <button className="btn btn-submit" type="button">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>

          <div className="col-md-3 text-start text-center">
            <h4>Follow Us</h4>
            <p>Stay connected with us on social media.</p>
            <p>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </p>
          </div>
        </div>
        </div>
        <hr />
        <p className="mt-4 align-content-center">
          © 2021 Hospital's Name All Rights Reserved by PNTEC-LTD
        </p>
        
      </footer>
    </>
  );
}

export default Footer;
