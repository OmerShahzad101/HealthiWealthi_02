import React from "react";
import { Link } from "react-router-dom";

const CoachSideBar = () => {
  return (
      <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
        <div className="profile-sidebar">
          <div className="widget-profile pro-widget-content">
            <div className="profile-info-widget">
              <a href="#" className="booking-doc-img">
                <img
                  src="/assets/img/doctors/doctor-01.jpg"
                  alt="User Image"
                />
              </a>
              <div className="profile-det-info">
                <h3>Dr. Darren Elder</h3>

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
                <li className="active">
                  <Link to="/coach-dashboard">
                    <i className="fas fa-columns"></i>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/appointments">
                    <i className="fas fa-calendar-check"></i>
                    <span>Appointments</span>
                  </Link>
                </li>
                <li>
                  <Link to="/my-clients">
                    <i className="fas fa-user-injured"></i>
                    <span>My Clients</span>
                  </Link>
                </li>
                <li>
                  <Link to="/invoices-view">
                    <i className="fas fa-file-invoice"></i>
                    <span>Invoices</span>
                  </Link>
                </li>
                <li>
                  <Link to="/reviews">
                    <i className="fas fa-star"></i>
                    <span>Reviews</span>
                  </Link>
                </li>
                <li>
                  <Link to="/chat">
                    <i className="fas fa-comments"></i>
                    <span>Message</span>
                    <small className="unread-msg">23</small>
                  </Link>
                </li>
                <li>
                  <Link to="/videocall">
                    <i className="fas fa-comments"></i>
                    <span>Video Call</span>
                  </Link>
                </li>
                <li>
                  <Link to="/audiocall">
                    <i className="fas fa-comments"></i>
                    <span>Voice Call</span>
                  </Link>
                </li>
                <li>
                  <Link to="/coach-profile-setting">
                    <i className="fas fa-user-cog"></i>
                    <span>Profile Settings</span>
                  </Link>
                </li>

                <li>
                  <Link to="/coach-change-password">
                    <i className="fas fa-lock"></i>
                    <span>Change Password</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
  );
};

export default CoachSideBar;