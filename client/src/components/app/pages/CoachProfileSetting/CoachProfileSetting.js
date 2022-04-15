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
import { setCoachProfile, setUser } from "../../../../store/slices/auth";
import CoachCalendar from "../Calendar/CoachCalendar";
import ClientCalendar from "../Calendar/ClientCalendar";
import ContactDetails from "./ContactDetails";

const CoachProfileSetting = () => {
  const mediaPath = process.env.REACT_APP_IMG;
  const [key, setKey] = useState("user-info");

  const [qualifications, setqualifications] = useState([
    { degree: " ", college: " ", year: " " },
  ]);
  const addqualifications = () => {
    setqualifications([
      ...qualifications,
      { degree: "", college: "", year: "" },
    ]);
    console.log("qualifications", qualifications);
  };
  const handleChange = (index, key, value) => {
    let updatedKeyValue;

    const keyValue = qualifications[index]; // obj{}
    if (key === "degree") {
      updatedKeyValue = { ...keyValue, degree: value };
    } else if (key === "college") {
      updatedKeyValue = { ...keyValue, college: value };
    } else if (key === "year") {
      updatedKeyValue = { ...keyValue, year: value };
    }
    const updatedEducation = [...qualifications];
    updatedEducation.splice(index, 1, updatedKeyValue);
    setqualifications([...updatedEducation]);
    console.log("qualifications is updated ", qualifications);
  };
  const removeEducation = (i) => {
    console.log("index ", i);

    if (i) {
      const newArray = [...qualifications];
      const updatedEducation = newArray.splice(i, 1);
      console.log("newArray  ", i, updatedEducation);
      setqualifications([...newArray]);
    }
  };
  /** Education **/
  /***awards ***/
  const [awards, setAwards] = useState([{ award: "", year: "" }]);

  const addAward = () => {
    setAwards([...awards, { award: "", year: "" }]);
    console.log("Awards", awards);
  };
  const handleAwardchange = (index, key, value) => {
    let updatedKeyValue;

    const keyValue = awards[index];
    if (key === "award") {
      updatedKeyValue = { ...keyValue, award: value };
    } else if (key === "year") {
      updatedKeyValue = { ...keyValue, year: value };
    }
    const updatedAwards = [...awards];
    updatedAwards.splice(index, 1, updatedKeyValue);
    setAwards([...updatedAwards]);
    console.log("Awards is updated ", awards);
  };
  const removeAward = (i) => {
    if (i) {
      const newArray = [...awards];
      const updateAwards = newArray.splice(i, 1);
      console.log("newArray", i, updateAwards);
      setAwards([...newArray]);
    }
  };
  /***awards***/
  /*****Experience*****/
  const [experience, setExperience] = useState([
    { companyName: "", dateFrom: "", dateTo: "", designation: "" },
  ]);

  const addExperience = () => {
    setExperience([
      ...experience,
      { companyName: "", dateFrom: "", dateTo: "", designation: "" },
    ]);
    console.log("experience", experience);
  };

  const handleExperiencechange = (index, key, value) => {
    let updatedKeyValue;

    const keyValue = experience[index];
    if (key === "companyName") {
      updatedKeyValue = { ...keyValue, companyName: value };
    } else if (key === "dateFrom") {
      updatedKeyValue = { ...keyValue, dateFrom: value };
    } else if (key === "dateTo") {
      updatedKeyValue = { ...keyValue, dateTo: value };
    } else if (key === "designation") {
      updatedKeyValue = { ...keyValue, designation: value };
    }
    const updateExperience = [...experience];
    updateExperience.splice(index, 1, updatedKeyValue);
    setExperience([...updateExperience]);
    console.log("experience is updated ", experience);
  };
  const removeExpirence = (i) => {
    if (i) {
      const newArray = [...experience];
      const updateAwards = newArray.splice(i, 1);
      console.log("newArray", i, updateAwards);
      setExperience([...newArray]);
    }
  };
  const userInfo = useSelector((state) => state.user.avatar);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const userid = useSelector((state) => state.auth.user.userid);
  const [profileData, setprofileData] = useState({});
  const specializationRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
 
  const genderRef = useRef();
  const aboutRef = useRef();
 
  const priceRef = useRef();
  const degree = useRef();
  const institute = useRef();
  const yearOfCompletion = useRef();
  const checKImage = async (data) => {
    // console.log(data, 'my dataaaaaaaaaa')
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
      // console.log(_objFiles);

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
      setIsLoading(true);
      postHttpRequest(`/front/coach/uploadImage/${userid}`, formData, config)
        .then((response) => {
          if (!response) {
            console.log("Something went wrong with response...");
            return;
          }
          console.log(response, 'ressssssssssssssssss');
          console.log("response", response);
          if (response.data.success === true) {
            setValidationErrors({});

            checKImage(response.data.file);
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
    
    const gender = genderRef.current.value;
    const about = aboutRef.current.value;
  
    const price = priceRef.current.value;


    const payload = {
      specialization,
      firstname,
      lastname,
     
      gender,
      about,
    
      price,
    
      awards,
      experience,
      
      _id: userid,
      qualifications,
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
          // dispatch(setUser(response));
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

  const upgradePackage = () => {
    history.push("/coach-upgrade-profile");
  };

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
          if (response?.data?.coach?.qualifications.length > 0) {
            setqualifications(response?.data?.coach?.qualifications);
          }
          if (response?.data?.coach?.experience.length > 0) {
            setExperience(response?.data?.coach?.experience);
          }
          if (response?.data?.coach?.awards.length > 0) {
            setAwards(response?.data?.coach?.awards);
          }
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
              id="controlled-tab-example"
              className="nav-tabs-bottom nav-justified"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="user-info" title="Basic">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Basic Information</h4>
                    <div className="row form-row">
                      <div className="col-md-12">
                        <div className="imageUploaderWrapper profile-img">
                          <div className="circle">
                            {userInfo && (
                              <img
                                src={imagePath(userInfo)}
                                alt="user img"
                              />
                            )}
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
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating mb-4">
                          <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="username"
                            defaultValue={profileData?.username}
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
                            defaultValue={profileData?.email}
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
                            defaultValue={profileData?.firstname || ""}
                          />
                          <label>
                            First Name <span className="text-danger">*</span>
                          </label>
                          <span className="errors">
                            {validationErrors.firstname || ""}
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
                            defaultValue={profileData?.lastname || ""}
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
                            defaultValue={profileData?.specialization || ""}
                          />
                          <label>
                            Specialization{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <span className="errors">
                            {validationErrors.specialization || ""}
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
                    <h4 className="card-title">Qualification</h4>

                    {qualifications?.map((edu, i) => {
                      return (
                        <div key={i}>
                          <div className="row form-row">
                            {
                              <div className="form-group col-11">
                                <div className="row form-row">
                                  <div className="form-group col-12 col-md-6 col-lg-4">
                                    <label>Degree</label>
                                    <input
                                      name="degree"
                                      className="form-control"
                                      defaultValue={edu.degree}
                                      onChange={(e) =>
                                        handleChange(
                                          i,
                                          "degree",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-12 col-md-6 col-lg-4">
                                    <label>College/Institute</label>
                                    <input
                                      className="form-control"
                                      name="college"
                                      defaultValue={edu.college}
                                      onChange={(e) =>
                                        handleChange(
                                          i,
                                          "college",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-12 col-md-6 col-lg-4">
                                    <label>Year of Completion</label>
                                    <input
                                      className="form-control"
                                      name="year"
                                      defaultValue={edu.year}
                                      onChange={(e) =>
                                        handleChange(i, "year", e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            }
                            <div className="col-1">
                              {i > 0 && (
                                <a
                                  className="btn btn-danger trash "
                                  onClick={() => removeEducation(i)}
                                >
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="btn-box add-more">
                            {qualifications.length - 1 === i && (
                              <a
                                href="#javascript"
                                className="add-experience"
                                onClick={addqualifications}
                              >
                                <i className="fa fa-plus-circle"></i>
                                Add more
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/***award** */}

                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Awards</h4>

                    {awards?.map((edu, i) => {
                      return (
                        <div key={i}>
                          <div className="row form-row">
                            <div className="form-group col-11">
                              <div className="row form-row">
                                <div className="form-group col-12 col-md-6 col-lg-6">
                                  <label>Award</label>
                                  <input
                                    name="award"
                                    className="form-control"
                                    defaultValue={edu.award}
                                    onChange={(e) =>
                                      handleAwardchange(
                                        i,
                                        "award",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="form-group col-12 col-md-6 col-lg-6">
                                  <label>Year</label>
                                  <input
                                    className="form-control"
                                    name="year"
                                    defaultValue={edu.year}
                                    onChange={(e) =>
                                      handleAwardchange(
                                        i,
                                        "year",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-1">
                              {i > 0 && (
                                <a
                                  className="btn btn-danger trash"
                                  onClick={() => removeAward(i)}
                                >
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="btn-box add-more">
                            {awards.length - 1 === i && (
                              <a
                                href="#javascript"
                                className="add-award"
                                onClick={addAward}
                              >
                                <i className="fa fa-plus-circle"></i>
                                Add more
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Experience */}

                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Experience</h4>
                    {experience?.map((exp, i) => {
                      return (
                        <div key={i}>
                          <div className="row form-row">
                            <div className="form-group col-11">
                              <div className="row form-row">
                                <div className="form-group col-12 col-md-6 col-lg-4">
                                  <label>Institute Name</label>
                                  <input
                                    name="companyName"
                                    className="form-control"
                                    defaultValue={exp.companyName}
                                    onChange={(e) =>
                                      handleExperiencechange(
                                        i,
                                        "companyName",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="form-group col-12 col-md-6 col-lg-4">
                                  <label>From </label>
                                  <input
                                    name="dateFrom"
                                    className="form-control"
                                    defaultValue={exp.dateFrom}
                                    onChange={(e) =>
                                      handleExperiencechange(
                                        i,
                                        "dateFrom",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="form-group col-12 col-md-6 col-lg-4">
                                  <label>To</label>
                                  <input
                                    name="dateTo"
                                    className="form-control"
                                    defaultValue={exp.dateTo}
                                    onChange={(e) =>
                                      handleExperiencechange(
                                        i,
                                        "dateTo",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="form-group col-12 col-md-6 col-lg-4">
                                  <label>Designation</label>
                                  <input
                                    name="designation"
                                    className="form-control"
                                    defaultValue={exp.designation}
                                    onChange={(e) =>
                                      handleExperiencechange(
                                        i,
                                        "designation",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-1">
                              {i > 0 && (
                                <a
                                  className="btn btn-danger trash"
                                  onClick={() => removeExpirence(i)}
                                >
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="btn-box add-more">
                            {experience.length - 1 === i && (
                              <a
                                href="#javascript"
                                className="add-award"
                                onClick={addExperience}
                              >
                                <i className="fa fa-plus-circle"></i>
                                Add more
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Experience */}

                {/* <!-- Contact Details --> */}
               
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
                            htmlFor="price_custom"
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
                    <h4 className="card-title">Trainer Schedule</h4>
                    <div className="row form-row">
                      {" "}
                      <CoachCalendar availabilityTab={key} />
                    </div>
                  </div>
                </div>
              </Tab>
              {/* <Tab eventKey="calendar" title="Calendar">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Calendar</h4>
                    <div className="row form-row">
                      <ClientCalendar />
                    </div>
                  </div>
                </div>
              </Tab> */}
              <Tab eventKey="contact" title="Contact Details">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Contact Details</h4>
                    <div className="row form-row">
                      {" "}
                      <ContactDetails />
                    </div>
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
