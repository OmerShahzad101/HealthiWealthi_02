import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import Toast from "../../../common/toast/Toast";
import { Link, useHistory } from "react-router-dom";
import { getHttpRequest, postHttpRequest } from "../../../../axios";
import { setUser, setAccessToken } from "../../../../store/slices/auth";
import validate from "../../../../utils/form-validation/authFormValidation";
import {
  CLIENT_PROFILE_SETTING,
  COACH_PROFILE_SETTING,
} from "../../../../router/constants/ROUTES";
const Login = (props) => {
  const GOOGLE_LOGIN = process.env.REACT_APP_GOOGLE_LOGIN;
  const history = useHistory();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const accociatedCoach = localStorage.getItem("accociatedCoach");

  useEffect(() => {
    const url = window.location.href;
    const aa = url.split("/").pop();
    if (aa.length > 5) {
      const googleAccessToken = url.split("=").pop();
      console.log("googleAccessToken", googleAccessToken);
      if (googleAccessToken) {
        console.log("googleAccessTokendcd", googleAccessToken);

        postHttpRequest("/front/auth/verify", {
          googleAccessToken: googleAccessToken,
        }).then((response) => {
          const userData = {
            response: response.data.user,
            res: response.data.user,
          };
          dispatch(setUser(userData));

          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem(
            "googleRefreshToken",
            response.data.user.googleRefreshToken
          );

          dispatch(setAccessToken(response.data.accessToken));
          if (response?.data?.user?.type === 1) {
            history.replace(CLIENT_PROFILE_SETTING);
          } else if (response?.data?.user?.type === 3) {
            history.replace(COACH_PROFILE_SETTING);
          }
        });
      }
    }
  }, []);

  const loginHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const loginData = {
      email,
      password,
      accociatedCoach,
    };

    const errors = validate(loginData);

    if (Object.keys(errors).length > 0) {
      setValidationErrors({ ...errors });
      return;
    } else {
      setValidationErrors({});
    }
    setIsLoading(true);

    try {
      let response = await postHttpRequest("/front/auth/login", loginData);

      if (!response) {
        Toast.fire({
          icon: "error",
          title: response.data.message,
        });
        return;
      }
      console.log("response", response);
      if (!response.data.success) {
        setIsLoading(false);
        Toast.fire({
          icon: "error",
          title: response.data.message,
        });
        return;
      }

      if (response.data.success) {
        setIsLoading(false);
        let res = await getHttpRequest(
          `/front/coach/get/${response?.data.data?._id}`
        );
        if (res) {
          const userData = {
            response: response.data.data,
            res: res?.data.coach,
          };

          dispatch(setUser(userData));
          localStorage.setItem("accessToken", response.data.data.accessToken);
          localStorage.setItem("user", JSON.stringify(userData));
          dispatch(setAccessToken(userData.response.accessToken));

          if (response?.data?.data?.type === 1) {
            history.replace(CLIENT_PROFILE_SETTING);
          } else if (response?.data?.data?.type === 3) {
            history.replace(COACH_PROFILE_SETTING);
          }
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
          return;
        }
      }
    } catch (e) {
      setIsLoading(false);
      Toast.fire({
        icon: "error",
        title: "Invalid Email or Password",
      });
    }
  };
  const googleLoginHandler = () => {
    window.location.href = "https://healthiwealthi.arhamsoft.org/auth/google";
  };
  return (
    <div className="account-page">
      <div className="content">
        <div className="text-center mb-md-5 mb-3">{/* <Logo /> */}</div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 text-center ">
              <div className="account-content login-right">
                <div className="login-header">
                  <h3>Login</h3>
                </div>
                <form action="#" noValidate onSubmit={loginHandler}>
                  <div className="form-floating mb-4">
                    <input
                      type="email"
                      name="email"
                      ref={emailRef}
                      className="form-control"
                      placeholder="Email"
                    />
                    <label>Email</label>
                    <span className="errors">{validationErrors.email}</span>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      name="password"
                      ref={passwordRef}
                      className="form-control"
                      placeholder="Password"
                    />
                    <label>Password</label>
                    <span className="errors">{validationErrors.password}</span>
                  </div>
                  <div className="text-right">
                    <Link className="forgot-link" to="/forgot-password">
                      Forgot Password ?
                    </Link>
                  </div>
                  <button
                    className="btn btn-primary btn-block btn-lg login-btn"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="dg-mr-8"
                      />
                    )}
                    Login
                  </button>
                  <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                  </div>
                </form>

                <div className="row form-row social-login">
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-primary btn-block btn-lg login-btn"
                      onClick={googleLoginHandler}
                    >
                      {" "}
                      Continue With Google
                    </button>
                  </div>
                </div>

                <div className="text-center dont-have">
                  Don’t have an account? <Link to="/signup">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
