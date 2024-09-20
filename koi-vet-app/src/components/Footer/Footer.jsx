import React from "react";

function Footer() {
  return (
    <>
      <footer class="footer text-center">
        <div class="container" />
        <div class="row">
          <div class="col-md-3 text-start">
            <h4>KOIMED</h4>
            <p>Leading the Way in Medical Excellence, Trusted Care.</p>
          </div>
          <div class="col-md-3 text-start">
            <h4>Contact Us</h4>
            <p>
              Call: 0987654321 <br>Email: grouptoo@gmail.com </br>
              Address: Thu Duc City
            </p>
          </div>
          <div class="col-md-3 text-start">
            <h4>Mail</h4>
            <div class="input-group mb-2">
              <input
                type="email"
                class="form-control"
                placeholder="Enter your email"
                aria-label="Email"
              />
              <button class="btn btn-submit" type="button">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>

          <div class="col-md-3 text-start text-center">
            <h4>Follow Us</h4>
            <p>Stay connected with us on social media.</p>
            <p>
              <i class="fab fa-facebook"></i>
              <i class="fab fa-twitter"></i>
              <i class="fab fa-instagram"></i>
            </p>
          </div>
        </div>
        <hr />
        <p class="mt-4 align-content-center">
          © 2021 Hospital's Name All Rights Reserved by PNTEC-LTD
        </p>
      </footer>
    </>
  );
}

export default Footer;
