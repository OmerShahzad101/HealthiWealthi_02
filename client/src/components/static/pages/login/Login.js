import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import auth from "../../services/auth.service";
// import { ENV } from "../../env";
import $ from "jquery";
import Logo from "../../common/logo/Logo";

const Login = () => {
  // Initial Values
  const InitialValues = {
    email: "",
    password: "",
  };
  const [loginUser, setLoginUser] = useState(InitialValues);
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
    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };

  //API call
  const LoginCall = async () => {
    const { email, password } = loginUser;
    if (email && password) {
      console.log(loginUser);
      // const res = await auth.login(
      //   `http://localhost:8080/api/auth/login`,
      //   loginUser
      // );
      // if (res.success == true) {
      //   localStorage.setItem(
      //     "accessToken",
      //     JSON.stringify(res.user.accessToken)
      //   );
      //   history.push("/");
      //   alert(res.message);
      // }
    }
    history.push("/");
  };

  return (
    <div className="account-page">
      <div className="content">
        <div className="text-center mb-md-5 mb-3">
          <Logo />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 text-center ">
              <div className="account-content login-right">
                <div className="login-header">
                  <ToastContainer
                    position="top-center"
                    autoClose={300}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    theme="colored"
                  />
                  <h3>Login</h3>
                </div>
                <form action="#">
                  <div className="form-group form-focus">
                    <input
                      type="email"
                      name="email"
                      value={loginUser.email}
                      onChange={handleChange}
                      className="form-control floating"
                    />
                    <label className="focus-label">Email</label>
                  </div>
                  <div className="form-group form-focus">
                    <input
                      type="password"
                      name="password"
                      value={loginUser.password}
                      onChange={handleChange}
                      className="form-control floating"
                    />
                    <label className="focus-label">Password</label>
                  </div>
                  <div className="text-right">
                    <Link className="forgot-link" to="/forgot-password">
                      Forgot Password ?
                    </Link>
                  </div>
                  <button
                    className="btn btn-primary btn-block btn-lg login-btn"
                    type="button"
                    onClick={LoginCall}
                  >
                    Login
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
                  <div className="text-center dont-have">
                    Don’t have an account? <Link to="/signup">Register</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
