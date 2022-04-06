import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHttpRequest } from "../../../../axios";
import { useSelector } from "react-redux";
const MyClient = () => {
  const coachId = useSelector((state) => state.auth.userid);

  const [myclient, setMyclient] = useState();
  useEffect(() => {
    getHttpRequest(`/front/booking/get/${coachId}`)
      .then((response) => {
        setMyclient(response?.data?.coach);
      })
      .catch((e) => {
        alert("error", e);
      });
  }, []);
  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="row row-grid">
          {myclient ? (
            myclient.map((item, idx) => {
              return (
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="card widget-profile pat-widget-profile">
                    <div className="card-body">
                      <div className="pro-widget-content">
                        <div className="profile-info-widget">
                          <Link
                            to="/client-profile"
                            className="booking-doc-img"
                          >
                            <img
                              src="assets/img/patients/patient.jpg"
                              alt="User Image"
                            />
                          </Link>{" "}
                          <div className="profile-det-info">
                            <h3>
                              <Link to="/app/client-profile">
                                {item?.firstname + " " + item?.lastname}{" "}
                              </Link>
                            </h3>

                            <div className="patient-details">
                              <h5>
                                <b>Client ID :</b> P0016
                              </h5>
                              <h5 className="mb-0">
                                <i className="fas fa-map-marker-alt"></i>{" "}
                                {item?.country + ", " + item?.city}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="patient-info">
                        <ul>
                          <li>
                            Phone <span>{item?.phone}</span>
                          </li>
                          <li>
                            Gender <span> {item.gender}</span>
                          </li>
                          <li>
                            Blood Group <span>{item?.bloodgroup}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no_data">
              <span>You Don't Have any Appoinments</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default MyClient;
