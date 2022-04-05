import React from "react";
import { Link } from "react-router-dom";
import { Tabs , Tab } from "react-bootstrap";
const ClientDashboard = (props) => {
  console.log("dfdf", props);
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
                            <th>Appt Date</th>
                            <th>Booking Date</th>
                            <th>Amount</th>
                            <th>Follow Up</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
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
                                  Dr. Ruby Perrin <span>Yoga Expert</span>
                                </Link>
                              </h2>
                            </td>
                            <td>
                              14 Feb 2022
                              <span className="d-block text-info">
                                10.00 AM
                              </span>
                            </td>
                            <td>12 Feb 2022</td>
                            <td>$160</td>
                            <td>16 Feb 2022</td>
                            <td>
                              <span className="badge badge-pill bg-success-light">
                                Confirm
                              </span>
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
                          <tr>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-02.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Darren Elder <span>Nutritionists</span>
                                </Link>
                              </h2>
                            </td>
                            <td>
                              12 Feb 2022
                              <span className="d-block text-info">8.00 PM</span>
                            </td>
                            <td>12 Feb 2022</td>
                            <td>$250</td>
                            <td>14 Feb 2022</td>
                            <td>
                              <span className="badge badge-pill bg-success-light">
                                Confirm
                              </span>
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
                          <tr>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-03.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Deborah Angel <span>Kick Boxing</span>
                                </Link>
                              </h2>
                            </td>
                            <td>
                              11 Feb 2022
                              <span className="d-block text-info">
                                11.00 AM
                              </span>
                            </td>
                            <td>10 Feb 2022</td>
                            <td>$400</td>
                            <td>13 Feb 2022</td>
                            <td>
                              <span className="badge badge-pill bg-danger-light">
                                Cancelled
                              </span>
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
                          <tr>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-04.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Sofia Brient <span>Wellness Health</span>
                                </Link>
                              </h2>
                            </td>
                            <td>
                              10 Feb 2022
                              <span className="d-block text-info">3.00 PM</span>
                            </td>
                            <td>10 Feb 2022</td>
                            <td>$350</td>
                            <td>12 Feb 2022</td>
                            <td>
                              <span className="badge badge-pill bg-warning-light">
                                Pending
                              </span>
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
                          <tr>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-05.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Marvin Campbell <span>Paleo Health</span>
                                </Link>
                              </h2>
                            </td>
                            <td>
                              9 Feb 2022
                              <span className="d-block text-info">7.00 PM</span>
                            </td>
                            <td>8 Feb 2022</td>
                            <td>$75</td>
                            <td>11 Feb 2022</td>
                            <td>
                              <span className="badge badge-pill bg-success-light">
                                Confirm
                              </span>
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
                          <tr>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/doctors/doctor-thumb-06.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Katharine Berthold
                                  <span>Paleo Health</span>
                                </Link>
                              </h2>
                            </td>
                            <td>
                              8 Feb 2022
                              <span className="d-block text-info">9.00 AM</span>
                            </td>
                            <td>6 Feb 2022</td>
                            <td>$175</td>
                            <td>10 Feb 2022</td>
                            <td>
                              <span className="badge badge-pill bg-danger-light">
                                Cancelled
                              </span>
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
                          <tr>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-07.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Linda Tobin <span>Paleo Health</span>
                                </Link>
                              </h2>
                            </td>
                            <td>
                              8 Feb 2022
                              <span className="d-block text-info">6.00 PM</span>
                            </td>
                            <td>6 Feb 2022</td>
                            <td>$450</td>
                            <td>10 Feb 2022</td>
                            <td>
                              <span className="badge badge-pill bg-success-light">
                                Confirm
                              </span>
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
                          <tr>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-08.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Paul Richard <span>Paleo Health</span>
                                </Link>
                              </h2>
                            </td>
                            <td>
                              7 Feb 2022
                              <span className="d-block text-info">9.00 PM</span>
                            </td>
                            <td>7 Feb 2022</td>
                            <td>$275</td>
                            <td>9 Feb 2022</td>
                            <td>
                              <span className="badge badge-pill bg-success-light">
                                Confirm
                              </span>
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
                          <tr>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-09.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. John Gibbs <span>Paleo Health</span>
                                </Link>
                              </h2>
                            </td>
                            <td>
                              6 Feb 2022
                              <span className="d-block text-info">8.00 PM</span>
                            </td>
                            <td>4 Feb 2022</td>
                            <td>$600</td>
                            <td>8 Feb 2022</td>
                            <td>
                              <span className="badge badge-pill bg-success-light">
                                Confirm
                              </span>
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
                          <tr>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-10.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Olga Barlow <span>Paleo Health</span>
                                </Link>
                              </h2>
                            </td>
                            <td>
                              5 Feb 2022
                              <span className="d-block text-info">5.00 PM</span>
                            </td>
                            <td>1 Feb 2022</td>
                            <td>$100</td>
                            <td>7 Feb 2022</td>
                            <td>
                              <span className="badge badge-pill bg-success-light">
                                Confirm
                              </span>
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
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="pat_Plans" title="Plans">
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
                          <tr>
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
                                  Dr. Ruby Perrin <span>Nutritionists</span>
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
                          <tr>
                            <td>13 Feb 2022</td>
                            <td>Plan 2</td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-02.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Darren Elder <span>Nutritionists</span>
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
                          <tr>
                            <td>12 Feb 2022</td>
                            <td>Plan 3</td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/doctors/doctor-thumb-03.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Deborah Angel <span>Nutritionists</span>
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
                          <tr>
                            <td>11 Feb 2022</td>
                            <td>Plan 4</td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-04.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Sofia Brient <span>Holistic Health</span>
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
                          <tr>
                            <td>10 Feb 2022</td>
                            <td>Plan 5</td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-05.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Marvin Campbell <span>Nutritionists</span>
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
                          <tr>
                            <td>9 Feb 2022</td>
                            <td>Plan 6</td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/doctors/doctor-thumb-06.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Katharine Berthold
                                  <span>Wellness Health</span>
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
                          <tr>
                            <td>8 Feb 2022</td>
                            <td>Plan 7</td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/doctors/doctor-thumb-07.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Linda Tobin <span>kick Boxing</span>
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
                          <tr>
                            <td>7 Feb 2022</td>
                            <td>Plan 8</td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-08.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Paul Richard <span>Yoga Expert</span>
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
                          <tr>
                            <td>6 Feb 2022</td>
                            <td>Plan 9</td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/doctors/doctor-thumb-09.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. John Gibbs <span>Nutritionists</span>
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
                          <tr>
                            <td>5 Feb 2022</td>
                            <td>Plan 10</td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-10.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Olga Barlow <span>Nutritionists</span>
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
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="pat_medical_records" title="Records">
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
                          <tr>
                            <td>
                              <a href="#">#MR-0009</a>
                            </td>
                            <td>13 Feb 2022</td>
                            <td>Teeth Cleaning</td>
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
                                    src="/assets/img/doctors/doctor-thumb-02.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Darren Elder <span>Nutritionists</span>
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
                          <tr>
                            <td>
                              <a href="#">#MR-0008</a>
                            </td>
                            <td>12 Feb 2022</td>
                            <td>General Checkup</td>
                            <td>
                              <a href="#">cardio-test.pdf</a>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-03.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Deborah Angel <span>Cardiology</span>
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
                          <tr>
                            <td>
                              <a href="#">#MR-0007</a>
                            </td>
                            <td>11 Feb 2022</td>
                            <td>General Test</td>
                            <td>
                              <a href="#">general-test.pdf</a>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-04.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Sofia Brient <span>Holistic Health</span>
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
                          <tr>
                            <td>
                              <a href="#">#MR-0006</a>
                            </td>
                            <td>10 Feb 2022</td>
                            <td>Eye Test</td>
                            <td>
                              <a href="#">eye-test.pdf</a>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-05.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Marvin Campbell <span>Ophthalmology</span>
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
                          <tr>
                            <td>
                              <a href="#">#MR-0005</a>
                            </td>
                            <td>9 Feb 2022</td>
                            <td>Leg Pain</td>
                            <td>
                              <a href="#">ortho-test.pdf</a>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-06.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Katharine Berthold
                                  <span>Wellness Health</span>
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
                          <tr>
                            {/* <td><a href="#">#MR-0004</a></td> */}
                            <td>
                              <a href="#">#MR-0004</a>
                            </td>
                            <td>8 Feb 2022</td>
                            <td>Head pain</td>
                            <td>
                              <a href="#">neuro-test.pdf</a>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-07.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Linda Tobin <span>kick Boxing</span>
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
                          <tr>
                            <td>
                              <a href="#">#MR-0003</a>
                            </td>
                            <td>7 Feb 2022</td>
                            <td>Skin Alergy</td>
                            <td>
                              <a href="#">alergy-test.pdf</a>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-08.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Paul Richard <span>Yoga Expert</span>
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
                          <tr>
                            <td>
                              <a href="#">#MR-0002</a>
                            </td>
                            <td>6 Feb 2022</td>
                            <td>Nutritionists Removing</td>
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
                                    src="/assets/img/doctors/doctor-thumb-09.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. John Gibbs <span>Nutritionists</span>
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
                          <tr>
                            <td>
                              <a href="#">#MR-0001</a>
                            </td>
                            <td>5 Feb 2022</td>
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
                                    src="/assets/img/doctors/doctor-thumb-10.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Olga Barlow <span>Nutritionists</span>
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
                          <tr>
                            <td>
                              <Link to="/invoice">#INV-0009</Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/doctors/doctor-thumb-02.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Darren Elder <span>Nutritionists</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$300</td>
                            <td>13 Feb 2022</td>
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
                          <tr>
                            <td>
                              <Link to="/invoice">#INV-0008</Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/doctors/doctor-thumb-03.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Deborah Angel <span>Cardiology</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$150</td>
                            <td>12 Feb 2022</td>
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
                          <tr>
                            <td>
                              <Link to="/invoice">#INV-0007</Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/doctors/doctor-thumb-04.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Sofia Brient <span>Holistic Health</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$50</td>
                            <td>11 Feb 2022</td>
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
                          <tr>
                            <td>
                              <Link to="/invoice">#INV-0006</Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/doctors/doctor-thumb-05.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Marvin Campbell <span>Ophthalmology</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$600</td>
                            <td>10 Feb 2022</td>
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
                          <tr>
                            <td>
                              <Link to="/invoice">#INV-0005</Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/doctors/doctor-thumb-06.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Katharine Berthold
                                  <span>Wellness Health</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$200</td>
                            <td>9 Feb 2022</td>
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
                          <tr>
                            <td>
                              <Link to="/invoice">#INV-0004</Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/doctors/doctor-thumb-07.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Linda Tobin <span>kick Boxing</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$100</td>
                            <td>8 Feb 2022</td>
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
                          <tr>
                            <td>
                              <Link to="/invoice">#INV-0003</Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/doctors/doctor-thumb-08.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Paul Richard <span>Yoga Expert</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$250</td>
                            <td>7 Feb 2022</td>
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
                          <tr>
                            <td>
                              <Link to="/invoice">#INV-0002</Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="assets/img/doctors/doctor-thumb-09.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. John Gibbs <span>Nutritionists</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$175</td>
                            <td>6 Feb 2022</td>
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
                          <tr>
                            <td>
                              <Link to="/invoice">#INV-0001</Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/coach-profile"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src="/assets/img/doctors/doctor-thumb-10.jpg"
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/coach-profile">
                                  Dr. Olga Barlow <span>#0010</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$550</td>
                            <td>5 Feb 2022</td>
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
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDashboard;
