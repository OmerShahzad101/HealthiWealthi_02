import { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from "../../common/logo/Logo";

import Toast from '../../../common/toast/Toast';

import { cancelOngoingHttpRequest, postHttpRequest } from '../../../../axios';
import validate from '../../../../utils/form-validation/authFormValidation';

const ForgotPassword = () => {
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
    postHttpRequest('front/auth/forgot-password', { ...inputData })
      .then((response) => {
        const data = response.data;

        if (data && data.success) {
          Toast.fire({
            icon: 'info',
            title: data.message,
          });
        } else {
          Toast.fire({
            icon: 'error',
            title: data.message,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


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

                <form noValidate onSubmit={forgetPasswordUserHandler}>
                  <div className="form-floating mb-3">
                    <input
                    className="form-control"
                       type="email"
                       ref={emailRef}
                       name="email"
                       required
                       placeholder='Email'
                    />
                    <label>Email</label>
                    <span className="errors">{validationErrors?.email}</span>
                  </div>
                  <div className="text-right">
                    <Link className="forgot-link" to="/login">
                      Remember your password?
                    </Link>
                  </div>
                  <button
                    disabled={isLoading}
                    className="btn btn-primary btn-block btn-lg login-btn"
                    type="submit"
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
