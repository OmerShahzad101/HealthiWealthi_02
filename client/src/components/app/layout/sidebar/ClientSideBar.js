import React from 'react';
import { NavLink } from 'react-router-dom';

const ClientSideBar = () => {
    return (
        <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
        <div className="profile-sidebar">
          <div className="widget-profile pro-widget-content">
            <div className="profile-info-widget">
              <a href="#" className="booking-doc-img">
                <img
                  src="/assets/img/patients/patient.jpg"
                  alt="User Image"
                />
              </a>
              <div className="profile-det-info">
                <h3>Richard Wilson</h3>
                <div className="patient-details">
                  <h5>
                    <i className="fas fa-birthday-cake"></i> 24 Jul 1983,
                    38 years
                  </h5>
                  <h5 className="mb-0">
                    <i className="fas fa-map-marker-alt"></i> Newyork, USA
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
                  <NavLink to="/app/favourites">
                    <i className="fas fa-bookmark"></i>
                    <span>Client Longevity Club</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/app/favourites">
                    <i className="fas fa-bookmark"></i>
                    <span>Favourites</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/app/chat">
                    <i className="fas fa-comments"></i>
                    <span>Message</span>
                    <small className="unread-msg">23</small>
                  </NavLink>
                </li>
                <li>
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
                </li>
                <li>
                  <NavLink to="/app/client-profile-setting">
                    <i className="fas fa-user-cog"></i>
                    <span>Profile Settings</span>
                  </NavLink>
                </li>
                <li>
                    
                  <NavLink to="/app/client-change-password">
                    <i className="fas fa-lock"></i>
                    <span>Change Password</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/qwerty">
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