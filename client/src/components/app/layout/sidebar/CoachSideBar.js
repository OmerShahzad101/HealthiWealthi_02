import { NavLink } from "react-router-dom";
import logout from "./../../../../utils/auth/logout";
import imagePath from "../../../../utils/url/imagePath";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getHttpRequest } from "../../../../axios";
import { useEffect } from "react";
import { setImage } from "../../../../store/slices/auth";
import { Toast  } from "../../../common/toast/Toast";

const CoachSideBar = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  let data;
  const user = useSelector((state) => state.auth.user);
  const userImage = useSelector((state) => state.auth.user.fileName);
  const coachProfile = useSelector((state) => state.auth.coachProfile);
  console.log("coachProfile", coachProfile);
  if (coachProfile.firstName || coachProfile.lastName) {
    data = coachProfile;
  } else {
    data = user;
  }

  const getProfilePic = async () => {
    const { data } = await getHttpRequest("front/coach/getImage");
    dispatch(setImage(data.user.fileName));
  };
  

  useEffect(() => {
    getProfilePic();
  }, []);

  const imageUpload = () => {};
  if (location.pathname == "/app/chat") {
    return "";
  }
  return (
    <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
      <div className="profile-sidebar">
        <div className="widget-profile pro-widget-content">
          <div className="profile-info-widget">
            <a href="#" className="booking-doc-img">
              {userImage?.length > 20 ? (
                <img src={userImage} alt="User Image" />
              ) : (
                <img src={imagePath(userImage)} alt="User Image" />
              )}{" "}
            </a>
            <div className="profile-det-info">
              <h3>
                {data.firstName} {data.lastName}
              </h3>

              <div className="patient-details">
                {/* <h5 className="mb-0">{data.specialization}</h5> */}
              </div>

              <div className="patient-details">
                <h5 className="mb-0">
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {data?.country || data?.city
                    ? data?.country + ", " + data?.city
                    : "No Location Setup"}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-widget">
          <nav className="dashboard-menu">
            <ul>
              <li>
                <NavLink to="/app/notifications">
                  <i className="fas fa-bell"></i>
                  <span>Notifications</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/coach-dashboard">
                  <i className="fas fa-columns"></i>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/coach-profile-setting">
                  <i className="fas fa-user-cog"></i>
                  <span>Profile Settings</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/appointments">
                  <i className="fas fa-calendar-check"></i>
                  <span>Appointments</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/my-clients">
                  <i className="fas fa-user-injured"></i>
                  <span>My Clients</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/app/reviews">
                  <i className="fas fa-star"></i>
                  <span>Reviews</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/chat">
                  <i className="fas fa-comments"></i>
                  <span>Chat</span>
                  {/* <small className="unread-msg">23</small> */}
                </NavLink>
              </li>
              {/* <li>
                  <NavLink to="/app/videocall">
                    <i className="fas fa-comments"></i>
                    <span>Video Call</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/app/audiocall">
                    <i className="fas fa-comments"></i>
                    <span>Voice Call</span>
                  </NavLink>
                </li> */}

              <li>
                <NavLink to="/app/coach-change-password">
                  <i className="fas fa-lock"></i>
                  <span>Change Password</span>
                </NavLink>
              </li>
              <li>
                <NavLink onClick={logout} to="/logout">
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default CoachSideBar;
