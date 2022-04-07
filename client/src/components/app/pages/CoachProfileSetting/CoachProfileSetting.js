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
import imagePath from "../../../../utils/url/imagePath";
import imageExist from "../../../../utils/url/imageExist";
import { AiOutlineCamera } from "react-icons/ai";
import { setInfoData, setAvatar } from "../../../../store/slices/user";

import { Tabs, Tab } from "react-bootstrap";

const CoachProfileSetting = () => {
  const [education, setEducation] = useState([
    { degree: "", college: "", year: "" },
  ]);

  var name = 2;
  const addEducation = () => {
    setEducation([...education, { degree: "", college: "", year: "" }]);
    console.log("education", education);
    //  $(this)
    // .closest(".education-cont")
    // .remove();
    var educationcontent = {
      /* <div class="row form-row education-cont">
    <div class="col-12 col-md-10 col-lg-11">
    <div class="row form-row">
    <div class="col-12 col-md-6 col-lg-4">
    <div class="form-group">
    <label>Degree</label>
    <input type="text" class="form-control"/>
    </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
    <div class="form-group">
    <label>College/Institute</label>
    <input type="text" class="form-control"/>
    </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
    <div class="form-group">
    <label>Year of Completion</label>
    <input type="text" class="form-control"
    </div
    </div
    </div
    </div
    <div class="col-12 col-md-2 col-lg-1"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>
    </div>
 */
    };

    //   var input = document.createElement("INPUT");
    // input.className = "form-control";
    // input.type = "text";
    //  input.value = "";
    //   var input1 = document.createElement("INPUT");
    //   input1.className = "form-control ";
    //   input1.type = "text";
    //   input1.value = "";
    //    var input2 = document.createElement("INPUT");
    //    input2.className = "form-control";
    //    input2.type = "text";
    //    input2.value = "";
    // document.getElementById("education-info").append(input,input1,input2);
  };
  const handleChange = (index, key, value) => {
    let updatedKeyValue;
    if (value) {
      const keyValue = education[index]; // obj{}
      if (key === "degree") {
        updatedKeyValue = { ...keyValue, degree: value };
      } else if (key === "college") {
        updatedKeyValue = { ...keyValue, college: value };
      } else if (key === "year") {
        updatedKeyValue = { ...keyValue, year: value };
      }
      const updatedEducation = [...education];
      updatedEducation.splice(index, 1, updatedKeyValue);
      setEducation([...updatedEducation]);
      console.log("education is updated ", education);
    }
  };

  const removeEducation = (i) => {
    console.log("index ", i);

    if (i) {
      const newArray = [...education];
      const updatedEducation = newArray.splice(i, 1);
      console.log("newArray  ", i, updatedEducation);
      setEducation([...newArray]);
    }
  };
  const addExperience = () => {
    //  $(this)
    // .closest(".education-cont")
    // .remove();
    var educationcontent = {
      /* <div class="row form-row education-cont">
    <div class="col-12 col-md-10 col-lg-11">
    <div class="row form-row">
    <div class="col-12 col-md-6 col-lg-4">
    <div class="form-group">
    <label>Degree</label>
    <input type="text" class="form-control"/>
    </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
    <div class="form-group">
    <label>College/Institute</label>
    <input type="text" class="form-control"/>
    </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
    <div class="form-group">
    <label>Year of Completion</label>
    <input type="text" class="form-control"
    </div
    </div
    </div
    </div
    <div class="col-12 col-md-2 col-lg-1"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>
    </div>
   
 */
    };
    var x = document.createElement("INPUT");
    document.getElementById("experience-info").append(x);
  };
  const addAward = () => {
    //  $(this)
    // .closest(".education-cont")
    // .remove();
    var educationcontent = {
      /* <div class="row form-row education-cont">
    <div class="col-12 col-md-10 col-lg-11">
    <div class="row form-row">
    <div class="col-12 col-md-6 col-lg-4">
    <div class="form-group">
    <label>Degree</label>
    <input type="text" class="form-control"/>
    </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
    <div class="form-group">
    <label>College/Institute</label>
    <input type="text" class="form-control"/>
    </div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
    <div class="form-group">
    <label>Year of Completion</label>
    <input type="text" class="form-control"
    </div
    </div
    </div
    </div
    <div class="col-12 col-md-2 col-lg-1"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>
    </div>
 */
    };
    var x = document.createElement("INPUT");
    document.getElementById("awards-info").append(x);
  };
  const userInfo = useSelector((state) => state.user.info);
  const dispatch = useDispatch();
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
  const degree = useRef();
  const institute = useRef();
  const yearOfCompletion = useRef();

  const checKImage = async (data) => {
    setTimeout(dispatch(setInfoData(data)), 9000);

    const exist = await imageExist(data.avatar);

    if (exist) {
      dispatch(setInfoData(data));
      return true;
    } else {
      checKImage(data);
    }
  };

  const onChangeImage = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      let _objFiles = files[0];
      console.log(_objFiles);

      if (_objFiles.size > 1000000) {
        Toast.fire({
          icon: "error",
          title: "File too Big, please select a file less than 1MB ",
        });
        return;
      }

      if (
        _objFiles.type.toLowerCase() !== "image/png" &&
        _objFiles.type.toLowerCase() !== "image/jpg" &&
        _objFiles.type.toLowerCase() !== "image/jpeg"
      ) {
        Toast.fire({
          icon: "error",
          title:
            "Only files with the following extensions are allowed: png, jpg, jpeg",
        });
        return;
      }

      const formData = new FormData();
      formData.append("avatar", files[0], files[0].name);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      console.log("avatar11111111111", files[0], "avatar", files[0].name);
      // dispatch(setInfoData(files[0]?.name));
      setIsLoading(true);
      postHttpRequest(`/front/coach/uploadImage/${userid}`, formData, config)
        .then((response) => {
          if (!response) {
            console.log("Something went wrong with response...");
            return;
          }
          console.log("in then");
          console.log("response", response);
          if (response.data.success === true) {
            setValidationErrors({});
            // Update user data as well in the Redux store
            //dispatch(setInfoData(response?.data?.avatar);
            checKImage(response.data.user);
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
        .finally(() => {
          setIsLoading(false);
          console.log("in finally");
        });
    }
  };

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
        <div className="card">
          <div className="card-body pt-0 user-tabs mb-4">
            <Tabs
              defaultActiveKey="user-info"
              id="uncontrolled-tab-example"
              className="nav-tabs-bottom nav-justified"
            >
              <Tab eventKey="user-info" title="Basic">
                {/* <!-- Basic Information --> */}
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Basic Information</h4>
                    <div className="row form-row">
                      <div className="col-md-12">
                        <div className="imageUploaderWrapper profile-img">
                          <div className="circle">
                            {userInfo && (
                              <img
                                src={imagePath(userInfo.avatar)}
                                alt="user img"
                              />
                            )}
                            {/* <img className="profilePic" src={imagePath} alt="user img" /> */}
                          </div>

                          <label className="pImage">
                            <AiOutlineCamera className="uploadButton" />
                            <input
                              className="fileUpload"
                              type="file"
                              accept="image/png, image/jpeg"
                              onChange={onChangeImage}
                            />
                          </label>
                        </div>
                        {/* <div className="form-group mb-4">
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
                    <button className="change-account" onClick={upgradePackage}>
                      Upgrade Account
                    </button>
                  </div>
                </div> */}
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
                          <span className="errors">
                            {validationErrors.firstname}
                          </span>
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
                          <span className="errors">
                            {validationErrors.lastname}
                          </span>
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
                            Specialization{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <span className="errors">
                            {validationErrors.specialization}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating mb-4">
                          {console.log(profileData?.gender)}
                          <select
                            className="form-select"
                            ref={genderRef}
                            defaultValue={profileData?.gender}
                          >
                            {/* {profileData?.gender === "" ? (
                      <option selected disabled>
                        Open this select menu
                      </option>
                    ) : (
                      <option disabled>Open this select menu</option>
                    )} */}

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
                {/**about me */}

                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Education</h4>
                    <div className="education-info" id="education-info">
                      <div className="row form-row education-cont">
                        <div className="col-12 col-md-10 col-lg-11">
                          <div className="row form-row">
                            <div className="col-12 col-md-6 col-lg-4">
                              <div className="form-group">
                                <label>Degree</label>
                              </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                              <div className="form-group">
                                <label>College/Institute</label>
                              </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                              <div className="form-group">
                                <label>Year of Completion</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {education?.map((edu, i) => {
                      return (
                        <div key={i}>
                          <div className="row form-row">
                            <div className="form-group col-11">
                              <div className="row form-row">
                                <div className="form-group col-12 col-md-6 col-lg-4">
                                  <input
                                    name="degree"
                                    className="form-control"
                                    value={edu.degree}
                                    onChange={(e) =>
                                      handleChange(i, "degree", e.target.value)
                                    }
                                  />
                                </div>
                                <div className="form-group col-12 col-md-6 col-lg-4">
                                  <input
                                    className="form-control"
                                    name="college"
                                    value={edu.college}
                                    onChange={(e) =>
                                      handleChange(i, "college", e.target.value)
                                    }
                                  />
                                </div>
                                <div className="form-group col-12 col-md-6 col-lg-4">
                                  <input
                                    className="form-control"
                                    name="year"
                                    value={edu.year}
                                    onChange={(e) =>
                                      handleChange(i, "year", e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-1">
                              {i > 0 && (
                                <button
                                  className=""
                                  onClick={() => removeEducation(i)}
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="btn-box add-more">
                         
                            {education.length - 1 === i && (
                              <a href="javascript:void(0)"
                                className="add-experience"
                                onClick={addEducation}
                              >
                                <i class="fa fa-plus-circle"></i>
                                Add more
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/*award*/}
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Awards</h4>
                    <div class="awards-info" id="awards-info">
                      <div class="row form-row awards-cont">
                        <div class="col-12 col-md-5">
                          <div class="form-group">
                            <label>Awards</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-12 col-md-5">
                          <div class="form-group">
                            <label>Year</label>
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="add-more">
                      <a
                        href="javascript:void(0);"
                        class="add-award"
                        onClick={addAward}
                      >
                        <i class="fa fa-plus-circle"></i> Add More
                      </a>
                    </div>
                  </div>
                </div>
                {/***award** */}

                {/* <!-- /About Me --> */}
                {/* Experience */}
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Experience</h4>
                    <div class="experience-info" id="experience-info">
                      {" "}
                      <div class="row form-row experience-cont">
                        <div class="col-12 col-md-10 col-lg-11">
                          <div class="row form-row">
                            <div class="col-12 col-md-6 col-lg-4">
                              <div class="form-group">
                                <label>Hospital Name</label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4">
                              <div class="form-group">
                                <label>From</label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4">
                              <div class="form-group">
                                <label>To</label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4">
                              <div class="form-group">
                                <label>Designation</label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="add-more">
                      <a
                        href="javascript:void(0);"
                        class="add-experience"
                        onClick={addExperience}
                      >
                        <i class="fa fa-plus-circle"></i> Add More
                      </a>
                    </div>
                  </div>
                </div>
                {/* Experience */}
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
                          <label
                            className="custom-control-label"
                            for="price_custom"
                          >
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
                          <span className="errors">
                            {validationErrors.price}
                          </span>
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
              </Tab>
              <Tab eventKey="availability" title="Availability">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Availability</h4>
                    <div className="row form-row"></div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="calendar" title="Calendar">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Calendar</h4>
                    <div className="row form-row"></div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachProfileSetting;
