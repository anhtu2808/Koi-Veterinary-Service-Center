import React, { useState } from 'react'
import './Login.css'
import google_logo from '../../assets/img/google.png'
import logo from '../../assets/img/logo.png'
import logim_side from '../../assets/img/login_side.png'
import { toast } from 'react-toastify'
import { fetchLoginAPI } from '../../apis'

const Login = () => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault(); // chặn hành động mặc định của form như refresh lại trang
  console.log(username, password);
  const response = await fetchLoginAPI(username, password);
  console.log(response)
  if(response?.status === 201) {
    toast.success("Login successfully")
  }
}

  return (

         
        <div className="row">
            <div className="col-md-6 left-side-container text-start">
                <img src= {logim_side} alt="login" className="img-fluid " />
            </div>
            <div className="col-md-6 justify-content-center align-items-center login-left text-center mx-auto">
                <div className="col-md-8 login-container mx-auto mt-10">

                    <img src={logo} alt="logo"/>
                    <h6 className=" text-start mt-5">WELCOME BACK</h6>
                    <h3 className="fw-bold">Continue to your Account.</h3>
                    <div className="d-grid gap-2  mx-auto">

                        <button className=" login-google-btn rounded-pill btn btn-primary py-3" type="button">
                            <img src={google_logo} alt="google" className="img-fluid google-logo" />
                            Log In with Google
                        </button>
                    </div>
                </div>
                <div className="col-md-12 my-2 row justify-content-center align-items-center ">
                    <div className="col-md-3">
                        <hr />
                    </div>
                    <div className="col-md-3 d-flex justify-content-center align-items-center">
                        <p className="text-center devider-text my-0">Or use username</p>
                    </div>
                    <div className="col-md-3">
                        <hr />
                    </div>

                </div>
                <form action="#!" className="mx-5" onSubmit={handleLogin}>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" name="username" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                          <label for="username" className="form-label">Username</label>
                          <label htmlFor="username" className="form-label">Username</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                          <label for="password" className="form-label">Password</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex gap-2 justify-content-between">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" name="rememberMe" id="rememberMe" />
                            <label className="form-check-label text-secondary" for="rememberMe">
                              Keep me logged in
                            </label>
                          </div>
                          <a href="#!" className="link-primary text-decoration-none">Forgot password?</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button className="btn-dark btn btn-lg" type="submit">LOGIN</button>
                        </div>
                      </div>
                      <div className="col-12">
                        <p className="m-0 text-secondary text-center">Don't have an account? <a href="#!" className="link-dark text-decoration-underline    ">Sign up</a></p>
                      </div>
                    </div>
                  </form>
            </div>
        </div>
        
        
    )
}

export default Login