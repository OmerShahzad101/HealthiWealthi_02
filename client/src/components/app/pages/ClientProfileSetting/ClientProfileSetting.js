import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Toast from "../../../common/toast/Toast";
import {
  cancelOngoingHttpRequest,
  getHttpRequest,
  putHttpRequest,
} from "../../../../axios";
import validate from "../../../../utils/form-validation/authFormValidation";

const ClientProfileSetting = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const phonenumberRef = useRef();
  const genderRef = useRef();
  const DobRef = useRef();
  const biographyRef = useRef();
  const addressRef = useRef();
  const postalcodeRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const bloodgroupRef = useRef();

  function updateProfileHandler(event) {
    event.preventDefault();

    const firstname = firstnameRef.current.value;
    const lastname = lastnameRef.current.value;
    const phonenumber = phonenumberRef.current.value;
    const gender = genderRef.current.value;
    const biography = biographyRef.current.value;
    const address = addressRef.current.value;
    const postalcode = postalcodeRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const country = countryRef.current.value;
    const bloodgroup = bloodgroupRef.current.value;

    const payload = {
      firstname,
      lastname,
      phonenumber,
      bloodgroup,
      gender,
      biography,
      address,
      postalcode,
      city,
      state,
      country,
      //_id: "6245d9674779712f0f8fae55",
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
    putHttpRequest("/front/client/edit", payload)
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
        <div className="card">
          <div className="card-body">
            <form noValidate onSubmit={updateProfileHandler}>
              <div className="row form-row">
                <div className="col-12 col-md-12">
                  <div className="form-group">
                    <div className="change-avatar">
                      <div className="profile-img">
                        <img
                          src="/assets/img/patients/patient.jpg"
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
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating mb-4">
                    <input
                      type="firstname"
                      name="firstname"
                      ref={firstnameRef}
                      className="form-control"
                      placeholder="first name"
                    />
                    <label>
                      First Name <span className="text-danger">*</span>
                    </label>
                    <span className="errors">{validationErrors.firstname}</span>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating mb-4">
                    <input
                      type="lastname"
                      name="lastname"
                      ref={lastnameRef}
                      className="form-control"
                      placeholder="last name"
                    />
                    <label>
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <span className="errors">{validationErrors.lastname}</span>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <div className="cal-icon">
                      <input
                        type="text"
                        className="form-control datetimepicker"
                        value="24-07-1983"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating mb-4">
                    <select className="form-select" ref={bloodgroupRef}>
                      <option value="" selected disabled>
                        Open this select menu
                      </option>
                      <option>A-</option>
                      <option>A+</option>
                      <option>B-</option>
                      <option>B+</option>
                      <option>AB-</option>
                      <option>AB+</option>
                      <option>O-</option>
                      <option>O+</option>
                    </select>
                    <label>Blood Group</label>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating mb-4">
                    <input
                      type="email"
                      name="email"
                      //ref={emailRef}
                      className="form-control"
                      placeholder="email"
                    />
                    <label>
                      Email <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating mb-4">
                    <input
                      type="phonenumber"
                      name="phonenumber"
                      ref={phonenumberRef}
                      className="form-control"
                      placeholder="Phone Number"
                    />
                    <label>
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <span className="errors">
                      {validationErrors.phonenumber}
                    </span>
                  </div>
                </div>
                <div className="col-12">
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
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
                  <div className="form-floating mb-4">
                    <input
                      type="postalcode"
                      name="postalcode"
                      ref={postalcodeRef}
                      className="form-control"
                      placeholder="postalcode"
                    />
                    <label>Postal Code</label>
                  </div>
                </div>
                <div className="col-12 col-md-6">
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
              </div>
              <div className="submit-section">
                <button type="submit" className="btn btn-primary submit-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientProfileSetting;
