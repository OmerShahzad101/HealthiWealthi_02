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
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const ContactDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const userid = useSelector((state) => state.auth.user.userid);
  const [profileData, setprofileData] = useState({});

  const handleChangeInput = (e) => {
  console.log(e.target.value)
    const { name, value } = e.target;
    setprofileData({
      ...profileData,
      [name]: value,
    });
  };

  function updateProfileHandler(event) {
    event.preventDefault();

    const payload = profileData;

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
      <div className="card contact-card">
        <div className="card-body">
          <h4 className="card-title">Contact Details</h4>
          <div className="row form-row">
            <div className="col-md-12">
              <div className="form-floating mb-4">
                <input
                  type="address"
                  name="address"
                  className="form-control"
                  placeholder="address"
                  value={profileData?.address}
                  onChange={handleChangeInput}
                />
                <label>Address</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="city"
                  name="city"
                  className="form-control"
                  placeholder="city"
                  value={profileData?.city}
                  onChange={handleChangeInput}
                />
                <label>City</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="state"
                  name="state"
                  className="form-control"
                  placeholder="state"
                  value={profileData?.state}
                  onChange={handleChangeInput}
                />
                <label>State</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="country"
                  name="country"
                  className="form-control"
                  placeholder="country"
                  value={profileData?.country}
                  onChange={handleChangeInput}
                />
                <label>Country</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="postal"
                  name="postalCode"
                  className="form-control"
                  placeholder="postal"
                  value={profileData?.postalCode}
                  onChange={handleChangeInput}
                />
                <label>Postal Code</label>
              </div>
            </div>
            <div className="col-md-6">
              {/* <div className="form-floating mb-4">
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Phone"
                        value={profileData?.phone}
                        onChange={handleChangeInput}
                      />
                      <label>Phone Number</label>
                    </div> */}
              <PhoneInput
                defaultCountry={"gb"}
                inputExtraProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                }}
                value={profileData?.phone}
                //  onChange={handleChangeInput}
                onChange={phone => setprofileData( phone )}
                />
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
    </>
  );
};

export default ContactDetails;
