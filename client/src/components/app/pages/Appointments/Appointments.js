import React from "react";
import { Link } from "react-router-dom";

const Appointments = () => {
  return (
    <div className="main-wrapper">
      {/* <!-- Breadcrumb --> */}
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Appointments
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Appointments</h2>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Breadcrumb --> */}
      {/* <!-- Page Content --> */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
          <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <div className="profile-sidebar">
                <div className="widget-profile pro-widget-content">
                  <div className="profile-info-widget">
                    <a href="#" className="booking-doc-img">
                      <img
                        src="assets/img/doctors/doctor-thumb-02.jpg"
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
                      <li >
                        <Link to="/coach-dashboard">
                          <i className="fas fa-columns"></i>
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li className="active">
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
                      {/* <li>
                        <a href="schedule-timings.html">
                          <i className="fas fa-hourglass-start"></i>
                          <span>Schedule Timings</span>
                        </a>
                      </li> */}
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
                      {/* <li>
                        <Link to="/social-media">
                          <i className="fas fa-share-alt"></i>
                          <span>Social Media</span>
                        </Link>
                      </li> */}
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

            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="appointments">
                {/* <!-- Appointment List --> */}
                <div className="appointment-list">
                  <div className="profile-info-widget">
                    <Link to="client-dashboard" className="booking-doc-img">
                      <img
                        src="assets/img/patients/patient.jpg"
                        alt="User Image"
                      />
                    </Link>
                    <div className="profile-det-info">
                      <h3>
                        <Link to="client-dashboard">Richard Wilson</Link>
                      </h3>
                      <div className="patient-details">
                        <h5>
                          <i className="far fa-clock"></i> 14 Nov 2019, 10.00 AM
                        </h5>
                        <h5>
                          <i className="fas fa-map-marker-alt"></i> Newyork, United
                          States
                        </h5>
                        <h5>
                          <i className="fas fa-envelope"></i> richard@example.com
                        </h5>
                        <h5 className="mb-0">
                          <i className="fas fa-phone"></i> +1 923 782 4575
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="appointment-action">
                    <a
                      href="#"
                      className="btn btn-sm bg-info-light"
                      data-toggle="modal"
                      data-target="#appt_details"
                    >
                      <i className="far fa-eye"></i> View
                    </a>
                    <a
                      href="#;"
                      className="btn btn-sm bg-success-light"
                    >
                      <i className="fas fa-check"></i> Accept
                    </a>
                    <a
                      href="#;"
                      className="btn btn-sm bg-danger-light"
                    >
                      <i className="fas fa-times"></i> Cancel
                    </a>
                  </div>
                </div>
                {/* <!-- /Appointment List --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Page Content --> */}
    </div>
  );
};

export default Appointments;
