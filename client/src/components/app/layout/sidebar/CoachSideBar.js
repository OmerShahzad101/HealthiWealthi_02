import { NavLink } from "react-router-dom";
import logout from './../../../../utils/auth/logout'

const CoachSideBar = () => {

  return (
      <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
        <div className="profile-sidebar">
          <div className="widget-profile pro-widget-content">
            <div className="profile-info-widget">
              <a href="#" className="booking-doc-img">
                <img
                  src="/assets/img/doctors/doctor-02.jpg"
                  alt="User Image"
                />
              </a>
              <div className="profile-det-info">
                <h3>Dr. Omer Shahzad</h3>

                <div className="patient-details">
                  <h5 className="mb-0">
                    Donec sollicitudin molestie malesuada.
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-widget">
            <nav className="dashboard-menu">
              <ul>
                <li>
                  <NavLink to="/app/coach-dashboard">
                    <i className="fas fa-columns"></i>
                    <span>Dashboard</span>
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
                  <NavLink to="/app/invoices-view">
                    <i className="fas fa-file-invoice"></i>
                    <span>Invoices</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/app/reviews">
                    <i className="fas fa-star"></i>
                    <span>Reviews</span>
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink to="/app/chat">
                    <i className="fas fa-comments"></i>
                    <span>Message</span>
                    <small className="unread-msg">23</small>
                  </NavLink>
                </li> */}
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
                  <NavLink to="/app/coach-profile-setting">
                    <i className="fas fa-user-cog"></i>
                    <span>Profile Settings</span>
                  </NavLink>
                </li>

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
