import React from "react";
import { useEffect, useState } from "react";
import Toast from "../../../common/toast/Toast";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  cancelOngoingHttpRequest,
  getHttpRequest,
  postHttpRequest,
} from "../../../../axios";
const ClientProfile = () => {
  const id = useSelector((state) => state.auth.user.userid);
  const [clientProfileData, setClientProfileData] = useState([]);

  useEffect(async () => {
    let res = await getHttpRequest(`/front/coach/get/${id}`);
    console.log("res11111111111111111111111111111111 ", res?.data?.coach);
    if (res) {
      setClientProfileData(res?.data?.coach);
      Toast.fire({
        icon: "sucess",
        title: res.data.message,
      });
      return;
    }
  }, []);
  
  return (
    <div>
      {/* <!-- Breadcrumb --> */}
      <div class="breadcrumb-bar">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-md-12 col-12">
              <nav aria-label="breadcrumb" class="page-breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link to="/">Home </Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Profile
                  </li>
                </ol>
              </nav>
              <h2 class="breadcrumb-title">Profile</h2>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Breadcrumb --> */}

      {/* <!-- Page Content --> */}
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar dct-dashbd-lft">
              {/* <!-- Profile Widget --> */}
              <div class="card widget-profile pat-widget-profile">
                <div class="card-body">
                  <div class="pro-widget-content">
                    <div class="profile-info-widget">
                      <a href="#" class="booking-doc-img">
                        <img
                          src="assets/img/patients/patient.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="profile-det-info">
                        <h3>{clientProfileData.username}</h3>

                        <div class="patient-details">
                          <h5>
                            <b>Patient ID :</b>
                            {clientProfileData._id}
                          </h5>
                          <h5 class="mb-0">
                            <i class="fas fa-map-marker-alt"></i>{" "}
                            {clientProfileData.address}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="patient-info">
                    <ul>
                      <li>
                        Phone <span>{clientProfileData.phone}</span>
                      </li>
                      <li>
                        Age <span>38 Years, Male</span>
                      </li>
                      <li>
                        Blood Group <span>{clientProfileData.bloodgroup}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <!-- /Profile Widget --> */}

              {/* <!-- Last Booking --> */}
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">Last Booking</h4>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <div class="media align-items-center">
                      <div class="mr-3">
                        <img
                          alt="Image placeholder"
                          src="assets/img/doctors/doctor-thumb-02.jpg"
                          class="avatar  rounded-circle"
                        />
                      </div>
                      <div class="media-body">
                        <h5 class="d-block mb-0">Dr. Darren Elder </h5>
                        <span class="d-block text-sm text-muted">Dentist</span>
                        <span class="d-block text-sm text-muted">
                          14 Nov 2019 5.00 PM
                        </span>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="media align-items-center">
                      <div class="mr-3">
                        <img
                          alt="Image placeholder"
                          src="assets/img/doctors/doctor-thumb-02.jpg"
                          class="avatar  rounded-circle"
                        />
                      </div>
                      <div class="media-body">
                        <h5 class="d-block mb-0">Dr. Darren Elder </h5>
                        <span class="d-block text-sm text-muted">Dentist</span>
                        <span class="d-block text-sm text-muted">
                          12 Nov 2019 11.00 AM
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {/* <!-- /Last Booking --> */}
            </div>

            <div class="col-md-7 col-lg-8 col-xl-9 dct-appoinment">
              <div class="card">
                <div class="card-body pt-0">
                  <div class="user-tabs">
                    <ul class="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          href="#pat_appointments"
                          data-toggle="tab"
                        >
                          Appointments
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#pres" data-toggle="tab">
                          <span>Prescription</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#medical" data-toggle="tab">
                          <span class="med-records">Medical Records</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#billing" data-toggle="tab">
                          <span>Billing</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="tab-content">
                    {/* <!-- Appointment Tab --> */}
                    <div
                      id="pat_appointments"
                      class="tab-pane fade show active"
                    >
                      <div class="card card-table mb-0">
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table table-hover table-center mb-0">
                              <thead>
                                <tr>
                                  <th>Doctor</th>
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
                                    <h2 class="table-avatar">
                                      <Link
                                        to="/client-profile"
                                        class="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/doctors/doctor-thumb-02.jpg"
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link to="/coach-profile">
                                        Dr. Darren Elder <span>Yoga</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>
                                    14 Nov 2019{" "}
                                    <span class="d-block text-info">
                                      10.00 AM
                                    </span>
                                  </td>
                                  <td>12 Nov 2019</td>
                                  <td>$160</td>
                                  <td>16 Nov 2019</td>
                                  <td>
                                    <span class="badge badge-pill bg-success-light">
                                      Confirm
                                    </span>
                                  </td>
                                  <td class="text-right">
                                    <div class="table-action">
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-success-light"
                                      >
                                        <i class="far fa-edit"></i> Edit
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h2 class="table-avatar">
                                      <Link
                                        to="/client-profile"
                                        class="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/doctors/doctor-thumb-02.jpg"
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link to="/coach-profile">
                                        Dr. Darren Elder <span>Yoga</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>
                                    12 Nov 2019{" "}
                                    <span class="d-block text-info">
                                      8.00 PM
                                    </span>
                                  </td>
                                  <td>12 Nov 2019</td>
                                  <td>$250</td>
                                  <td>14 Nov 2019</td>
                                  <td>
                                    <span class="badge badge-pill bg-success-light">
                                      Confirm
                                    </span>
                                  </td>
                                  <td class="text-right">
                                    <div class="table-action">
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-success-light"
                                      >
                                        <i class="far fa-edit"></i> Edit
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h2 class="table-avatar">
                                      <Link
                                        to="/client-profile"
                                        class="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/doctors/doctor-thumb-02.jpg"
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link to="/coach-profile">
                                        Dr. Darren Elder <span>Yoga</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>
                                    11 Nov 2019{" "}
                                    <span class="d-block text-info">
                                      11.00 AM
                                    </span>
                                  </td>
                                  <td>10 Nov 2019</td>
                                  <td>$400</td>
                                  <td>13 Nov 2019</td>
                                  <td>
                                    <span class="badge badge-pill bg-danger-light">
                                      Cancelled
                                    </span>
                                  </td>
                                  <td class="text-right">
                                    <div class="table-action">
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-success-light"
                                      >
                                        <i class="far fa-edit"></i> Edit
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h2 class="table-avatar">
                                      <Link
                                        to="/client-profile"
                                        class="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/doctors/doctor-thumb-02.jpg"
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link to="/coach-profile">
                                        Dr. Darren Elder <span>Yoga</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>
                                    10 Nov 2019{" "}
                                    <span class="d-block text-info">
                                      3.00 PM
                                    </span>
                                  </td>
                                  <td>10 Nov 2019</td>
                                  <td>$350</td>
                                  <td>12 Nov 2019</td>
                                  <td>
                                    <span class="badge badge-pill bg-warning-light">
                                      Pending
                                    </span>
                                  </td>
                                  <td class="text-right">
                                    <div class="table-action">
                                      <a
                                        href="#"
                                        class="btn btn-sm bg-success-light"
                                      >
                                        <i class="far fa-edit"></i> Edit
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-danger-light"
                                      >
                                        <i class="far fa-trash-alt"></i> Cancel
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h2 class="table-avatar">
                                      <Link
                                        to="/client-profile"
                                        class="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/doctors/doctor-thumb-02.jpg"
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link to="/coach-profile">
                                        Dr. Darren Elder <span>Yoga</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>
                                    9 Nov 2019{" "}
                                    <span class="d-block text-info">
                                      7.00 PM
                                    </span>
                                  </td>
                                  <td>8 Nov 2019</td>
                                  <td>$75</td>
                                  <td>11 Nov 2019</td>
                                  <td>
                                    <span class="badge badge-pill bg-success-light">
                                      Confirm
                                    </span>
                                  </td>
                                  <td class="text-right">
                                    <div class="table-action">
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-success-light"
                                      >
                                        <i class="far fa-edit"></i> Edit
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Appointment Tab --> */}

                    {/* <!-- Prescription Tab --> */}
                    <div class="tab-pane fade" id="pres">
                      <div class="text-right">
                        <a href="#" class="add-new-btn">
                          Add Prescription
                        </a>
                      </div>
                      <div class="card card-table mb-0">
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table table-hover table-center mb-0">
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
                                  <td>14 Nov 2019</td>
                                  <td>Prescription 1</td>
                                  <td>
                                    <h2 class="table-avatar">
                                      <Link
                                        to="/client-profile"
                                        class="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/doctors/doctor-thumb-01.jpg"
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link to="/coach-profile">
                                        Dr. Ruby Perrin <span>Yoga</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td class="text-right">
                                    <div class="table-action">
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-primary-light"
                                      >
                                        <i class="fas fa-print"></i> Print
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-info-light"
                                      >
                                        <i class="far fa-eye"></i> View
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>13 Nov 2019</td>
                                  <td>Prescription 2</td>
                                  <td>
                                    <h2 class="table-avatar">
                                      <Link
                                        to="/client-profile"
                                        class="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/doctors/doctor-thumb-02.jpg"
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link to="/coach-profile">
                                        Dr. Darren Elder <span>Yoga</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td class="text-right">
                                    <div class="table-action">
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-primary-light"
                                      >
                                        <i class="fas fa-print"></i> Print
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-info-light"
                                      >
                                        <i class="far fa-eye"></i> View
                                      </a>
                                      <a
                                        href="#"
                                        class="btn btn-sm bg-success-light"
                                      >
                                        <i class="fas fa-edit"></i> Edit
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-danger-light"
                                      >
                                        <i class="far fa-trash-alt"></i> Delete
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Prescription Tab --> */}

                    {/* <!-- Medical Records Tab --> */}
                    <div class="tab-pane fade" id="medical">
                      <div class="text-right">
                        <a
                          href="#"
                          class="add-new-btn"
                          data-toggle="modal"
                          data-target="#add_medical_records"
                        >
                          Add Medical Records
                        </a>
                      </div>
                      <div class="card card-table mb-0">
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table table-hover table-center mb-0">
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
                                    <a href="javascript:void(0);">#MR-0010</a>
                                  </td>
                                  <td>14 Nov 2019</td>
                                  <td>Yoga </td>
                                  <td>
                                    <a href="#">dental-test.pdf</a>
                                  </td>
                                  <td>
                                    <h2 class="table-avatar">
                                      <Link
                                        to="/client-profile"
                                        class="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/doctors/doctor-thumb-01.jpg"
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link to="/coach-profile">
                                        Dr. Ruby Perrin <span>Yoga</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td class="text-right">
                                    <div class="table-action">
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-primary-light"
                                      >
                                        <i class="fas fa-print"></i> Print
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-info-light"
                                      >
                                        <i class="far fa-eye"></i> View
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="javascript:void(0);">#MR-0009</a>
                                  </td>
                                  <td>13 Nov 2019</td>
                                  <td>Teeth Cleaning</td>
                                  <td>
                                    <a href="#">dental-test.pdf</a>
                                  </td>
                                  <td>
                                    <h2 class="table-avatar">
                                      <Link
                                        to="/client-profile"
                                        class="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/doctors/doctor-thumb-02.jpg"
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link to="/coach-profile">
                                        Dr. Darren Elder <span>Yoga</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td class="text-right">
                                    <div class="table-action">
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-primary-light"
                                      >
                                        <i class="fas fa-print"></i> Print
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-info-light"
                                      >
                                        <i class="far fa-eye"></i> View
                                      </a>
                                      <a
                                        href="#"
                                        class="btn btn-sm bg-success-light"
                                        data-toggle="modal"
                                        data-target="#add_medical_records"
                                      >
                                        <i class="fas fa-edit"></i> Edit
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-danger-light"
                                      >
                                        <i class="far fa-trash-alt"></i> Delete
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Medical Records Tab --> */}

                    {/* <!-- Billing Tab --> */}
                    <div class="tab-pane" id="billing">
                      <div class="text-right">
                        <a class="add-new-btn" href="#">
                          Add Billing
                        </a>
                      </div>
                      <div class="card card-table mb-0">
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table table-hover table-center mb-0">
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
                                    <Link to="invoice">#INV-0010</Link>
                                  </td>
                                  <td>
                                    <h2 class="table-avatar">
                                      <Link
                                        to="/client-profile"
                                        class="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/doctors/doctor-thumb-01.jpg"
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link to="/coach-profile">
                                        Ruby Perrin <span>Yoga</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>$450</td>
                                  <td>14 Nov 2019</td>
                                  <td class="text-right">
                                    <div class="table-action">
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-primary-light"
                                      >
                                        <i class="fas fa-print"></i> Print
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-info-light"
                                      >
                                        <i class="far fa-eye"></i> View
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <Link to="/invoice">#INV-0009</Link>
                                  </td>
                                  <td>
                                    <h2 class="table-avatar">
                                      <Link
                                        to="/client-profile"
                                        class="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/doctors/doctor-thumb-02.jpg"
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link to="/coach-profile">
                                        Dr. Darren Elder <span>Yoga</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>$300</td>
                                  <td>13 Nov 2019</td>
                                  <td class="text-right">
                                    <div class="table-action">
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-primary-light"
                                      >
                                        <i class="fas fa-print"></i> Print
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-info-light"
                                      >
                                        <i class="far fa-eye"></i> View
                                      </a>
                                      <a
                                        href="#"
                                        class="btn btn-sm bg-success-light"
                                      >
                                        <i class="fas fa-edit"></i> Edit
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-danger-light"
                                      >
                                        <i class="far fa-trash-alt"></i> Delete
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <Link to="/invoice">#INV-0008</Link>
                                  </td>
                                  <td>
                                    <h2 class="table-avatar">
                                      <Link
                                        to="/client-profile"
                                        class="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/doctors/doctor-thumb-03.jpg"
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link to="/coach-profile">
                                        Dr. Deborah Angel{" "}
                                        <span>Cardiology</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>$150</td>
                                  <td>12 Nov 2019</td>
                                  <td class="text-right">
                                    <div class="table-action">
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-primary-light"
                                      >
                                        <i class="fas fa-print"></i> Print
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-info-light"
                                      >
                                        <i class="far fa-eye"></i> View
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <Link to="/invoice">#INV-0007</Link>
                                  </td>
                                  <td>
                                    <h2 class="table-avatar">
                                      <Link
                                        to="/client-profile"
                                        class="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/doctors/doctor-thumb-04.jpg"
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link to="/coach-profile">
                                        Dr. Sofia Brient <span>Urology</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>$50</td>
                                  <td>11 Nov 2019</td>
                                  <td class="text-right">
                                    <div class="table-action">
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-primary-light"
                                      >
                                        <i class="fas fa-print"></i> Print
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-info-light"
                                      >
                                        <i class="far fa-eye"></i> View
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Billing Tab --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Page Content --> */}
    </div>
  );
};

export default ClientProfile;
