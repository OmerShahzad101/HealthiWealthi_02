import React from "react";
import { Link } from "react-router-dom";
const MyClient = () => {
  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="row row-grid">
          <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="card widget-profile pat-widget-profile">
              <div className="card-body">
                <div className="pro-widget-content">
                  <div className="profile-info-widget">
                    <Link to="/client-profile" className="booking-doc-img">
                      <img
                        src="assets/img/patients/patient.jpg"
                        alt="User Image"
                      />
                    </Link>{" "}
                    <div className="profile-det-info">
                      <h3>
                        <Link to="/client-profile">Richard Wilson</Link>
                      </h3>

                      <div className="patient-details">
                        <h5>
                          <b>Client ID :</b> P0016
                        </h5>
                        <h5 className="mb-0">
                          <i className="fas fa-map-marker-alt"></i> Alabama, USA
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="patient-info">
                  <ul>
                    <li>
                      Phone <span>+1 952 001 8563</span>
                    </li>
                    <li>
                      Age <span>38 Years, Male</span>
                    </li>
                    <li>
                      Blood Group <span>AB+</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="card widget-profile pat-widget-profile">
              <div className="card-body">
                <div className="pro-widget-content">
                  <div className="profile-info-widget">
                    <Link to="client-profile" className="booking-doc-img">
                      <img
                        src="assets/img/patients/patient1.jpg"
                        alt="User Image"
                      />
                    </Link>{" "}
                    <div className="profile-det-info">
                      <h3>
                        <Link to="/client-profile">Charlene Reed</Link>
                      </h3>

                      <div className="patient-details">
                        <h5>
                          <b>Client ID :</b> P0001
                        </h5>
                        <h5 className="mb-0">
                          <i className="fas fa-map-marker-alt"></i> North
                          Carolina, USA
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="patient-info">
                  <ul>
                    <li>
                      Phone <span>+1 828 632 9170</span>
                    </li>
                    <li>
                      Age <span>29 Years, Female</span>
                    </li>
                    <li>
                      Blood Group <span>O+</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="card widget-profile pat-widget-profile">
              <div className="card-body">
                <div className="pro-widget-content">
                  <div className="profile-info-widget">
                    <a href="#" className="booking-doc-img">
                      <img
                        src="assets/img/patients/patient2.jpg"
                        alt="User Image"
                      />
                    </a>
                    <div className="profile-det-info">
                      <h3>Travis Trimble </h3>
                      <div className="patient-details">
                        <h5>
                          <b>Client ID :</b> PT0002
                        </h5>
                        <h5 className="mb-0">
                          <i className="fas fa-map-marker-alt"></i> Maine, USA
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="patient-info">
                  <ul>
                    <li>
                      Phone <span>+1 207 729 9974</span>
                    </li>
                    <li>
                      Age <span>23 Years, Male</span>
                    </li>
                    <li>
                      Blood Group <span>B+</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyClient;
