import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Alert, Button, FloatingLabel, Form, Spinner } from "react-bootstrap";

import Google from "../../common/Google";
import Toast from "../../../common/toast/Toast";

import validate from "../../../../utils/form-validation/authFormValidation";
import {
  cancelOngoingHttpRequest,
  getHttpRequest,
  postHttpRequest,
} from "../../../../axios";
import {
  setUserRole,
  setUserPermissions,
  setAccessToken,
} from "../../../../store/slices/auth";
import {
  setInfoData,
  setSubscriptionPlan,
  setCompany,
  setDepartment,
} from "../../../../store/slices/user";
import {
  FORGOT_PASSWORD,
  SIGNUP,
  DASHBOARD,
} from "../../../../router/constants/ROUTES";

import Logo from "../../../../assets/img/Logo.svg";
import LoginBanner from "../../../../assets/img/login-banner.png";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [validationErrors, setValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const access_path = params.get("access_path"); // access_path

    if (access_path) {
      setIsLoading(true);
      getHttpRequest(`/auth/googleLogin/${access_path}`)
        .then((response) => {
          if (!response) {
            console.log("Something went wrong with response...");
            return;
          }

          if (response.data.success === true) {
            const userRole = {
              role: response.data.permission.value,
              roleId: response.data.permission.key,
            };

            // Save auth data in Redux store
            dispatch(setUserRole(userRole));
            dispatch(setUserPermissions(response.data.permission.permissions));
            dispatch(setAccessToken(response.data.accessToken));

            // Update user data as well in the Redux store
            dispatch(setInfoData(response.data.user));

            history.replace(DASHBOARD);
          } else {
            Toast.fire({
              icon: "error",
              title: response.data.message,
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    // Cancel company creation HTTP call in case component is unmounted due to route change
    return cancelOngoingHttpRequest;
  }, [dispatch, history, location.search]);

  function loginHandler(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const loginData = {
      email,
      password,
    };

    const errors = validate(loginData);

    if (Object.keys(errors).length > 0) {
      setValidationErrors({ ...errors });
      return;
    } else {
      setValidationErrors({});
    }

    setIsLoading(true);
    postHttpRequest("/auth/login", loginData)
      .then((response) => {
        setIsLoading(false);

        if (!response) {
          console.log("Something went wrong with response...");
          return;
        }

        if (response.data.success === true) {
          const userRole = {
            role: response.data.permission.value,
            roleId: response.data.permission.key,
          };

          // Save auth data in Redux store
          dispatch(setUserRole(userRole));
          dispatch(setUserPermissions(response.data.permission.permissions));
          dispatch(setAccessToken(response.data.accessToken));

          // Update user data as well in the Redux store
          dispatch(setInfoData(response.data.user));

          // Finally, redirect the user to either the `dashboard` or any other page they were trying to access before logging in
          const destination = location.state?.location;

          if (destination) {
            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
            history.replace(destination);
          } else {
            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
            history.replace(DASHBOARD);
          }
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }
  return (
    <section className="form">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-12 p-0">
            <div className="main-img-text">
              <div className="main-img">
                <Link to="/">
                  {/* <img src={LoginBanner} className="img-fluid side" /> */}
                </Link>
              </div>
              <div className="heading-paragraph">
                <h1 className="welcome-heading">Welcome to Healthi Wealthi</h1>
                <p className="building">Your Health Care Partner</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 p-0 order-1 order-md-0">
            <div className="form-wrapper">
              <div className="fix-height">
                <div className="top-logo">
                  <Link to="/">
                    <img src={Logo} className="img-fluid" />
                  </Link>
                </div>
                <div className="heading-login">
                  <h1 className="login">Login</h1>
                  <span className="sub-heading">
                    Discover a Better way to Become Healthi
                  </span>
                </div>
                <Form className="w-100 " noValidate onSubmit={loginHandler}>
                  <FloatingLabel
                    controlId="floating-input-email"
                    label="Email"
                    className="dg-mb-16"
                  >
                    <span className="icon fa fa-envelope"></span>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      ref={emailRef}
                    />
                    <span className="errors">{validationErrors.email}</span>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floating-input-password"
                    label="Password"
                    className="dg-mb-10"
                  >
                    <span className="icon fa fa-lock"></span>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      ref={passwordRef}
                    />
                    <span className="errors">{validationErrors.password}</span>
                  </FloatingLabel>

                  <div className={` d-flex justify-content-between`}>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Link className="forget-link" to={FORGOT_PASSWORD}>
                      Forgot Password?
                    </Link>
                  </div>

                  <Button
                    variant="primary"
                    disabled={isLoading}
                    className="dg-mt-24"
                    type="submit"
                    data-testid="login-btn"
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
                    <span>Login</span>
                  </Button>
                  <div className="not-creat d-flex justify-content-center align-items-center">
                    <span className="not-member">Not member yet? </span>
                    <Link className="account" to="/signup">
                      <strong className="creat-account">Create account</strong>
                    </Link>
                  </div>
                  <button className="btn btn-google">
                    <img
                      src="/images/google.svg"
                      alt="Google image"
                      className="img-fluid"
                    />
                    Google
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
