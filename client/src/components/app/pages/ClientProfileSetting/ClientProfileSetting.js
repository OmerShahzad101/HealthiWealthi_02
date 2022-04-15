import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Toast from "../../../common/toast/Toast";
import { getHttpRequest, putHttpRequest } from "../../../../axios";
import validate from "../../../../utils/form-validation/authFormValidation";
import { useDispatch, useSelector } from "react-redux";
import { setClientProfile } from "../../../../store/slices/auth";
const ClientProfileSetting = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const userid = useSelector((state) => state.auth.user.userid);
  const [profileData, setprofileData] = useState({});
  const dispatch = useDispatch();

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const phoneRef = useRef();
  const genderRef = useRef();
  const DobRef = useRef();
  const aboutRef = useRef();
  const addressRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const bloodgroupRef = useRef();
  function updateProfileHandler(event) {
    event.preventDefault();
    const firstname = firstnameRef.current.value;
    const lastname = lastnameRef.current.value;
    const phone = phoneRef.current.value;
    const gender = genderRef.current.value;
    const about = aboutRef.current.value;
    const address = addressRef.current.value;
    const postalCode = postalCodeRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const country = countryRef.current.value;
    const bloodgroup = bloodgroupRef.current.value;
    const payload = {
      firstname,
      lastname,
      phone,
      bloodgroup,
      gender,
      about,
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
    putHttpRequest("/front/client/edit", payload)
      .then((res) => {
        console.log("client", res?.data.client);
        setIsLoading(false);

        if (!res) {
          alert("Something went wrong with res...");
          console.log("Something went wrong with res...");
          return;
        }

        if (res) {
          console.log("coach ", res);
          const userData = { res: res?.data.client };
          dispatch(setClientProfile(userData));
          Toast.fire({
            icon: "success",
            title: res.data.message,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: res.data.message,
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

  const Upgrade = () => {
    history.push("/coach-upgrade-profile");
    console.log("dssd");
  };

  useEffect(() => {
    getHttpRequest(`/front/client/get/${userid}`)
      .then((response) => {
        console.log("coach", response?.data.coach);
        if (!response) {
          alert("Something went wrong with response...");
          console.log("Something went wrong with response...");
          return;
        }

        if (response.data.success === true) {
          setprofileData(response?.data?.client);
        } else {
          console.log(response.data.message);
        }
      })
      .catch(() => {
        console.log("Something went wrong...");
      });
  }, [dispatch]);

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
                <div className="col-12 col-md-6">
                  <div className="form-floating mb-4">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="email"
                      value={profileData?.email}
                      disabled
                    />
                    <label>Email</label>
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
                      defaultValue={profileData?.firstname}
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
                      defaultValue={profileData?.lastname}
                    />
                    <label>
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <span className="errors">{validationErrors.lastname}</span>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      ref={genderRef}
                      defaultValue={profileData?.gender}
                    >
                      <option value="" selected disabled>
                        Open this select menu
                      </option>
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
                <div className="col-12 col-md-6">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      ref={bloodgroupRef}
                      defaultValue={profileData?.bloodgroup}
                    >
                      <option value="" disabled>
                        Open this select menu
                      </option>
                      <option name="A" value="A-">
                        A-
                      </option>
                      <option name="A+" value="A+">
                        A+
                      </option>
                      <option name="B-" value="B-">
                        B-
                      </option>
                      <option name="B+" value="B+">
                        B+
                      </option>
                      <option name="AB-" value="AB-">
                        AB-
                      </option>
                      <option name="AB+" value="AB+">
                        AB+
                      </option>
                      <option name="O-" value="O-">
                        O-
                      </option>
                      <option name="O+" value="O+">
                        O+
                      </option>
                    </select>
                    <label>Blood Group</label>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-floating mb-4">
                    <input
                      type="phone"
                      name="phone"
                      ref={phoneRef}
                      className="form-control"
                      placeholder="Phone Number"
                      defaultValue={profileData?.phone}
                    />
                    <label>Phone Number</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-4">
                    <textarea
                      type="about"
                      name="about"
                      ref={aboutRef}
                      className="form-control"
                      placeholder="about"
                      style={{ minHeight: "100px" }}
                      defaultValue={profileData?.about}
                    />
                    <label>Briefly describe about yourself</label>
                  </div>
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
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
                  <div className="form-floating mb-4">
                    <input
                      type="postalCode"
                      name="postalCode"
                      ref={postalCodeRef}
                      className="form-control"
                      placeholder="postalCode"
                      defaultValue={profileData?.postalCode}
                    />
                    <label>Postal Code</label>
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
