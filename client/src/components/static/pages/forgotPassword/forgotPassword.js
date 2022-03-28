import { useEffect, useRef, useState } from "react";
import { Button, Form, FloatingLabel, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

// import Logo from '../../common/logo/Logo';
import Toast from "../../../common/toast/Toast";

import { cancelOngoingHttpRequest, postHttpRequest } from "../../../../axios";
import validate from "../../../../utils/form-validation/authFormValidation";
import { LOGIN } from "../../../../router/constants/ROUTES";

import styles from "./forgetPassword.module.scss";
import Logo from "../../../../assets/img/Logo.svg";
import LoginBanner from "../../../../assets/img/login-banner.png";

export default function ForgotPassword() {
  const emailRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Cancel company creation HTTP call in case component is unmounted due to route change
  useEffect(() => {
    return cancelOngoingHttpRequest;
  }, []);

  function forgetPasswordUserHandler(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const inputData = {
      email,
    };

    const errors = validate(inputData);

    if (Object.keys(errors).length > 0) {
      setValidationErrors({ ...errors });
      return;
    } else {
      setValidationErrors({});
    }

    setIsLoading(true);
    postHttpRequest("/auth//forgot-password", { ...inputData })
      .then((response) => {
        const data = response.data;

        if (data && data.success) {
          Toast.fire({
            icon: "info",
            title: data.message,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        }
      })
      .finally(() => {
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
                {/* <img src={LoginBanner} className="img-fluid side" /> */}
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
                  <img src={Logo} className="img-fluid" />
                </div>
                <div className="heading-login">
                  <h1 className="login">Forgot Password?</h1>
                </div>
                <Form noValidate onSubmit={forgetPasswordUserHandler}>
                  <div className="d-flex">
                    <Form.Group
                      className="mb-12  w-100"
                      controlId="input-company-email"
                    >
                      <FloatingLabel
                        controlId="floating-input-email"
                        label="Email"
                        className="dg-mb-24 w-100 text-muted"
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
                        <span className="errors">
                          {validationErrors?.email}
                        </span>
                      </FloatingLabel>
                    </Form.Group>
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    className="btn btn-block"
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
                    <span>Reset Password</span>
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
