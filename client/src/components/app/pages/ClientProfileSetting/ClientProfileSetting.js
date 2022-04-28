import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Toast from "../../../common/toast/Toast";
import {
  getHttpRequest,
  putHttpRequest,
  postHttpRequest,
} from "../../../../axios";
import validate from "../../../../utils/form-validation/authFormValidation";
import { useDispatch, useSelector } from "react-redux";
import { setClientProfile } from "../../../../store/slices/auth";
import imagePath from "../../../../utils/url/imagePath";
import imageExist from "../../../../utils/url/imageExist";
import { setImage } from "../../../../store/slices/auth";
import { AiOutlineCamera } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ClientProfileSetting = () => {
  const mediaPath = process.env.REACT_APP_IMG;
  const userImage = useSelector((state) => state.auth.user.fileName);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const userid = useSelector((state) => state.auth.user.userid);
  const [profileData, setprofileData] = useState({});
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setprofileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleChangePhone = (e) => {
    setprofileData({
      ...profileData,
      phone: e,
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
    putHttpRequest("/front/client/edit", payload)
      .then((res) => {
        setIsLoading(false);

        if (!res) {
          alert("Something went wrong with res...");
          console.log("Something went wrong with res...");
          return;
        }

        if (res.data.success === true) {
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
  };

  useEffect(() => {
    getHttpRequest(`/front/client/get/${userid}`)
      .then((response) => {
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

  const checKImage = async (data) => {
    // console.log(data, 'my dataaaaaaaaaa')
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
          console.log(response, "ressssssssssssssssss");
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

  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="card">
          <div className="card-body">
            <form noValidate onSubmit={updateProfileHandler}>
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
                      className="form-control"
                      placeholder="first name"
                      value={profileData?.firstname}
                      onChange={handleChangeInput}
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
                      className="form-control"
                      placeholder="last name"
                      value={profileData?.lastname}
                      onChange={handleChangeInput}
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
                <div className="col-12 col-md-6">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="bloodgroup"
                      value={profileData?.bloodgroup}
                      onChange={handleChangeInput}
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
                    <PhoneInput
                      defaultCountry={"gb"}
                      inputExtraProps={{
                        name: "phone",
                        required: true,
                        autoFocus: true,
                      }}
                      value={profileData?.phone}
                      onChange={handleChangePhone}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-4">
                    <textarea
                      type="text"
                      name="about"
                      className="form-control"
                      placeholder="about"
                      style={{ minHeight: "150px" }}
                      value={profileData?.about}
                      onChange={handleChangeInput}
                    />
                    <label>Briefly describe about yourself</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="address"
                      name="address"
                      value={profileData?.address}
                      onChange={handleChangeInput}
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
                      className="form-control"
                      placeholder="city"
                      value={profileData?.city}
                      onChange={handleChangeInput}
                    />
                    <label>City</label>
                  </div>
                </div>
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
                  <div className="form-floating mb-4">
                    <input
                      type="postalCode"
                      name="postalCode"
                      className="form-control"
                      placeholder="postalCode"
                      value={profileData?.postalCode}
                      onChange={handleChangeInput}
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
