import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import Logo from "../../common/logo/Logo";
import Toast from "../../../common/toast/Toast";
import { setInfoData } from "../../../../store/slices/user";
import { Link, useHistory, useLocation } from "react-router-dom";
import { DASHBOARD } from "../../../../router/constants/ROUTES";
import validate from "../../../../utils/form-validation/authFormValidation";
import { cancelOngoingHttpRequest, getHttpRequest, postHttpRequest} from "../../../../axios";
import { setUserRole, setUserPermissions, setAccessToken} from "../../../../store/slices/auth";

const Login = (props) => {
  
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [validationErrors, setValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(props)
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
    postHttpRequest("/front/auth/login", loginData)
      .then((response) => {
    
        setIsLoading(false);

        if (!response) {
         alert("Something went wrong with response...")
          console.log("Something went wrong with response...");
          return;
        }

        if (response.data.success === true) {
          const userRole = {
            role: response?.data?.user?.role ,//response.data.permission.value
            // roleId: response.data.permission.key,
          };
          console.log("userRole", response?.data?.user?.role)

          // Save auth data in Redux store
          // dispatch(setUserRole(userRole));
          // dispatch(setUserPermissions(response.data.permission.permissions));
          dispatch(setAccessToken(response.data.data.accessToken));

          // Update user data as well in the Redux store
          dispatch(setInfoData(response.data.data));

          // Finally, redirect the user to either the `dashboard` or any other page they were trying to access before logging in
          const destination = location.state?.location;

          if (destination) {
            history.replace(destination);
          } else {
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
        Toast.fire({
          icon: "error",
          title: "Something went wrong...",
        });
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
