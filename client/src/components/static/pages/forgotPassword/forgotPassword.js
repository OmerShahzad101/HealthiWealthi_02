import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import auth from "../../services/auth.service";
// import { ENV } from "../../env";
import $ from "jquery";
import Logo from "../../common/logo/Logo";
const ForgotPassword = () => {
  const InitialValues = { email: "" };
  const [forgotpass, setForgotpass] = useState(InitialValues);
  let history = useHistory();

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
        <div className="text-center mb-md-5 mb-3">
          <Logo />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 text-center">
              <div className="account-content login-right">
                <div className="login-header">
                  <h3>Forgot Password?</h3>
                  <p className="small text-muted">
                    Enter your email to get a password reset link
                  </p>
                </div>

                <form action="#">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      name="email"
                      value={forgotpass.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <label>Email</label>
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
  );
};

export default ForgotPassword;
