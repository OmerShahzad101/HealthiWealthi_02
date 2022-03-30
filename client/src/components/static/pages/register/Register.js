import Logo from "../../common/logo/Logo";
import validate from "../../../../utils/form-validation/authFormValidation";
import { cancelOngoingHttpRequest, postHttpRequest } from "../../../../axios";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Toast from "../../../common/toast/Toast";
const Register = () => {
  const history = useHistory();

  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const roleRef = useRef();

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
    const role = roleRef.current.value;

    const inputData = {
      userName,
      email,
      password,
      confirmPassword,
      role,
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
          alert("sucessfully");
          // Swal.fire({
          //   customClass: {
          //     denyButton: "deny-class",
          //     confirmButton: "confirm-class",
          //     title: "title",
          //     htmlContainer: "text",
          //   },
          //   width: "645px",
          //   padding: "35px 60px",
          //   title: `Registered Successfully!`,
          //   confirmButtonText: `OK`,
          //   text: `${response.data.message}`,
          // }).then(() => {
          //   history.push(LOGIN);
          // });
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
                  <h3>Register </h3>
                </div>

                <form noValidate onSubmit={registerUserHandler}>
                  <div className="form-floating mb-3">
                    <input
                      ref={userNameRef}
                      name="userName"
                      required
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                    <label className="focus-label">Name</label>
                    <span className="errors">{validationErrors?.userName}</span>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      ref={emailRef}
                      autoComplete="email"
                      name="email"
                      required
                      className="form-control"
                      placeholder="Email"
                    />
                    <label className="focus-label">Email / Mobile Number</label>
                    <span className="errors">{validationErrors?.email}</span>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      ref={passwordRef}
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      required
                      className="form-control"
                    />
                    <label className="focus-label">Create Password</label>
                    <span className="errors">{validationErrors?.password}</span>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      ref={confirmPasswordRef}
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      name="confirmPassword"
                      required
                      className="form-control"
                    />
                    <label className="focus-label">Confirm Password</label>
                    <span className="errors">
                      {validationErrors?.confirmPassword}
                    </span>
                  </div>

                  <div className="form-floating mb-3">
                    <select className="form-select" ref={roleRef}>
                      <option
                        value=""
                        selected
                        disabled
                      >Open this select menu</option>
                      <option name="coach" value="coach">
                        Coach
                      </option>
                      <option name="client" value="client">
                        Client
                      </option>
                    </select>
                    <label>Register as a</label>
                  </div>

                  <div className="text-right">
                    <Link className="forgot-link" to="/login">
                      Already have an account?
                    </Link>
                  </div>
                  <button
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
                    Signup
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
