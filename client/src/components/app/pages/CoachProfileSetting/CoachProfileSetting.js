import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Toast from "../../../common/toast/Toast";
import { getHttpRequest, putHttpRequest } from "../../../../axios";
import validate from "../../../../utils/form-validation/authFormValidation";
import { useSelector } from "react-redux";

const CoachProfileSetting = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const userid = useSelector((state) => state.auth.userid);
  const [profileData, setprofileData] = useState({});

  const specializationRef = useRef();

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const phoneRef = useRef();
  const genderRef = useRef();

  const aboutRef = useRef();
  const addressRef = useRef();
  const postalCodeRef = useRef();
  const priceRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();

  function updateProfileHandler(event) {
    event.preventDefault();
    const specialization = specializationRef.current.value;

    const firstname = firstnameRef.current.value;
    const lastname = lastnameRef.current.value;
    const phone = phoneRef.current.value;
    const gender = genderRef.current.value;
    const about = aboutRef.current.value;
    const address = addressRef.current.value;
    const postalCode = postalCodeRef.current.value;
    const price = priceRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const country = countryRef.current.value;

    const payload = {
      specialization,
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

  const upgradePackage = () => {
    history.push("/coach-upgrade-profile");
    console.log("dssd");
  };

  useEffect(() => {
    getHttpRequest(`/front/coach/get/${userid}`)
      .then((response) => {
        if (!response) {
          alert("Something went wrong with response...");
          console.log("Something went wrong with response...");
          return;
        }

        if (response.data.success === true) {
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
                    {/* <button className="change-account" onClick={upgradePackage}>
                      Upgrade Account
                    </button> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="username"
                    value={profileData?.username}
                    disabled
                  />
                  <label>Username</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={profileData?.email}
                    disabled
                  />
                  <label>Email</label>
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
                    defaultValue={profileData?.firstname}
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
                    defaultValue={profileData?.lastname}
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
                    name="specialization"
                    ref={specializationRef}
                    className="form-control"
                    placeholder="specialization"
                    defaultValue={profileData?.specialization}
                  />
                  <label>
                    Specialization <span className="text-danger">*</span>
                  </label>
                  <span className="errors">
                    {validationErrors.specialization}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-4">
                  <select
                    className="form-select"
                    ref={genderRef}
                    defaultValue={profileData?.gender}
                  >
                    {profileData?.gender === "" ? (
                      <option selected disabled>
                        Open this select menu
                      </option>
                    ) : (
                      <option disabled>Open this select menu</option>
                    )}

                    <option name="male" value="male">
                      Male
                    </option>
                    <option name="female" value="female">
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
                type="about"
                name="about"
                ref={aboutRef}
                className="form-control"
                placeholder="about"
                style={{ minHeight: "150px" }}
                defaultValue={profileData?.about}
              />
              <label>Briefly describe yourself</label>
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
            <div className="row form-row">
              <div className="col-md-6">
                <div className="form-floating my-4">
                  <input
                    type="price"
                    name="price"
                    ref={priceRef}
                    className="form-control"
                    placeholder="price"
                    defaultValue={profileData?.price}
                  />
                  <label>
                    Price in USD <span className="text-danger">*</span>
                  </label>
                  <span className="errors">{validationErrors.price}</span>
                </div>
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
