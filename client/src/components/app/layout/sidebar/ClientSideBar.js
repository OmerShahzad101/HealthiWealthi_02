import { NavLink, useLocation } from "react-router-dom";
import logout from "./../../../../utils/auth/logout";
import { useDispatch, useSelector } from "react-redux";
import imagePath from "../../../../utils/url/imagePath";
import { useEffect } from "react";
import { getHttpRequest } from "../../../../axios";
import { setImage } from "../../../../store/slices/auth";
const ClientSideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let data;
  const user = useSelector((state) => state.auth.user);
  console.log("userclient=", user);
  const userImage = useSelector((state) => state.auth.user.fileName);
  const clientProfile = useSelector((state) => state.auth.clientProfile);
  console.log("clientProfile", clientProfile);
  if (clientProfile.firstName || clientProfile.lastName) {
    data = clientProfile;
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

  if (location.pathname == "/app/chat") {
    return "";
  }

  return (
    <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
      <div className="profile-sidebar">
        <div className="widget-profile pro-widget-content">
          <div className="profile-info-widget">
            <a href="#" className="booking-doc-img">
              
              <img src={imagePath(userImage)} alt="User Image" />
            </a>
            <div className="profile-det-info">
              <h3>
                {data?.firstName} {data?.lastName}
              </h3>
              <div className="patient-details">
                <h5 className="mb-0">
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {data?.country || data?.city
                    ? data?.country + " " + data?.city
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
                <NavLink to="/app/client-dashboard">
                  <i className="fas fa-columns"></i>
                  <span>Dashboard</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/app/client-profile-setting">
                  <i className="fas fa-user-cog"></i>
                  <span>Profile Settings</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/app/chat">
                  <i className="fas fa-comments"></i>
                  <span>Chat</span>
                  {/* <small className="unread-msg">23</small> */}
                </NavLink>
              </li>
              <li>
                <NavLink to="/search-coach">
                  <i className="fas fa-search"></i>
                  <span>Booking</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/favourites">
                  <i className="fas fa-bookmark"></i>
                  <span>Favourites</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/add-reviews">
                  <i className="fas fa-star"></i>
                  <span>Reviews</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/client-change-password">
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

export default ClientSideBar;
