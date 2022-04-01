import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";

import Toast from "../../../common/toast/Toast";
import validate from "../../../../utils/form-validation/authFormValidation";
import {
  cancelOngoingHttpRequest,
  getHttpRequest,
  postHttpRequest,
} from "../../../../axios";

const CoachChangePassword = () => {
  const currentRef = useRef();
  const newRef = useRef();

  const [validationErrors, setValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function changePasswordHandler(event) {
    event.preventDefault();

    let payload = {
      current: currentRef.current.value,
      new : newRef.current.value,
    }
   

    const errors = validate(payload);

    if (Object.keys(errors).length > 0) {
      setValidationErrors({ ...errors });
      return;
    } else {
      setValidationErrors({});
    }

    setIsLoading(true);
    postHttpRequest("/front/auth/update-password", payload)
      .then((response) => {
        setIsLoading(false);

        if (!response) {
          alert("Something went wrong with response...");
          console.log("Something went wrong with response...");
          return;
        }

        if (response.data.success === true) {
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
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
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-lg-6">
                {/* <!-- Change Password Form --> */}
                <form onSubmit={changePasswordHandler}>
                <div className="form-floating mb-4">
                    <input
                      type="password"
                      name="password"
                      ref={currentRef}
                      className="form-control"
                      placeholder="Password"
                      autoComplete="current password"
                    />
                    <label>Old Password</label>
                    <span className="errors">{validationErrors.password}</span>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      name="password"
                      ref={newRef}
                      className="form-control"
                      placeholder="Password"
                      autoComplete="new password"

                    />
                    <label>New Password</label>
                    <span className="errors">{validationErrors.password}</span>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      autoComplete="new password"

                    />
                    <label>Confirm New Password</label>
                    <span className="errors">{validationErrors.password}</span>
                  </div>
                 
                  <div className="submit-section">
                    <button
                      className="btn btn-primary submit-btn"
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
                      Save Changes
                    </button>
                  </div>
                </form>
                {/* <!-- /Change Password Form --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachChangePassword;
