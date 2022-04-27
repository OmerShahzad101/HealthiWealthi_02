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
import { setImage } from "../../../../store/slices/auth";
import { setCoachProfile, setUser } from "../../../../store/slices/auth";
import Resizer from "react-image-file-resizer";

import Select from "react-select";

const BasicInfo = () => {
  
  const userid = useSelector((state) => state.auth.user.userid);
  const userImage = useSelector((state) => state.auth.user.fileName);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [profileData, setprofileData] = useState({});
  const [services, setServices] = useState([]);
  let payload = { ...profileData };

  const [qualifications, setqualifications] = useState([
    { degree: "", college: "", year: "" },
  ]);

  const [awards, setAwards] = useState([{ award: "", year: "" }]);

  const [experience, setExperience] = useState([
    { companyName: "", dateFrom: "", dateTo: "", designation: "" },
  ]);

  /** Qualification **/
  const addqualifications = () => {
    setqualifications([
      ...qualifications,
      { degree: "", college: "", year: "" },
    ]);
    setprofileData({ ...profileData, qualifications });
  };

  const handleChange = (index, key, value) => {
    if (key === "degree") {
      qualifications[index] = { ...qualifications[index], degree: value };
    } else if (key === "college") {
      qualifications[index] = { ...qualifications[index], college: value };
    } else if (key === "year") {
      qualifications[index] = { ...qualifications[index], year: value };
    }
    const updatedEducation = [...qualifications];
    updatedEducation.splice(index, 1, qualifications[index]);
    setqualifications([...updatedEducation]);
    setprofileData({ ...profileData, qualifications });
  };

  const removeQualification = (i) => {
    if (i) {
      qualifications.splice(i, 1);
      setqualifications([...qualifications]);
      setprofileData({
        ...profileData,
        qualifications,
      });
    }
  };

  /***Awards ***/

  const addAward = () => {
    setAwards([...awards, { award: "", year: "" }]);
  };

  const handleAwardchange = (index, key, value) => {
    if (key === "award") {
      awards[index] = { ...awards[index], award: value };
    } else if (key === "year") {
      awards[index] = { ...awards[index], year: value };
    }
    const updatedAwards = [...awards];
    updatedAwards.splice(index, 1, awards[index]);
    setAwards([...updatedAwards]);
    setprofileData({ ...profileData, awards });
  };

  const removeAward = (i) => {
    if (i) {
      awards.splice(i, 1);
      setAwards([...awards]);
      setprofileData({
        ...profileData,
        awards,
      });
    }
  };

  //Image resize
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });
  /***awards***/

  /*****Experience*****/

  const addExperience = () => {
    setExperience([
      ...experience,
      { companyName: "", dateFrom: "", dateTo: "", designation: "" },
    ]);
    //console.log("exp :", experience);
    setprofileData({ ...profileData, experience });
  };

  const handleExperiencechange = (index, key, value) => {
    //console.log("exp :", experience);

    if (key === "companyName") {
      experience[index] = { ...experience[index], companyName: value };
    } else if (key === "dateFrom") {
      experience[index] = { ...experience[index], dateFrom: value };
    } else if (key === "dateTo") {
      experience[index] = { ...experience[index], dateTo: value };
    } else if (key === "designation") {
      experience[index] = { ...experience[index], designation: value };
    }
    const updateExperience = [...experience];
    updateExperience.splice(index, 1, experience[index]);
    setExperience([...updateExperience]);
    setprofileData({ ...profileData, experience });
  };

  const removeExpirence = (i) => {
    if (i) {
      experience.splice(i, 1);
      setExperience([...experience]);
      setprofileData({
        ...profileData,
        experience,
      });
    }
  };
  /**********/

  const checKImage = async (data) => {
    setTimeout(dispatch(setImage(data)), 9000);

    const exist = await imageExist(data.avatar);
    if (exist) {
      dispatch(setImage(data));
      return true;
    } else {
      checKImage(data);
    }
  };

  const onChangeImage = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      let _objFiles = files[0];

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
      const image = await resizeFile(files[0]);
      const formData = new FormData();
      formData.append("avatar", image, files[0].name);
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
          //console.log("response", response);
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

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setprofileData({
      ...profileData,
      [name]: value,
    });
  };
  const handleChangeInput1 = (e) => {
    const alteredServices = e.map((item) => ({
      label: item.label,
      value: item.value,
    }));
    console.log(alteredServices);
    setprofileData({
      ...profileData,
      services: alteredServices,
    });
  };

  function updateProfileHandler(event) {
    event.preventDefault();

    const errors = validate(payload);
    if (Object.keys(errors).length > 0) {
      setValidationErrors({ ...errors });
      return;
    } else {
      setValidationErrors({});
    }
    setIsLoading(true);

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

  const upgradePackage = () => {
    history.push("/coach-upgrade-profile");
  };

  useEffect(() => {
    getHttpRequest(`/front/coach/get/${userid}`)
      .then((response) => {
        if (!response) {
          console.log("Something went wrong with response...");
          return;
        }

        if (response.data.success === true) {
          if (response?.data?.coach?.qualifications?.length > 0) {
            setqualifications(response?.data?.coach?.qualifications);
          }
          if (response?.data?.coach?.awards?.length > 0) {
            setAwards(response?.data?.coach?.awards);
          }
          if (response?.data?.coach?.experience?.length > 0) {
            setExperience(response?.data?.coach?.experience);
          }
        } else {
          console.log(response.data.message);
        }
        setprofileData(response?.data?.coach);
      })
      .catch(() => {
        console.log("Something went wrong...");
      });

    getservicesList();
  }, []);

  useEffect(() => {
    payload = { ...profileData };
  }, [profileData, experience, awards, qualifications]);

  const getservicesList = async () => {
    getHttpRequest(`/admin/services/list/`)
      .then((response) => {
        if (!response) {
          console.log("Something went wrong with response...");
          return;
        }
        if (response?.data?.success === true) {
          setServices(
            response?.data?.data?.services.map((item) => ({
              value: item._id,
              label: item.name,
            }))
          );
        } else {
          console.log(response.data.message);
        }
      })
      .catch(() => {
        console.log("Something went wrong...");
      });
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Basic Information</h4>
          <div className="row form-row">
            <div className="col-md-12">
              <div className="imageUploaderWrapper profile-img">
                <div className="circle">
                  {<img src={imagePath(userImage)} alt="user img" />}
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
                  className="form-control"
                  placeholder="Email"
                  value={profileData?.firstname}
                  onChange={handleChangeInput}
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
                  className="form-control"
                  placeholder="Last Name"
                  value={profileData?.lastname || ""}
                  onChange={handleChangeInput}
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
                  className="form-control"
                  placeholder="specialization"
                  value={profileData?.specialization || ""}
                  onChange={handleChangeInput}
                />
                <label>
                  Specialization <span className="text-danger">*</span>
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
                  name="gender"
                  value={profileData?.gender}
                  onChange={handleChangeInput}
                >
                  <option value="" disabled>
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
            <div className="col-md-6">
              <div className="form-floating mb-4">
                {/* {console.log(
                  profileData?.services ? profileData?.services : "",
                  "services select2"
                )} */}
                <Select
                  className="form-select2"
                  value={profileData?.services}
                  isMulti={true}
                  name="services"
                  onChange={handleChangeInput1}
                  options={services}
                  placeholder="Services"
                />
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
              className="form-control"
              placeholder="about"
              style={{ minHeight: "150px" }}
              value={profileData?.about}
              onChange={handleChangeInput}
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
                              handleChange(i, "degree", e.target.value)
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
                              handleChange(i, "college", e.target.value)
                            }
                          />
                        </div>
                        <div className="form-group col-12 col-md-6 col-lg-4">
                          <label>Year of Completion</label>
                          <input
                            type="number"
                            className="form-control"
                            name="year"
                            maxLength={5}
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
                        onClick={() => removeQualification(i)}
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
                            handleAwardchange(i, "award", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group col-12 col-md-6 col-lg-6">
                        <label>Year</label>
                        <input
                          className="form-control"
                          name="year"
                          type="number"
                          maxlength="4"
                          defaultValue={edu.year}
                          onChange={(e) =>
                            handleAwardchange(i, "year", e.target.value)
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
                          type="number"
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
                          type="number"
                          className="form-control"
                          defaultValue={exp.dateTo}
                          onChange={(e) =>
                            handleExperiencechange(i, "dateTo", e.target.value)
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
                <label className="custom-control-label" htmlFor="price_custom">
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
                  className="form-control"
                  placeholder="price"
                  value={profileData?.price}
                  onChange={handleChangeInput}
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
  );
};

export default BasicInfo;
