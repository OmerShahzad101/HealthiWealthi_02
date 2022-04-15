import React from "react";

import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Toast from "../../../common/toast/Toast";
import {
  getHttpRequest,
  putHttpRequest,
  postHttpRequest,
} from "../../../../axios";
import validate from "../../../../utils/form-validation/authFormValidation";
import { useSelector, useDispatch } from "react-redux";
import { setCoachProfile, setUser } from "../../../../store/slices/auth";

const ContactDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const userid = useSelector((state) => state.auth.user.userid);
  const [profileData, setprofileData] = useState({});

  const phoneRef = useRef();

  const addressRef = useRef();
  const postalCodeRef = useRef();

  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();

  function updateProfileHandler(event) {
    event.preventDefault();

    const phone = phoneRef.current.value;

    const address = addressRef.current.value;
    const postalCode = postalCodeRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const country = countryRef.current.value;

    const payload = {
      phone,
      address,
      postalCode,
      city,
      state,
      country,
      _id: userid,
    };
    const errors = validate(payload);

    if (Object.keys(errors).length > 0) {
      setValidationErrors({ ...errors });
      return;
    } else {
      setValidationErrors({});
    }

    setIsLoading(true);
    console.log("payload", payload);
    putHttpRequest("/front/coach/edit", payload)
      .then((result) => {
        setIsLoading(false);
        if (!result) {
          alert("Something went wrong with response...");
          console.log("Something went wrong with response...");
          return;
        }
        if (result.data.success === true) {
          dispatch(setCoachProfile({ res: result.data.coach }));
          Toast.fire({
            icon: "success",
            title: result.data.message,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: result.data.message,
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
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    getHttpRequest(`/front/coach/get/${userid}`)
      .then((response) => {
        if (!response) {
          alert("Something went wrong with response...  front/coach/get");
          console.log("Something went wrong with response...");
          return;
        }
        if (response.data.success === true) {
          console.log("responseDon", response?.data?.coach);
          setprofileData(response?.data?.coach);
        } else {
          console.log(response.data.message);
        }
      })
      .catch(() => {
        console.log("Something went wrong...");
      });
  }, []);
  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="card">
          <div className="card-body pt-0 user-tabs mb-4">
            <div className="card contact-card">
              <div className="card-body">
                <h4 className="card-title">Contact Details</h4>
                <div className="row form-row">
                  <div className="col-md-12">
                    <div className="form-floating mb-4">
                      <input
                        type="address"
                        name="address"
                        ref={addressRef}
                        className="form-control"
                        placeholder="address"
                        defaultValue={profileData?.address}
                      />
                      <label>Address</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating mb-4">
                      <input
                        type="city"
                        name="city"
                        ref={cityRef}
                        className="form-control"
                        placeholder="city"
                        defaultValue={profileData?.city}
                      />
                      <label>City</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating mb-4">
                      <input
                        type="state"
                        name="state"
                        ref={stateRef}
                        className="form-control"
                        placeholder="state"
                        defaultValue={profileData?.state}
                      />
                      <label>State</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-4">
                      <input
                        type="country"
                        name="country"
                        ref={countryRef}
                        className="form-control"
                        placeholder="country"
                        defaultValue={profileData?.country}
                      />
                      <label>Country</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-4">
                      <input
                        type="postal"
                        name="postal"
                        ref={postalCodeRef}
                        className="form-control"
                        placeholder="postal"
                        defaultValue={profileData?.postalCode}
                      />
                      <label>Postal Code</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-4">
                      <input
                        type="text"
                        name="phonenumber"
                        ref={phoneRef}
                        className="form-control"
                        placeholder="Phone"
                        defaultValue={profileData?.phone}
                      />
                      <label>Phone Number</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-section submit-btn-bottom">
              <button
                type="button"
                onClick={updateProfileHandler}
                className="btn btn-primary submit-btn"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetails;
