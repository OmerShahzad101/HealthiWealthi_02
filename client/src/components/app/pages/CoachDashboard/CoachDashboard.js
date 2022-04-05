import React from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
const CoachDashboard = () => {
  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="row">
          <div className="col-md-12">
            <div className="card dash-card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 col-lg-4">
                    <div className="dash-widget dct-border-rht">
                      <div className="circle-bar circle-bar1">
                        <div className="circle-graph1" data-percent="75">
                          <img
                            src="/assets/img/icon-01.png"
                            className="img-fluid"
                            alt="patient"
                          />
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h6>Total Clients</h6>
                        <h3>1500</h3>
                        <p className="text-muted">Till Today</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-4">
                    <div className="dash-widget dct-border-rht">
                      <div className="circle-bar circle-bar2">
                        <div className="circle-graph2" data-percent="65">
                          <img
                            src="/assets/img/icon-02.png"
                            className="img-fluid"
                            alt="Patient"
                          />
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h6>Today Clients</h6>
                        <h3>160</h3>
                        <p className="text-muted">06, Nov 2019</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-4">
                    <div className="dash-widget">
                      <div className="circle-bar circle-bar3">
                        <div className="circle-graph3" data-percent="50">
                          <img
                            src="/assets/img/icon-03.png"
                            className="img-fluid"
                            alt="Patient"
                          />
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h6>Appoinments</h6>
                        <h3>85</h3>
                        <p className="text-muted">06, Apr 2019</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h4 className="mb-4">Client Appoinment</h4>
            <div className="appointment-tab">
              <Tabs
                defaultActiveKey="upcoming-appointments"
                id="uncontrolled-tab-example"
                className="nav-tabs-solid nav-tabs-rounded"
              >
                <Tab eventKey="upcoming-appointments" title="Upcoming">
                  <div className="card card-table mb-0">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                          <thead>
                            <tr>
                              <th>Client Name</th>
                              <th>Appt Date</th>
                              <th>Purpose</th>
                              <th>Type</th>
                              <th className="text-center">Paid Amount</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    to="/client-profile"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="/assets/img/patients/patient.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <Link to="/client-profile">
                                    Richard Wilson <span>#PT0016</span>
                                  </Link>
                                </h2>
                              </td>
                              <td>
                                11 Nov 2019{" "}
                                <span className="d-block text-info">
                                  10.00 AM
                                </span>
                              </td>
                              <td>General</td>
                              <td>New Client</td>
                              <td className="text-center">$150</td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>

                                  <a
                                    href="#"
                                    className="btn btn-sm bg-success-light"
                                  >
                                    <i className="fas fa-check"></i> Accept
                                  </a>
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-danger-light"
                                  >
                                    <i className="fas fa-times"></i> Cancel
                                  </a>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    to="/client-profile"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="/assets/img/patients/patient3.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <Link to="/client-profile">
                                    Carl Kelly <span>#PT0003</span>
                                  </Link>
                                </h2>
                              </td>
                              <td>
                                30 Oct 2019{" "}
                                <span className="d-block text-info">
                                  9.00 AM
                                </span>
                              </td>
                              <td>General</td>
                              <td>Old Client</td>
                              <td className="text-center">$100</td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>

                                  <a
                                    href="#"
                                    className="btn btn-sm bg-success-light"
                                  >
                                    <i className="fas fa-check"></i> Accept
                                  </a>
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-danger-light"
                                  >
                                    <i className="fas fa-times"></i> Cancel
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    to="/client-profile"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="/assets/img/patients/patient4.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <Link to="/client-profile">
                                    Michelle Fairfax <span>#PT0004</span>
                                  </Link>
                                </h2>
                              </td>
                              <td>
                                28 Oct 2019{" "}
                                <span className="d-block text-info">
                                  6.00 PM
                                </span>
                              </td>
                              <td>General</td>
                              <td>New Client</td>
                              <td className="text-center">$350</td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>

                                  <a
                                    href="#"
                                    className="btn btn-sm bg-success-light"
                                  >
                                    <i className="fas fa-check"></i> Accept
                                  </a>
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-danger-light"
                                  >
                                    <i className="fas fa-times"></i> Cancel
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    to="/client-profile"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="/assets/img/patients/patient5.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <Link to="/client-profile">
                                    Gina Moore <span>#PT0005</span>
                                  </Link>
                                </h2>
                              </td>
                              <td>
                                27 Oct 2019{" "}
                                <span className="d-block text-info">
                                  8.00 AM
                                </span>
                              </td>
                              <td>General</td>
                              <td>Old Client</td>
                              <td className="text-center">$250</td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>

                                  <a
                                    href="#"
                                    className="btn btn-sm bg-success-light"
                                  >
                                    <i className="fas fa-check"></i> Accept
                                  </a>
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-danger-light"
                                  >
                                    <i className="fas fa-times"></i> Cancel
                                  </a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="today-appointments" title="Today">
                  <div className="card card-table mb-0">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                          <thead>
                            <tr>
                              <th>Client Name</th>
                              <th>Appt Date</th>
                              <th>Purpose</th>
                              <th>Type</th>
                              <th className="text-center">Paid Amount</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    to="/client-profile"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/patients/patient6.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <Link to="/client-profile">
                                    Elsie Gilley <span>#PT0006</span>
                                  </Link>
                                </h2>
                              </td>
                              <td>
                                14 Nov 2019{" "}
                                <span className="d-block text-info">
                                  6.00 PM
                                </span>
                              </td>
                              <td>Fever</td>
                              <td>Old Client</td>
                              <td className="text-center">$300</td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>

                                  <a
                                    href="#"
                                    className="btn btn-sm bg-success-light"
                                  >
                                    <i className="fas fa-check"></i> Accept
                                  </a>
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-danger-light"
                                  >
                                    <i className="fas fa-times"></i> Cancel
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    to="/client-profile"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/patients/patient7.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <Link to="/client-profile">
                                    Joan Gardner <span>#PT0006</span>
                                  </Link>
                                </h2>
                              </td>
                              <td>
                                14 Nov 2019{" "}
                                <span className="d-block text-info">
                                  5.00 PM
                                </span>
                              </td>
                              <td>General</td>
                              <td>Old Client</td>
                              <td className="text-center">$100</td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>

                                  <a
                                    href="#"
                                    className="btn btn-sm bg-success-light"
                                  >
                                    <i className="fas fa-check"></i> Accept
                                  </a>
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-danger-light"
                                  >
                                    <i className="fas fa-times"></i> Cancel
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    to="/client-profile"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/patients/patient8.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <Link to="/client-profile">
                                    Daniel Griffing <span>#PT0007</span>
                                  </Link>
                                </h2>
                              </td>
                              <td>
                                14 Nov 2019{" "}
                                <span className="d-block text-info">
                                  3.00 PM
                                </span>
                              </td>
                              <td>General</td>
                              <td>New Client</td>
                              <td className="text-center">$75</td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>

                                  <a
                                    href="#"
                                    className="btn btn-sm bg-success-light"
                                  >
                                    <i className="fas fa-check"></i> Accept
                                  </a>
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-danger-light"
                                  >
                                    <i className="fas fa-times"></i> Cancel
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    to="/client-profile"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/patients/patient9.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <Link to="/client-profile">
                                    Walter Roberson <span>#PT0008</span>
                                  </Link>
                                </h2>
                              </td>
                              <td>
                                14 Nov 2019{" "}
                                <span className="d-block text-info">
                                  1.00 PM
                                </span>
                              </td>
                              <td>General</td>
                              <td>Old Client</td>
                              <td className="text-center">$350</td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>

                                  <a
                                    href="#"
                                    className="btn btn-sm bg-success-light"
                                  >
                                    <i className="fas fa-check"></i> Accept
                                  </a>
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-danger-light"
                                  >
                                    <i className="fas fa-times"></i> Cancel
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    to="/client-profile"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/patients/patient10.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <Link to="/client-profile">
                                    Robert Rhodes <span>#PT0010</span>
                                  </Link>
                                </h2>
                              </td>
                              <td>
                                14 Nov 2019{" "}
                                <span className="d-block text-info">
                                  10.00 AM
                                </span>
                              </td>
                              <td>General</td>
                              <td>New Client</td>
                              <td className="text-center">$175</td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>

                                  <a
                                    href="#"
                                    className="btn btn-sm bg-success-light"
                                  >
                                    <i className="fas fa-check"></i> Accept
                                  </a>
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-danger-light"
                                  >
                                    <i className="fas fa-times"></i> Cancel
                                  </a>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a
                                    to="/client-profile"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src="assets/img/patients/patient11.jpg"
                                      alt="User Image"
                                    />
                                  </a>
                                  <Link to="/client-profile">
                                    Harry Williams <span>#PT0011</span>
                                  </Link>
                                </h2>
                              </td>
                              <td>
                                14 Nov 2019{" "}
                                <span className="d-block text-info">
                                  11.00 AM
                                </span>
                              </td>
                              <td>General</td>
                              <td>New Client</td>
                              <td className="text-center">$450</td>
                              <td className="text-right">
                                <div className="table-action">
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-info-light"
                                  >
                                    <i className="far fa-eye"></i> View
                                  </a>

                                  <a
                                    href="#"
                                    className="btn btn-sm bg-success-light"
                                  >
                                    <i className="fas fa-check"></i> Accept
                                  </a>
                                  <a
                                    href="#"
                                    className="btn btn-sm bg-danger-light"
                                  >
                                    <i className="fas fa-times"></i> Cancel
                                  </a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachDashboard;
