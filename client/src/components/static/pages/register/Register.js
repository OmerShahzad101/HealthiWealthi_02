import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import $ from "jquery";
import auth from "../../services/auth.service";
// import { ENV } from "../../env";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  // Initial Values
  const InitialValues = {
    name: "",
    email: "",
    password: "",
    role: "",
  };
  //state
  const [user, setUser] = useState(InitialValues);
  let history = useHistory();

  // JQuery for Input Field
  $(".floating").on("focus blur", function (e) {
    $(this)
      .parents(".form-focus")
      .toggleClass("focused", e.type === "focus" || this.value.length > 0);
  });
  // Handel Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  //API call
  const RegisterCall = async () => {
    const { name, email, password } = user;
    if (name && email && password) {
      // const res = await auth.register(
      //   `http://localhost:8080/api/auth/signup`,
      //   user
      // );
      if (res.success == true) {
        history.push("/login");
        alert(res.message);
      }
    }
    navigate("/login");
  };

  return (
    <div className="account-page">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7 col-lg-6 login-left">
                    <img
                      src="assets/img/login-banner.png"
                      className="img-fluid"
                      alt="Register"
                    />
                  </div>

                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header">
                      <h3>Register </h3>
                    </div>

                    <form action="#">
                      <div className="form-group form-focus">
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={handleChange}
                          className="form-control floating"
                        />
                        <label className="focus-label">Name</label>
                      </div>
                      <div className="form-group form-focus">
                        <input
                          type="text"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          className="form-control floating"
                        />
                        <label className="focus-label">
                          Email / Mobile Number
                        </label>
                      </div>
                      <div className="form-group form-focus">
                        <input
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                          className="form-control floating"
                        />
                        <label className="focus-label">Create Password</label>
                      </div>

                      <div className="col ps-1" md="6">
                        <label>Register as a </label>
                        <div className="form-group">
                          <label>Coach</label>
                          <input
                            type="radio"
                            name="role"
                            value="coach"
                            checked={user.role == "coach" ? true : false}
                            onChange={handleChange}
                          />
                          <label>Client</label>
                          <input
                            type="radio"
                            name="role"
                            value="client"
                            checked={user.role == "client" ? true : false}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="text-right">
                        <Link className="forgot-link" to="/login">
                          Already have an account?
                        </Link>
                      </div>
                      <button
                        className="btn btn-primary btn-block btn-lg login-btn"
                        type="button"
                        onClick={RegisterCall}
                      >
                        Signup
                      </button>
                      <div className="login-or">
                        <span className="or-line"></span>
                        <span className="span-or">or</span>
                      </div>
                      <div className="row form-row social-login">
                        {/* <div className="col-6">
                          <a href="#" className="btn btn-facebook btn-block">
                            <i className="fab fa-facebook-f mr-1"></i> Login
                          </a>
                        </div> */}
                        <div className="col-12">
                          <a href="#" className="btn btn-google btn-block">
                            <i className="fab fa-google mr-1"></i> Login
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
