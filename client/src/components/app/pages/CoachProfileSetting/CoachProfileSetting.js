import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Toast from "../../../common/toast/Toast";
import {
  cancelOngoingHttpRequest,
  getHttpRequest,
  putHttpRequest,
} from "../../../../axios";
import validate from "../../../../utils/form-validation/authFormValidation";

const CoachProfileSetting = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const UserNameRef = useRef();
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();
  const genderRef = useRef();
  const DobRef = useRef();
  const biographyRef = useRef();
  const addressRef = useRef();
  const postalCodeRef = useRef();
  const priceRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();

  function updateProfileHandler(event) {
    event.preventDefault();
    const userName = UserNameRef.current.value;
    const email = emailRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const gender = genderRef.current.value;
    const biography = biographyRef.current.value;
    const address = addressRef.current.value;
    const postalCode = postalCodeRef.current.value;
    const price = priceRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const country = countryRef.current.value;

    const payload = {
      userName,
      email,
      firstName,
      lastName,
      phoneNumber,
      gender,
      biography,
      address,
      postalCode,
      price,
      city,
      state,
      country,
      _id: "6245d9674779712f0f8fae55",
    };
    console.log(payload);

    // const errors = validate(coachProfileSetting);

    // if (Object.keys(errors).length > 0) {
    // setValidationErrors({ ...errors });
    // return;
    // } else {/
    // setValidationErrors({});
    // }

    setIsLoading(true);
    putHttpRequest("/front/coach/edit", payload)
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

  const Upgrade = () => {
    history.push("/coach-upgrade-profile");
    console.log("dssd");
  };
  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        {/* <!-- Basic Information --> */}
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Basic Information</h4>
            <div className="row form-row">
              <div className="col-md-12">
                <div className="form-group">
                  <div className="change-avatar">
                    <div className="profile-img">
                      <img
                        src="/assets/img/doctors/doctor-thumb-02.jpg"
                        alt="User Image"
                      />
                    </div>
                    <div className="upload-img">
                      <div className="change-photo-btn">
                        <span>
                          <i className="fa fa-upload"></i> Upload Photo
                        </span>
                        <input type="file" className="upload" />
                      </div>
                      <small className="form-text text-muted">
                        Allowed JPG, GIF or PNG. Max size of 2MB
                      </small>
                    </div>
                    <button className="change-account" onClick={Upgrade}>
                      Upgrade Account
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Username <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="userName"
                    ref={UserNameRef}
                    className="form-control"
                    readonly
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    ref={emailRef}
                    className="form-control"
                    readonly
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    ref={firstNameRef}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    ref={lastNameRef}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    ref={phoneNumberRef}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Gender</label>
                  <select ref={genderRef} className="form-control select">
                    <option>Select</option>
                    <option name="male">Male</option>
                    <option name="female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Basic Information --> */}

        {/* <!-- About Me --> */}
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">About Me</h4>
            <div className="form-group mb-0">
              <label>Biography</label>
              <textarea
                className="form-control"
                ref={biographyRef}
                rows="5"
              ></textarea>
            </div>
          </div>
        </div>
        {/* <!-- /About Me --> */}

        {/* <!-- Contact Details --> */}
        <div className="card contact-card">
          <div className="card-body">
            <h4 className="card-title">Contact Details</h4>
            <div className="row form-row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    ref={addressRef}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="control-label" name="city" ref={cityRef}>
                    City
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="control-label" name="state" ref={stateRef}>
                    State / Province
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label
                    className="control-label"
                    ref={countryRef}
                    nam="country"
                  >
                    Country
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="control-label">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    ref={postalCodeRef}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Contact Details --> */}

        {/* <!-- Pricing --> */}
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Pricing</h4>

            <div className="form-group mb-0">
              <div id="pricing_select">
                <div className="custom-control custom-radio custom-control-inline">
                  <label className="custom-control-label" for="price_custom">
                    Custom Price (per hour)
                  </label>
                </div>
              </div>
            </div>

            <div
              className="row custom_price_cont"
              id="custom_price_cont"
              // style="display: none;"
            >
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  id="custom_rating_input"
                  name="price"
                  ref={priceRef}
                  placeholder="20"
                />
                <small className="form-text text-muted">
                  Custom price you can add
                </small>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Pricing --> */}

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
    </>
  );
};

export default CoachProfileSetting;
