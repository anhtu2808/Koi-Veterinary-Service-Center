import React from "react";
import veterinarian from "../../assets/img/veterinarian.png";
import "./VeterinarianPage.css";
import { Link } from "react-router-dom";

function Veterinarian() {
  return (
    <div className="container text-center my-5">
      <div className="container mt-5">
        <div className="text-center mb-5">
          <img src="process-image.png" alt="Process Step" />
          <h3>Choose Doctor</h3>
        </div>

        <div className="row">
          {/* <!-- Doctor Card 1 --> */}
          <div className="col-md-4 mb-4">
            <div className="doctor-card">
              <img src={veterinarian} alt="Doctor 1" />
              <div className="p-3">
                <h5>Pham Nhat Vuong</h5>
                <p>CVIS & VFDS</p>
                <div className="icon-group">
                  <i className="fas fa-user"></i>
                  <i className="fas fa-phone"></i>
                  <i className="fas fa-envelope"></i>
                </div>
                <Link hrefLang="#">
                  <button className="btn-view-profile mt-3">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Doctor Card 2 --> */}
          <div className="col-md-4 ">
            <div className="doctor-card">
              <img src={veterinarian} alt="Doctor 2" />
              <div className="p-3">
                <h5>Truong Gia Binh</h5>
                <p>Aquatic Telehealth Consult</p>
                <div className="icon-group">
                  <i className="fas fa-user"></i>
                  <i className="fas fa-phone"></i>
                  <i className="fas fa-envelope"></i>
                </div>
                <Link hrefLang="#">
                  <button className="btn-view-profile mt-3">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Doctor Card 3 --> */}
          <div className="col-md-4 mb-4">
            <div className="doctor-card">
              <img src={veterinarian} alt="Doctor 3" />
              <div className="p-3">
                <h5>Nguyen The Hoang</h5>
                <p>Fish Surgery</p>
                <div className="icon-group">
                  <i className="fas fa-user"></i>
                  <i className="fas fa-phone"></i>
                  <i className="fas fa-envelope"></i>
                </div>
                <Link hrefLang="#">
                  <button className="btn-view-profile mt-3">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ********************************************************* --> */}
        <div className="row">
          {/* <!-- Doctor Card 4 --> */}
          <div className="col-md-4 mb-4">
            <div className="doctor-card">
              <img src={veterinarian} alt="Doctor 4" />
              <div className="p-3">
                <h5>Bill William Clinton</h5>
                <p>Fish Surgery</p>
                <div className="icon-group">
                  <i className="fas fa-use"></i>
                  <i className="fas fa-phone"></i>
                  <i className="fas fa-envelope"></i>
                </div>
                <Link hrefLang="#">
                  <button className="btn-view-profile mt-3">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Doctor Card 5 --> */}
          <div className="col-md-4 mb-4">
            <div className="doctor-card">
              <img src={veterinarian} alt="Doctor 5" />
              <div className="p-3">
                <h5>Spider Woman</h5>
                <p>Water Quality Testing</p>
                <div className="icon-group">
                  <i className="fas fa-user"></i>
                  <i className="fas fa-phone"></i>
                  <i className="fas fa-envelope"></i>
                </div>
                <Link hrefLang="#">
                  <button className="btn-view-profile mt-3">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Doctor Card 6 --> */}
          <div className="col-md-4 mb-4">
            <div className="doctor-card">
              <img src={veterinarian} alt="Doctor 6" />
              <div className="p-3">
                <h5>Do Mixi</h5>
                <p>Fish Physical Exams</p>
                <div className="icon-group">
                  <i className="fas fa-user"></i>
                  <i className="fas fa-phone"></i>
                  <i className="fas fa-envelope"></i>
                </div>
                <Link hrefLang="#">
                  <button className="btn-view-profile mt-3">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn-nav">
            <i className="fas fa-arrow-left"></i> Previous Step
          </button>
          <button className="btn-nav">
            Next Step <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Veterinarian;
