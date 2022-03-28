import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import auth from "../../services/auth.service";
// import { ENV } from "../../env";
import $ from "jquery";

const ForgotPassword = () => {
  const InitialValues = { email: "" };
  const [forgotpass, setForgotpass] = useState(InitialValues);
  let history = useHistory();

  // JQuery for Input
  $(".floating").on("focus blur", function (e) {
    $(this)
      .parents(".form-focus")
      .toggleClass("focused", e.type === "focus" || this.value.length > 0);
  });

  //Handle Changes to Get Values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForgotpass({
      ...forgotpass,
      [name]: value,
    });
  };

  //API call
  const ForgotPasswordCall = async () => {
    // const res = await auth.forgot(`${ENV.API_URL}api/auth/forgot-password` , forgotpass);
    // if (res.success == true) {
      // toast.success(res.message);
      // history("/login");
    // } else {
      // toast.error(res.message);
    // }
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
                    <ToastContainer
                      position="top-center"
                      autoClose={600}
                      hideProgressBar
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      theme="colored"
                    />
                    <img
                      src="assets/img/login-banner.png"
                      className="img-fluid"
                      alt="Login Banner"
                    />
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header">
                      <h3>Forgot Password?</h3>
                      <p className="small text-muted">
                        Enter your email to get a password reset link
                      </p>
                    </div>

                    <form action="#">
                      <div className="form-group form-focus">
                        <input
                          type="email"
                          name="email"
                          value={forgotpass.email}
                          onChange={handleChange}
                          className="form-control floating"
                        />
                        <label className="focus-label">Email</label>
                      </div>
                      <div className="text-right">
                        <Link className="forgot-link" to="/login">
                          Remember your password?
                        </Link>
                      </div>
                      <button
                        className="btn btn-primary btn-block btn-lg login-btn"
                        type="button"
                        onClick={ForgotPasswordCall}
                      >
                        Reset Password
                      </button>
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

export default ForgotPassword;