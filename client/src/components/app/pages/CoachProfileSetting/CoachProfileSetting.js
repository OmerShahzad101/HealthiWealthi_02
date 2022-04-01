import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Toast from "../../../common/toast/Toast";
import { putHttpRequest } from "../../../../axios";
import validate from "../../../../utils/form-validation/authFormValidation";
import { useSelector } from "react-redux";

const CoachProfileSetting = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const userid = useSelector(state=>state.auth.userid);

  // const usernameRef = useRef();
  const emailRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const phonenumberRef = useRef();
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
    //const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const firstname = firstnameRef.current.value;
    const lastname = lastnameRef.current.value;
    const phone = phonenumberRef.current.value;
    const gender = genderRef.current.value;
    const about = biographyRef.current.value;
    const address = addressRef.current.value;
    const postalCode = postalCodeRef.current.value;
    const price = priceRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const country = countryRef.current.value;

    const payload = {
      // username,
      email,
      firstname,
      lastname,
      phone,
      gender,
      about,
      address,
      postalCode,
      price,
      city,
      state,
      country,
      _id: userid,
    };
    console.log(payload);

    const errors = validate(payload);

    if (Object.keys(errors).length > 0) {
      setValidationErrors({ ...errors });
      return;
    } else {
      setValidationErrors({});
    }

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
                <div className="form-group mb-4">
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
                    {/* <button className="change-account" onClick={Upgrade}>
                      Upgrade Account
                    </button> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-4">
                  <input
                    type="username"
                    name="username"
                    //ref={usernameRef}
                    className="form-control"
                    placeholder="username"
                  />
                  <label>
                    Username <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-4">
                  <input
                    type="email"
                    name="email"
                    ref={emailRef}
                    className="form-control"
                    placeholder="Email"
                  />
                  <label>
                    Email <span className="text-danger">*</span>
                  </label>
                  <span className="errors">{validationErrors.email}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    name="firstname"
                    ref={firstnameRef}
                    className="form-control"
                    placeholder="Email"
                  />
                  <label>
                    First Name <span className="text-danger">*</span>
                  </label>
                  <span className="errors">{validationErrors.firstname}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    name="lastname"
                    ref={lastnameRef}
                    className="form-control"
                    placeholder="Last Name"
                  />
                  <label>
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <span className="errors">{validationErrors.lastname}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    name="phonenumber"
                    ref={phonenumberRef}
                    className="form-control"
                    placeholder="Phone"
                  />
                  <label>
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <span className="errors">{validationErrors.phonenumber}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-4">
                  <select className="form-select" ref={genderRef}>
                    <option value="" selected disabled>
                      Open this select menu
                    </option>
                    <option name="male" value="">
                      Male
                    </option>
                    <option name="female" value="">
                      Female
                    </option>
                  </select>
                  <label>Gender</label>
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
            <div className="form-floating mb-4">
              <textarea
                type="biography"
                name="biography"
                ref={biographyRef}
                className="form-control"
                placeholder="biography"
                style={{ minHeight: "150px" }}
              />
              <label>Biography</label>
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
                <div className="form-floating mb-4">
                  <input
                    type="address"
                    name="address"
                    ref={addressRef}
                    className="form-control"
                    placeholder="address"
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
                  />
                  <label>Postal Code</label>
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

            <div className="form-floating my-4">
              <input
                type="price"
                name="price"
                ref={priceRef}
                className="form-control"
                placeholder="price"
              />
              <label>
                Price in USD <span className="text-danger">*</span>
              </label>
              <span className="errors">{validationErrors.price}</span>
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
