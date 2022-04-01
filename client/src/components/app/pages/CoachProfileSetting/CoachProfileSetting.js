import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Toast from "../../../common/toast/Toast";
import {
  cancelOngoingHttpRequest,
  getHttpRequest,
  postHttpRequest,
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

    const loginData = {
      userName,
      email,
      firstName,
      lastName,
      phoneNumber,
      gender,
      biography,
      address,
      postalCode,
      price
    };
    console.log(loginData);

    // const errors = validate(loginData);

    // if (Object.keys(errors).length > 0) {
    //   setValidationErrors({ ...errors });
    //   return;
    // } else {
    //   setValidationErrors({});
    // }

    // setIsLoading(true);
    // postHttpRequest("/front/auth/login", loginData)
    //   .then((response) => {
    //     setIsLoading(false);

    //     if (!response) {
    //       alert("Something went wrong with response...");
    //       console.log("Something went wrong with response...");
    //       return;
    //     }

    //     if (response.data.success === true) {
    //       Toast.fire({
    //         icon: "success",
    //         title: response.data.message,
    //       });
    //     } else {
    //       Toast.fire({
    //         icon: "error",
    //         title: response.data.message,
    //       });
    //     }
    //   })
    //   .catch(() => {
    //     setIsLoading(false);
    //     Toast.fire({
    //       icon: "error",
    //       title: "Something went wrong...",
    //     });
    //   });
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
                  <label className="control-label">City</label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="control-label">State / Province</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="control-label">Country</label>
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

        {/* <!-- Services and Specialization --> */}
        <div className="card services-card">
          <div className="card-body">
            <h4 className="card-title">Services and Specialization</h4>
            <div className="form-group">
              <label>Services</label>
              <input
                type="text"
                data-role="tagsinput"
                className="input-tags form-control"
                placeholder="Enter Services"
                name="services"
                value="Tooth cleaning "
                id="services"
              />
              <small className="form-text text-muted">
                Note : Type & Press enter to add new services
              </small>
            </div>
            <div className="form-group mb-0">
              <label>Specialization </label>
              <input
                className="input-tags form-control"
                type="text"
                data-role="tagsinput"
                placeholder="Enter Specialization"
                name="specialist"
                value="Children Care,Dental Care"
                id="specialist"
              />
              <small className="form-text text-muted">
                Note : Type & Press enter to add new specialization
              </small>
            </div>
          </div>
        </div>
        {/* <!-- /Services and Specialization --> */}

        {/* <!-- Education --> */}
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Education</h4>
            <div className="education-info">
              <div className="row form-row education-cont">
                <div className="col-12 col-md-10 col-lg-11">
                  <div className="row form-row">
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label>Degree</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label>College/Institute</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label>Year of Completion</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="add-more">
              <a href="#" className="add-education">
                <i className="fa fa-plus-circle"></i> Add More
              </a>
            </div>
          </div>
        </div>
        {/* <!-- /Education --> */}

        {/* <!-- Experience --> */}
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Experience</h4>
            <div className="experience-info">
              <div className="row form-row experience-cont">
                <div className="col-12 col-md-10 col-lg-11">
                  <div className="row form-row">
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label>Hospital Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label>From</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label>To</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label>Designation</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="add-more">
              <a href="#" className="add-experience">
                <i className="fa fa-plus-circle"></i> Add More
              </a>
            </div>
          </div>
        </div>
        {/* <!-- /Experience --> */}

        {/* <!-- Awards --> */}
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Awards</h4>
            <div className="awards-info">
              <div className="row form-row awards-cont">
                <div className="col-12 col-md-5">
                  <div className="form-group">
                    <label>Awards</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-12 col-md-5">
                  <div className="form-group">
                    <label>Year</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
            <div className="add-more">
              <a href="#" className="add-award">
                <i className="fa fa-plus-circle"></i> Add More
              </a>
            </div>
          </div>
        </div>
        {/* <!-- /Awards --> */}

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
