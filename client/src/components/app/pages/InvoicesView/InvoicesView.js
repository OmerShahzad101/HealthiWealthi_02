import React from "react";
import { Link } from "react-router-dom";

const InvoicesView = () => {
  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="card card-table">
          <div className="card-body">
            {/* <!-- Invoice Table --> */}
            <div className="table-responsive">
              <table className="table table-hover table-center mb-0">
                <thead>
                  <tr>
                    <th>Invoice No</th>
                    <th>Client</th>
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
                          to="/client-dashboard"
                          className="avatar avatar-sm mr-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/img/patients/patient.jpg"
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/client-dashboard">
                          Richard Wilson <span>#PT0016</span>
                        </Link>{" "}
                      </h2>
                    </td>
                    <td>$450</td>
                    <td>14 Nov 2019</td>
                    <td className="text-right">
                      <div className="table-action">
                        <Link
                          to="/invoice"
                          className="btn btn-sm bg-info-light"
                        >
                          <i className="far fa-eye"></i> View
                        </Link>{" "}
                        <a href="#" className="btn btn-sm bg-primary-light">
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
                          to="/client-dashboard"
                          className="avatar avatar-sm mr-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/img/patients/patient1.jpg"
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/client-dashboard">
                          Charlene Reed <span>#PT0001</span>
                        </Link>{" "}
                      </h2>
                    </td>
                    <td>$200</td>
                    <td>13 Nov 2019</td>
                    <td className="text-right">
                      <div className="table-action">
                        <Link
                          to="/invoice"
                          className="btn btn-sm bg-info-light"
                        >
                          <i className="far fa-eye"></i> View
                        </Link>{" "}
                        <a href="#" className="btn btn-sm bg-primary-light">
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
                          to="/client-dashboard"
                          className="avatar avatar-sm mr-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/img/patients/patient2.jpg"
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/client-dashboard">
                          Travis Trimble <span>#PT0002</span>
                        </Link>{" "}
                      </h2>
                    </td>
                    <td>$100</td>
                    <td>12 Nov 2019</td>
                    <td className="text-right">
                      <div className="table-action">
                        <Link
                          to="/invoice"
                          className="btn btn-sm bg-info-light"
                        >
                          <i className="far fa-eye"></i> View
                        </Link>{" "}
                        <a href="#" className="btn btn-sm bg-primary-light">
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
                          to="/client-dashboard"
                          className="avatar avatar-sm mr-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/img/patients/patient3.jpg"
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/client-dashboard">
                          Carl Kelly <span>#PT0003</span>
                        </Link>{" "}
                      </h2>
                    </td>
                    <td>$350</td>
                    <td>11 Nov 2019</td>
                    <td className="text-right">
                      <div className="table-action">
                        <Link
                          to="/invoice"
                          className="btn btn-sm bg-info-light"
                        >
                          <i className="far fa-eye"></i> View
                        </Link>{" "}
                        <a href="#" className="btn btn-sm bg-primary-light">
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
                          to="/client-dashboard"
                          className="avatar avatar-sm mr-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/img/patients/patient4.jpg"
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/client-dashboard">
                          Michelle Fairfax <span>#PT0004</span>
                        </Link>{" "}
                      </h2>
                    </td>
                    <td>$275</td>
                    <td>10 Nov 2019</td>
                    <td className="text-right">
                      <div className="table-action">
                        <Link
                          to="/invoice"
                          className="btn btn-sm bg-info-light"
                        >
                          <i className="far fa-eye"></i> View
                        </Link>{" "}
                        <a href="#" className="btn btn-sm bg-primary-light">
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
                          to="/client-dashboard"
                          className="avatar avatar-sm mr-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/img/patients/patient5.jpg"
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/client-dashboard">
                          Gina Moore <span>#PT0005</span>
                        </Link>{" "}
                      </h2>
                    </td>
                    <td>$600</td>
                    <td>9 Nov 2019</td>
                    <td className="text-right">
                      <div className="table-action">
                        <Link
                          to="/invoice"
                          className="btn btn-sm bg-info-light"
                        >
                          <i className="far fa-eye"></i> View
                        </Link>{" "}
                        <a href="#" className="btn btn-sm bg-primary-light">
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
                          to="/client-dashboard"
                          className="avatar avatar-sm mr-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/img/patients/patient6.jpg"
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/client-dashboard">
                          Elsie Gilley <span>#PT0006</span>
                        </Link>{" "}
                      </h2>
                    </td>
                    <td>$50</td>
                    <td>8 Nov 2019</td>
                    <td className="text-right">
                      <div className="table-action">
                        <Link
                          to="/invoice"
                          className="btn btn-sm bg-info-light"
                        >
                          <i className="far fa-eye"></i> View
                        </Link>{" "}
                        <a href="#" className="btn btn-sm bg-primary-light">
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
                          to="/client-dashboard"
                          className="avatar avatar-sm mr-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/img/patients/patient7.jpg"
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/client-dashboard">
                          Joan Gardner <span>#PT0007</span>
                        </Link>{" "}
                      </h2>
                    </td>
                    <td>$400</td>
                    <td>7 Nov 2019</td>
                    <td className="text-right">
                      <div className="table-action">
                        <Link
                          to="/invoice"
                          className="btn btn-sm bg-info-light"
                        >
                          <i className="far fa-eye"></i> View
                        </Link>{" "}
                        <a href="#" className="btn btn-sm bg-primary-light">
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
                          to="/client-dashboard"
                          className="avatar avatar-sm mr-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/img/patients/patient8.jpg"
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/client-dashboard">
                          Daniel Griffing <span>#PT0008</span>
                        </Link>{" "}
                      </h2>
                    </td>
                    <td>$550</td>
                    <td>6 Nov 2019</td>
                    <td className="text-right">
                      <div className="table-action">
                        <Link
                          to="/invoice"
                          className="btn btn-sm bg-info-light"
                        >
                          <i className="far fa-eye"></i> View
                        </Link>{" "}
                        <a href="#" className="btn btn-sm bg-primary-light">
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
                          to="/client-dashboard"
                          className="avatar avatar-sm mr-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/img/patients/patient9.jpg"
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/client-dashboard">
                          Walter Roberson <span>#PT0009</span>
                        </Link>{" "}
                      </h2>
                    </td>
                    <td>$100</td>
                    <td>5 Nov 2019</td>
                    <td className="text-right">
                      <div className="table-action">
                        <Link
                          to="/invoice"
                          className="btn btn-sm bg-info-light"
                        >
                          <i className="far fa-eye"></i> View
                        </Link>{" "}
                        <a href="#" className="btn btn-sm bg-primary-light">
                          <i className="fas fa-print"></i> Print
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <!-- /Invoice Table --> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicesView;
