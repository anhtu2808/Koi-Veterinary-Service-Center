import React from 'react'
import { Link } from 'react-router-dom'

const Veterinarian = (image,vetId) => {
  return (
    <>
    {/* <!-- Doctor Card 1 --> */}
    <div className="col-md-4 mb-4">
            <div className="doctor-card">
              <img src={image} alt="Doctor 1" />
              <div className="p-3">
                <h5>Pham Nhat Vuong</h5>
                <p>CVIS & VFDS</p>
                <div className="icon-group">
                  <i className="fas fa-user"></i>
                  <i className="fas fa-phone"></i>
                  <i className="fas fa-envelope"></i>
                </div>
                <Link to={`VeterinarianProfile/${vetId}`}>
                  <button className="btn-view-profile mt-3">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
    </>
  )
}

export default Veterinarian