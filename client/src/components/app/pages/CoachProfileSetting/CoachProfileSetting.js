import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
<<<<<<< HEAD
=======
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
import { setInfoData } from "../../../../store/slices/user";

const CoachProfileSetting = () => {
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

      setIsLoading(true);
      postHttpRequest(`/front/coach/uploadImage/${userid}`, formData, config)
        .then((response) => {
          if (!response) {
            console.log("Something went wrong with response...");
            return;
          }
          console.log("in then");
          if (response.data.success === true) {
            setValidationErrors({});
            // Update user data as well in the Redux store
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
>>>>>>> caea850ca149867381bbc128e6e4139a4ab0029b

const CoachProfileSetting = () => {

  const history = useHistory();

  const Upgrade = () => {
    history.push("/coach-upgrade-profile")
    console.log("dssd")
  }
  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        {/* <!-- Basic Information --> */}
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Basic Information</h4>
            <div className="row form-row">
              <div className="col-md-12">
<<<<<<< HEAD
                <div className="form-group">
=======
                <div className="imageUploaderWrapper profile-img">
                  <div className="circle">
                    {userInfo && (
                      <img src={imagePath(userInfo.avatar)} alt="user img" />
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
>>>>>>> caea850ca149867381bbc128e6e4139a4ab0029b
                  <div className="change-avatar">
                    <div className="profile-img">
                      <img
                        src="assets/img/doctors/doctor-thumb-02.jpg"
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
<<<<<<< HEAD
                    <button className="change-account"
                      onClick={Upgrade}
                    >
=======
                    <button className="change-account" onClick={upgradePackage}>
>>>>>>> caea850ca149867381bbc128e6e4139a4ab0029b
                      Upgrade Account
                    </button>
                  </div>
                </div> */}
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Username <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" readonly />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Email <span className="text-danger">*</span>
                  </label>
                  <input type="email" className="form-control" readonly />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Gender</label>
                  <select className="form-control select">
                    <option>Select</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-0">
                  <label>Date of Birth</label>
                  <input type="text" className="form-control" />
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
              <textarea className="form-control" rows="5"></textarea>
            </div>
          </div>
        </div>
        {/* <!-- /About Me --> */}

        {/* <!-- Clinic Info --> */}
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Clinic Info</h4>
            <div className="row form-row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Clinic Name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Clinic Address</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label>Clinic Images</label>
                  <form action="#" className="dropzone"></form>
                </div>
                <div className="upload-wrap">
                  <div className="upload-images">
                    <img
                      src="assets/img/features/feature-06.jpg"
                      alt="Upload Image"
                    />
                    <a href="#" className="btn btn-icon btn-danger btn-sm">
                      <i className="far fa-trash-alt"></i>
                    </a>
                  </div>
                  <div className="upload-images">
                    <img
                      src="assets/img/features/feature-05.jpg"
                      alt="Upload Image"
                    />
                    <a href="#" className="btn btn-icon btn-danger btn-sm">
                      <i className="far fa-trash-alt"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Clinic Info --> */}

        {/* <!-- Contact Details --> */}
        <div className="card contact-card">
          <div className="card-body">
            <h4 className="card-title">Contact Details</h4>
            <div className="row form-row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Address Line 1</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="control-label">Address Line 2</label>
                  <input type="text" className="form-control" />
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
                  <input type="text" className="form-control" />
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
                  <input
                    type="radio"
                    id="price_free"
                    name="rating_option"
                    className="custom-control-input"
                    value="price_free"
                    checked
                  />
                  <label className="custom-control-label" for="price_free">
                    Free
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="price_custom"
                    name="rating_option"
                    value="custom_price"
                    className="custom-control-input"
                  />
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
                  name="custom_rating_count"
                  value=""
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

        {/* <!-- Memberships --> */}
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Memberships</h4>
            <div className="membership-info">
              <div className="row form-row membership-cont">
                <div className="col-12 col-md-10 col-lg-5">
                  <div className="form-group">
                    <label>Memberships</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
            <div className="add-more">
              <a href="#" className="add-membership">
                <i className="fa fa-plus-circle"></i> Add More
              </a>
            </div>
          </div>
        </div>
        {/* <!-- /Memberships --> */}

        {/* <!-- Registrations --> */}
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Registrations</h4>
            <div className="registrations-info">
              <div className="row form-row reg-cont">
                <div className="col-12 col-md-5">
                  <div className="form-group">
                    <label>Registrations</label>
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
              <a href="#" className="add-reg">
                <i className="fa fa-plus-circle"></i> Add More
              </a>
            </div>
          </div>
        </div>
        {/* <!-- /Registrations --> */}

        <div className="submit-section submit-btn-bottom">
          <button type="submit" className="btn btn-primary submit-btn">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default CoachProfileSetting;
