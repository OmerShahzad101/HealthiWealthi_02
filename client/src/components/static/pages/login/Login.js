import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Spinner, Button } from "react-bootstrap";
import Toast from "../../../common/toast/Toast";
import { setInfoData } from "../../../../store/slices/user";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  DASHBOARD,
  CLIENT_DASHBOARD,
  COACH_DASHBOARD,
} from "../../../../router/constants/ROUTES";
import validate from "../../../../utils/form-validation/authFormValidation";
import {
  cancelOngoingHttpRequest,
  getHttpRequest,
  postHttpRequest,
  putHttpRequest,
} from "../../../../axios";
import {
  setUser,
  setUserPermissions,
  setAccessToken,
} from "../../../../store/slices/auth";
import GoogleLogin from "react-google-login";

import { createCacheKeyComparator } from "reselect/es/defaultMemoize";
const Login = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const typeRef = useRef();

  const [validationErrors, setValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [_id, setId] = useState("");
  const handleLogin = (response) => {
    console.log(response);

    postHttpRequest("/front/auth/googleLogin", {
      tokenId: response.tokenId,
    }).then((response) => {
      console.log("google login success", response);
      if (response.status === 200) {
        console.log("alert", response.data.user._id);
        dispatch(setAccessToken(response.data.accessToken));
        setId(response.data.user._id);
        setShow(true);
      }
    });
  };

  const handleFail = (googleData) => {
    console.log(googleData);
  };

  const loginHandler = async (event) => {
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

    // __ __ __ __ //
    try {
      let response = await postHttpRequest("/front/auth/login", loginData);
      console.log(response);
      if (!response) {
        Toast.fire({
          icon: "error",
          title: response.data.message,
        });
        return;
      }

      if (response) {
        setIsLoading(false);
        let res = await getHttpRequest(
          `/front/coach/get/${response?.data?.data?._id}`
        );
        console.log("res ", res);
        if (res) {
          const userData = {
            role: response?.data?.data?.type,
            name: response?.data?.data?.name,
            email: response?.data?.data?.email,
            _id: response?.data?.data?._id,
            about: res?.data.coach.about,
            firstname: res?.data.coach.firstname,
            lastname: res?.data.coach.lastname,
            specialization: res?.data.coach.specialization,
            profile: res?.data.coach.profile,
          };
          dispatch(setUser(userData));
          dispatch(setAccessToken(response.data.data.accessToken));

          if (response?.data?.data?.type == 1) {
            history.replace(CLIENT_DASHBOARD);
          } else if (response?.data?.data?.type == 3) {
            history.replace(COACH_DASHBOARD);
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
        title: "Invalid username or password",
      });
    }
  };

  const loginGmailHanlder = async (event) => {
    event.preventDefault();

    const type = typeRef.current.value;

    const payload = {
      _id,
      type,
    };

    const errors = validate(payload);

    if (Object.keys(errors).length > 0) {
      setValidationErrors({ ...errors });
      return;
    } else {
      setValidationErrors({});
    }
    setIsLoading(true);

    try {
      let response = await putHttpRequest("/front/auth/role", payload);
      console.log(response);
      if (!response) {
        Toast.fire({
          icon: "error",
          title: response.data.message,
        });
        return;
      }

      if (response.data.coach.status === true) {
        setIsLoading(false);
        let res = await getHttpRequest(
          `/front/coach/get/${response?.data?.coach?._id}`
        );
        console.log("res ", res);
        if (res) {
          const userData = {
            role: response?.data?.coach?.type,
            name: response?.data?.data?.name,
            email: response?.data?.data?.email,
            _id: response?.data?.data?._id,
            about: res?.data.coach.about,
            firstname: res?.data.coach.firstname,
            lastname: res?.data.coach.lastname,
            specialization: res?.data.coach.specialization,
            profile: res?.data.coach.profile,
          };
          dispatch(setUser(userData));
        debugger;

          if (response?.data?.coach?.type == 1) {
            history.replace(CLIENT_DASHBOARD);
          } else if (response?.data?.coach?.type == 3) {
            history.replace(COACH_DASHBOARD);
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
        title: "Something went wrong",
      });
    }

    //     putHttpRequest("/front/auth/role", payload).then((response) => {
    //       setIsLoading(false);

    //       if (!response) {
    //         console.log("Something went wrong with response...");
    //         return;
    //       }
    // console.log("Rssssssssssssssssssss", response)

    //       if (response.data.coach.status === true) {
    //         setValidationErrors({});

    //         fetch(
    //           `/front/coach/get/${response?.data?.coach?._id}`
    //         ).then(resp => resp.json()).then(data => {
    //           console.log("asdjkashdkhasjkdhajksdhajkhdjkashdjkahsdjkahsdjkh",data);
    //     })

    //         // if (response) {
    //         //   setIsLoading(false);

    //         //   if (res) {
    //         //     const userData = {
    //         //       role: response?.data?.data?.type,
    //         //       name: response?.data?.data?.name,
    //         //       email: response?.data?.data?.email,
    //         //       _id: response?.data?.data?._id,
    //         //       about: res?.data.coach.about,
    //         //       firstname: res?.data.coach.firstname,
    //         //       lastname: res?.data.coach.lastname,
    //         //       specialization: res?.data.coach.specialization,
    //         //       profile: res?.data.coach.profile,
    //         //     };
    //         //     dispatch(setUser(userData));
    //         //     dispatch(setAccessToken(response.data.data.accessToken));

    //         //     if (response?.data?.data?.type == 1) {
    //         //       history.replace(CLIENT_DASHBOARD);
    //         //     } else if (response?.data?.data?.type == 3) {
    //         //       history.replace(COACH_DASHBOARD);
    //         //     }
    //         //   } else {
    //         //     Toast.fire({
    //         //       icon: "error",
    //         //       title: response.data.message,
    //         //     });
    //         //     return;
    //         //   }
    //         // }
    //         Toast.fire({
    //           customClass: {
    //             denyButton: "deny-class",
    //             confirmButton: "confirm-class",
    //             title: "title",
    //             htmlContainer: "text",
    //           },
    //           icon: "success",
    //           width: "450px",
    //           padding: "20px 10px",
    //           title: `Registered Successfully!`,
    //           confirmButtonText: `OK`,
    //           text: `${response.data.message}`,
    //         })
    //         .then(() => {

    //           console.log("fonal", response)
    //           if (response?.data?.coach?.type == 1) {
    //             history.replace(CLIENT_DASHBOARD);
    //           } else if (response?.data?.coach?.type == 3) {
    //             history.replace(COACH_DASHBOARD);
    //           }
    //           console.log("final user type", response.data.coach.type)
    //         });
    //       } else {
    //         setValidationErrors(response.data.errorObj);

    //         Toast.fire({
    //           icon: "error",
    //           title: response.data.message,
    //         });
    //       }
    //     });
  };

  return (
    <div className="account-page">
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Kindly select your role
          <div className="form-floating mb-4">
            <select className="form-select" ref={typeRef}>
              <option value="" selected disabled>
                Open this select menu
              </option>
              <option name="3" value="3">
                Coach
              </option>
              <option name="1" value="1">
                Client
              </option>
            </select>
            <label>Register as a</label>
            <span className="errors">{validationErrors?.type}</span>
          </div>
          <Button onClick={loginGmailHanlder}></Button>
        </Modal.Body>
      </Modal>
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
                  <div className="row form-row social-login">
                    <div className="col-12">
                      <a href="#" className="btn btn-google btn-block">
                        <i className="fab fa-google mr-1"></i> Login
                      </a>
                    </div>
                  </div>
                  <div className="row form-row social-login">
                    <div className="col-12">
                      <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Sign in with Google"
                        className="ct-button ct-button--secondary"
                        onSuccess={handleLogin}
                        onFailure={handleFail}
                        cookiePolicy="single_host_origin"
                      ></GoogleLogin>
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
