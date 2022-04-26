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
                        <h3></h3>
                        <p className="text-muted"></p>
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
                        <h3></h3>
                        <p className="text-muted"></p>
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
                        <h3></h3>
                        <p className="text-muted"></p>
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
                            </tr>
                          </thead>
                          <tbody>
                            {myclient && myclient.length > 0 ? (
                              myclient.map((item, idx) => {
                                return item?.client?.firstname &&
                                  item.status == "Approved" ? (
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
                                              item?.client?.fileName
                                                ? mediaPath +
                                                  item.client?.fileName
                                                : mediaPath + "avatar.jpg"
                                            }
                                            alt="User"
                                          />
                                        </a>
                                        <div>
                                          &nbsp;
                                          {item?.client?.firstname +
                                            " " +
                                            item?.client?.lastname}{" "}
                                        </div>
                                      </h2>
                                    </td>
                                    <td>{idx + 1}</td>
                                    <td>{item.slots}</td>
                                    <td>{item.bookingDate}</td>
                                  </tr>
                                ) : (
                                  " "
                                );
                              })
                            ) : (
                              <tr className="no-appoinments">
                                <td>You don't have any Appointments</td>
                              </tr>
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
                              <th>Client ID</th>
                              <th>Appt Time</th>
                              <th>Appt Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {myclient && myclient.length > 0 ? (
                              myclient.map((item, idx) => {
                                return item?.client?.firstname &&
                                  item.status == "Approved" ? (
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
                                              item?.client?.fileName
                                                ? mediaPath +
                                                  item.client?.fileName
                                                : mediaPath + "avatar.jpg"
                                            }
                                            alt="User"
                                          />
                                        </a>
                                        <div>&nbsp;&nbsp;
                                          {item?.client?.firstname +
                                            " " +
                                            item?.client?.lastname}{" "}
                                        </div>
                                      </h2>
                                    </td>
                                    <td>{idx + 1}</td>
                                    <td>{item.slots}</td>
                                    <td>{item.bookingDate}</td>
                                  </tr>
                                ) : (
                                  ""
                                );
                              })
                            ) : (
                              <tr className="no-appoinments">
                                <td>You don't have any Appointments</td>
                              </tr>
                            )}
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
