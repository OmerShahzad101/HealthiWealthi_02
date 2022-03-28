import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

import FormImg from "../../../../assets/images/formImg.png";
import Google from "../../common/Google";
import Toast from "../../../common/toast/Toast";

import validate from "../../../../utils/form-validation/authFormValidation";
import { cancelOngoingHttpRequest, postHttpRequest } from "../../../../axios";
import { LOGIN } from "../../../../router/constants/ROUTES";

import industriesData from "../../../../data/industries.json";
import noOfEmployeesData from "../../../../data/no-of-employees.json";

import SelectDropdown from "../../../common/react-select/SelectDropdown/SelectDropdown";
import { LightDigno } from "../../../../assets/SVGs/SVGs";

import Logo from "../../../../assets/img/Logo.svg";
import LoginBanner from "../../../../assets/img/login-banner.png";

export default function Register() {
  const history = useHistory();

  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Cancel company creation HTTP call in case component is unmounted due to route change
  useEffect(() => {
    return cancelOngoingHttpRequest;
  }, []);

  function registerUserHandler(event) {
    event.preventDefault();

    const userName = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const inputData = {
      userName,
      email,
      password,
      confirmPassword,
    };

    const errors = validate(inputData);

    if (Object.keys(errors).length > 0) {
      setValidationErrors({ ...errors });
      return;
    } else {
      setValidationErrors({});
    }

    setIsLoading(true);
    postHttpRequest("/auth/signup", {
      ...inputData,
      confirmPassword: undefined,
    })
      .then((response) => {
        setIsLoading(false);

        if (!response) {
          console.log("Something went wrong with response...");
          return;
        }

        if (response.data.success === true) {
          setValidationErrors({});

          Swal.fire({
            customClass: {
              denyButton: "deny-class",
              confirmButton: "confirm-class",
              title: "title",
              htmlContainer: "text",
            },
            width: "645px",
            padding: "35px 60px",
            title: `Registered Successfully!`,
            confirmButtonText: `OK`,
            text: `${response.data.message}`,
          }).then(() => {
            history.push(LOGIN);
          });
        } else {
          setValidationErrors(response.data.errorObj);
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
                  {/* <img src={LoginBanner} className="img-fluid side" />{" "} */}
                </Link>
              </div>
              <div className="heading-paragraph">
                <h1 className="welcome-heading">Welcome to Healthi Wealthi</h1>
                <p className="building">Your Health Care Partner</p>
              </div>
            </div>
          </div>
          <div className="col-md-6  col-12 p-0 order-1 order-md-0">
            <div className="form-wrapper">
              <div className="fix-height">
                <div className="top-logo">
                  <Link to="/">
                    <img src={Logo} className="img-fluid" />{" "}
                  </Link>
                </div>
                <div className="heading-login">
                  <h1 className="login">Sign up</h1>
                  <span className="sub-heading">
                    Discover a Better way to Become Healthi
                  </span>
                </div>
                <Form noValidate onSubmit={registerUserHandler}>
                  <FloatingLabel
                    controlId="input-user-name"
                    label="Full Name"
                    className=" dg-mb-16 w-100 text-muted"
                  >
                    <span className="icon fa fa-user"></span>
                    <Form.Control
                      type="text"
                      ref={userNameRef}
                      placeholder="Henry Octane"
                      autoComplete="name"
                      name="userName"
                      required
                    />
                    <span className="errors">{validationErrors?.userName}</span>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="input-email"
                    label="Email"
                    className=" w-100 text-muted"
                  >
                    <span className="icon fa fa-envelope"></span>
                    <Form.Control
                      type="email"
                      ref={emailRef}
                      placeholder="henry.octane@gmail.com"
                      autoComplete="email"
                      name="email"
                      required
                    />
                    <span className="errors">{validationErrors?.email}</span>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="input-password"
                    label="Password"
                    className="dg-mb-16 w-100 dg-mr-12 text-muted"
                  >
                    <span className="icon fa fa-lock"></span>
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      required
                    />
                    <span className="errors">{validationErrors?.password}</span>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="input-confirm-password"
                    label="Confirm Password"
                    className="dg-mb-16 w-100 dg-ml-12 text-muted"
                  >
                    <span className="icon fa fa-lock"></span>
                    <Form.Control
                      type="password"
                      ref={confirmPasswordRef}
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      name="confirmPassword"
                      required
                    />
                    <span className="errors">
                      {validationErrors?.confirmPassword}
                    </span>
                  </FloatingLabel>
                  <div className={` d-flex justify-content-between`}>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    className="dg-mt-16"
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
                    <span>Sign up</span>
                  </Button>
                  <div className="not-creat d-flex justify-content-center align-items-center">
                    <span className="not-member">Already have account?</span>
                    <Link className="account" to="/login">
                      <strong className="creat-account">Login</strong>
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
