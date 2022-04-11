import { useEffect, useRef, useState } from "react";
import { Button, Form, FloatingLabel, Spinner } from "react-bootstrap";
import { useParams, useHistory } from "react-router";

import Logo from "../../common/logo/Logo";
import Toast from "../../../common/toast/Toast";

import { LOGIN } from "../../../../router/constants/ROUTES";
import { cancelOngoingHttpRequest, postHttpRequest } from "../../../../axios";
import validate from "../../../../utils/form-validation/authFormValidation";


export default function ChangePassword() {
  let { token } = useParams();
  const history = useHistory();

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState("");



  function changePasswordHandler(event) {
    event.preventDefault();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const inputData = {
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
    postHttpRequest(`front/auth/change-password/${token}`, { ...inputData })
      .then((response) => {
        setIsLoading(false);
        const data = response.data;

        if (data && data.success) {
          Toast.fire({
            icon: "info",
            title: data.message,
          });
          setTimeout(() => {
            history.replace(LOGIN);
          }, 2000);
        } else {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="account-page">
      <div className="content">
        <div className="text-center mb-md-5 mb-3">
          {/* <Logo /> */}
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 text-center">
              <div className="account-content login-right">
                <div className="login-header">
                  <h3>Set New Password</h3>
                  <p className="small text-muted">
                    Please Enter the New Password
                  </p>
                </div>

                <Form noValidate onSubmit={changePasswordHandler}>
                  <FloatingLabel
                    controlId="floating-input-new-password"
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control
                      ref={passwordRef}
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      name="password"
                      required
                    />
                    <span className="errors">{validationErrors.password}</span>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floating-input-confirm-password"
                    label="Confirm New Password"
                    className="mb-3"
                  >
                    <Form.Control
                      ref={confirmPasswordRef}
                      type="password"
                      placeholder="Confirm New Password"
                      name="confirmPassword"
                      required
                    />
                    <span className="errors">
                      {validationErrors.confirmPassword}
                    </span>
                  </FloatingLabel>

                  <Button
                    variant="primary"
                    type="submit"
                    className="btn btn-block dg-mt-40"
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
                    <span>Update Password</span>
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
