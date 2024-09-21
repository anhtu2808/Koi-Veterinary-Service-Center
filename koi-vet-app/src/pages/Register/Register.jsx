import React from "react";
import register from "../../assets/img/login_side.png";

function Register() {
  return (
    <div className="">
      <div className="row">
        <div className="col-md-6">
          <img src={register} alt="login" className="img-fluid" />
        </div>
        <div className="col-md-6 justify-content-center align-items-center login-left text-center mx-auto">
          <div className="col-md-8 login-container  my-15">
            <div className="d-grid gap-2 mb-4">
              <h2>Registration</h2>
            </div>
          </div>
          <form action="#!" className="mx-5">
            <div className="row gy-2 overflow-hidden">
              <div className="col-12">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="abc@email.com"
                    required
                  />
                  <label for="email" className="form-label">
                    Email
                  </label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="fullname"
                    placeholder="Full name"
                    required
                  />
                  <label for="username" className="form-label">
                    Full name
                  </label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    placeholder="Username"
                    required
                  />
                  <label for="username" className="form-label">
                    Username
                  </label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    value=""
                    placeholder="Password"
                    required
                  />
                  <label for="password" className="form-label">
                    Password
                  </label>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex gap-2 justify-content-between">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      name="rememberMe"
                      id="rememberMe"
                    />
                    <label
                      className="form-check-label text-secondary"
                      for="rememberMe"
                    >
                      Keep me logged in
                    </label>
                  </div>
                  <a href="#!" className="link-primary text-decoration-none">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="col-12">
                <div className="d-grid my-3">
                  <button className="btn-dark btn btn-lg" type="submit">
                    SIGN UP
                  </button>
                </div>
              </div>
              <div className="col-12">
                <p className="m-0 text-secondary text-center">
                  Don't have an account?{" "}
                  <a
                    href="#!"
                    className="link-dark text-decoration-underline    "
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
