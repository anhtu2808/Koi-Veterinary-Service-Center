import React from 'react'
import { Link } from 'react-router-dom'
import "./Service.css"

function Service() {
  return (
    <>
    <div className="container-fluid header-info text-center">
        <div className="row">
            <div className="col-md-4 align-content-center">
                <img src="../assets/img/logo.png" alt="logo"/>
            </div>
            <div className="col-md-8 row justify-content-end">
                <div className="col-md-3">
                    <i className="fas fa-phone-alt"></i>
                    <div className="text">EMERGENCY</div>
                    <div className="contact-info">(237) 681-812-255</div>
                </div>
                <div className="col-md-3">
                    <i className="fas fa-clock"></i>
                    <div className="text">WORK HOUR</div>
                    <div className="contact-info">09:00 - 20:00 Everyday</div>
                </div>
                <div className="col-md-3">
                    <i className="fas fa-map-marker-alt"></i>
                    <div className="text">LOCATION</div>
                    <div className="contact-info">0123 Some Place</div>
                </div>
            </div>

        </div>
    </div>
  
    <nav className="navbar">
        <div className="container">
            <div className="row col-md-6">
                <div className="col-md-2">
                    <Link className="nav-link" href="#">Home</Link>
                </div>
                <div className="col-md-2">
                    <Link className="nav-link" href="#">About us</Link>
                </div>
                <div className="col-md-2">
                    <Link className="nav-link" href="#">Services</Link>
                </div>
                <div className="col-md-2">
                    <Link className="nav-link" href="#">Doctors</Link>
                </div>
                <div className="col-md-2">
                    <Link className="nav-link" href="#">News</Link>
                </div>
                <div className="col-md-2">
                    <Link className="nav-link" href="#">Contact</Link>
                </div>
            </div>
            <div className="row col-md-6 justify-content-end">
                <div className="col-auto">
                    <button className="btn btn-outline-primary" type="submit">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="col-auto user-icon">
                    <Link href="#" className="nav-link">
                        <i className="fas fa-user"></i> 
                    </Link>
                </div>
            </div>
        </div>
    </nav>



    <div className="container text-center my-5">
        <div className="container mt-5">
            <div className="text-center mb-5">
                <img src="process-image.png" alt="Process Step"/>
                <h3>Choose Service</h3>
            </div>

            <div className="row">
           
                <div className="col-md-4 mb-4">
                    <div className="service-card">
                        <img src="https://th.bing.com/th/id/R.321680a19267fb82b0bb4ef9709f5ee1?rik=S69lZlF8h%2fU4iA&pid=ImgRaw&r=0"
                            alt="Water Quality Testing"/>
                        <div className="p-3">
                            <h5>Water Quality Testing</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor
                                augue. Velit nascetur massa in.</p>
                            <Link href="#" className="btn-order">Order <i className="fas fa-arrow-right"></i></Link>

                        </div>
                    </div>
                </div>
                

        
                <div className="col-md-4 mb-4">
                    <div className="service-card">
                        <img src="https://th.bing.com/th/id/R.321680a19267fb82b0bb4ef9709f5ee1?rik=S69lZlF8h%2fU4iA&pid=ImgRaw&r=0"
                            alt="Water Quality Testing"/>
                        <div className="p-3">
                            <h5>Water Quality Testing</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor
                                augue. Velit nascetur massa in.</p>
                            <Link href="#" className="btn-order">Order <i className="fas fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>

   
                <div className="col-md-4 mb-4">
                    <div className="service-card">
                        <img src="https://th.bing.com/th/id/R.321680a19267fb82b0bb4ef9709f5ee1?rik=S69lZlF8h%2fU4iA&pid=ImgRaw&r=0"
                            alt="Water Quality Testing"/>
                        <div className="p-3">
                            <h5>Water Quality Testing</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor
                                augue. Velit nascetur massa in.</p>
                            <Link href="#" className="btn-order">Order <i className="fas fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
         
            <div className="row">
    
                <div className="col-md-4 mb-4">
                    <div className="service-card">
                        <img src="https://th.bing.com/th/id/R.321680a19267fb82b0bb4ef9709f5ee1?rik=S69lZlF8h%2fU4iA&pid=ImgRaw&r=0"
                            alt="Water Quality Testing"/>
                        <div className="p-3">
                            <h5>Water Quality Testing</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor
                                augue. Velit nascetur massa in.</p>
                            <Link href="#" className="btn-order">Order <i className="fas fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="service-card">
                        <img src="https://th.bing.com/th/id/R.321680a19267fb82b0bb4ef9709f5ee1?rik=S69lZlF8h%2fU4iA&pid=ImgRaw&r=0"
                            alt="Water Quality Testing"/>
                        <div className="p-3">
                            <h5>Water Quality Testing</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor
                                augue. Velit nascetur massa in.</p>
                            <Link href="#" className="btn-order">Order <i className="fas fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>


                <div className="col-md-4 mb-4">
                    <div className="service-card">
                        <img src="https://th.bing.com/th/id/R.321680a19267fb82b0bb4ef9709f5ee1?rik=S69lZlF8h%2fU4iA&pid=ImgRaw&r=0"
                            alt="Water Quality Testing"/>
                        <div className="p-3">
                            <h5>Water Quality Testing</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing Quisque placerat Convallis felis vitae tortor
                                augue. Velit nascetur massa in.</p>
                            <Link href="#" className="btn-order">Order <i className="fas fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container text-center my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <label className="input-label" htmlFor="service-input">Another Service</label>
                        <input type="text" id="service-input" className="custom-input" placeholder="Enter your requirement"/>
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
    </>
  )
}

export default Service