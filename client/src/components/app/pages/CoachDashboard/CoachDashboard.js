import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getHttpRequest } from "../../../../axios";
const CoachDashboard = () => {
  const coachId = useSelector((state) => state.auth.user.userid);
  const mediaPath = process.env.REACT_APP_IMG;

  const [myclient, setMyclient] = useState();
  useEffect(() => {
    getHttpRequest(`/front/booking/get/${coachId}`)
      .then((response) => {
        console.log(response);
        setMyclient(response?.data?.BookingData);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

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
                              <th>Client ID</th>
                              <th>Appt Time</th>
                              <th>Appt Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {myclient && myclient.length > 0 ? (
                              myclient.map((item, idx) => {
                                return (
                                  <tr>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          to="/client-profile"
                                          className="avatar avatar-sm mr-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src={
                                              item?.clientData?.fileName
                                                ? mediaPath +
                                                  item.clientData?.fileName
                                                : mediaPath + "avatar.jpg"
                                            }
                                            alt="User"
                                          />
                                        </a>
                                        <div>
                                          {item?.clientData?.firstname +
                                            " " +
                                            item?.clientData?.lastname}{" "}
                                        </div>
                                      </h2>
                                    </td>
                                    <td>{idx + 1}</td>
                                    <td>{item.slots}</td>
                                    <td>{item.bookingDate}</td>
                                    <td className="">
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
                                          <i className="fas fa-check"></i>{" "}
                                          Accept
                                        </a>
                                        <a
                                          href="#"
                                          className="btn btn-sm bg-danger-light"
                                        >
                                          <i className="fas fa-times"></i>{" "}
                                          Cancel
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <div className="no-Appoinents">
                                <span>You Don't Have any Appoinments</span>
                              </div>
                            )}
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
