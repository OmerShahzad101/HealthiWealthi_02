import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getHttpRequest } from "../../../../axios";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";

const ClientDashboard = (props) => {
  const clientId = useSelector((state) => state.auth.user.userid);
  const [myAppoinment, setMyAppoinment] = useState();
  const mediaPath = process.env.REACT_APP_IMG;

  useEffect(() => {
    getHttpRequest(`/front/booking/getAppoinment/${clientId}`)
      .then((response) => {
        console.log(response);
        setMyAppoinment(response?.data?.BookingData);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);
  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="card">
          <div className="card-body pt-0 user-tabs mb-4">
            <Tabs
              defaultActiveKey="pat_appointments"
              id="uncontrolled-tab-example"
              className="nav-tabs-bottom nav-justified"
            >
              <Tab eventKey="pat_appointments" title="Appointments">
                <div className="card card-table mb-0">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>Coach</th>
                            <th>Appt Time</th>
                            <th>Booking Date</th>
                            <th>Status</th>
                            <th>Meeting Link</th>
                          </tr>
                        </thead>
                        <tbody>
                          {myAppoinment && myAppoinment.length > 0 ? (
                            myAppoinment.map((item, idx) => {
                              return (
                                item?.client?.firstname && (
                                  <tr key={idx}>
                                    <td>
                                      <h2 className="table-avatar">
                                        <Link
                                          to="/coach-profile"
                                          className="avatar avatar-sm mr-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src={
                                              item.coach?.fileName
                                                ? mediaPath +
                                                  item.coach.fileName
                                                : mediaPath + "avatar.jpg"
                                            }
                                            alt="User"
                                          />
                                        </Link>
                                        <Link
                                          to={
                                            "/coach-profile/" + item?.coach?._id
                                          }
                                        >
                                          &nbsp;
                                          {item?.coach?.firstname +
                                            " " +
                                            item?.coach?.lastname}
                                          <span>
                                            &nbsp; {item?.coach?.specialization}
                                          </span>
                                        </Link>
                                      </h2>
                                    </td>
                                    <td>
                                      {/* {item?.bookingDate} */}
                                      <span className="d-block text-info">
                                        {item?.slots}
                                      </span>
                                    </td>
                                    <td>{item?.bookingDate}</td>
                                    {/* <td>${item?.price}</td> */}
                                    <td>
                                      {item?.status == "Approved" ? (
                                        <span className="badge badge-pill bg-success-light">
                                          Confirm
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                      {item?.status == "Cancelled" ? (
                                        <span className="badge badge-pill bg-danger-light">
                                          Cancelled
                                        </span>
                                      ) : (
                                        ""
                                      )}{" "}
                                      {item?.status == "pending" ? (
                                        <span className="badge badge-pill bg-warning-light">
                                          Pending
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </td>

                                    <td>
                                      {item?.status == "Cancelled" ? (
                                        <BsFillArrowUpRightSquareFill
                                          size={28}
                                        />
                                      ) : item?.status == "pending" ? (
                                        <BsFillArrowUpRightSquareFill
                                          size={28}
                                        />
                                      ) : (
                                        <a href={item.meetingLink}>
                                          <BsFillArrowUpRightSquareFill
                                            size={28}
                                            className="meet-icon"
                                          />
                                        </a>
                                      )}
                                    </td>
                                  </tr>
                                )
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
              {/* <Tab eventKey="pat_Plans" title="Plans">
                <div className="card card-table mb-0">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>Date </th>
                            <th>Name</th>
                            <th>Created by </th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {myAppoinment ? (
                            myAppoinment.map((item, idx) => {
                              return (
                                <tr key={idx}>
                                  <td>14 Feb 2022</td>
                                  <td>Plan 1</td>
                                  <td>
                                    <h2 className="table-avatar">
                                      <Link
                                        to="/coach-profile"
                                        className="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          className="avatar-img rounded-circle"
                                          src="/assets/img/doctors/doctor-thumb-01.jpg"
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link to="/coach-profile">
                                        {item?.coach?.firstname +
                                          item?.coach?.lastname}{" "}
                                        <td>Nutritionists</td>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td className="text-right">
                                    <div className="table-action">
                                      <a
                                        href="#"
                                        className="btn btn-sm bg-primary-light"
                                      >
                                        <i className="fas fa-print"></i> Print
                                      </a>
                                      <a
                                        href="#"
                                        className="btn btn-sm bg-info-light"
                                      >
                                        <i className="far fa-eye"></i> View
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr className="no_data_found">
                              <td>You don't Book any Appointments</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Tab> */}
              {/* <Tab eventKey="pat_medical_records" title="Records">
                <div className="card card-table mb-0">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Date </th>
                            <th>Description</th>
                            <th>Attachment</th>
                            <th>Created</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <a href="#">#MR-0010</a>
                            </td>
                            <td>14 Feb 2022</td>
                            <td>Nutritionists Filling</td>
                            <td>
                              <a href="#">Nutritionists-test.pdf</a>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-01.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Ruby Perrin <span>Nutritionists</span>
                                </Link>
                              </h2>
                            </td>
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
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-print"></i> Print
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
              <Tab eventKey="pat_billing" title="Billing">
                <div className="card card-table mb-0">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>Invoice No</th>
                            <th>Doctor</th>
                            <th>Amount</th>
                            <th>Paid On</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <Link to="/invoice">#INV-0010</Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-01.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Ruby Perrin <span>Nutritionists</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$450</td>
                            <td>14 Feb 2022</td>
                            <td className="text-right">
                              <div className="table-action">
                                <Link
                                  to="/invoice"
                                  className="btn btn-sm bg-info-light"
                                >
                                  <i className="far fa-eye"></i> View
                                </Link>
                                <a
                                  href="#"
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-print"></i> Print
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Tab> */}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDashboard;
