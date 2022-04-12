import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHttpRequest } from "../../../../axios";
import { useSelector } from "react-redux";
const MyClient = () => {
  const coachId = useSelector((state) => state.auth.user.userid);

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
                                {item?.clientData?.firstname +
                                  " " +
                                  item?.clientData?.lastname}{" "}
                              </Link>
                            </h3>

                            <div className="patient-details">
                              <h5>
                                <b>Client ID :</b> {idx + 1}
                              </h5>
                              <h5 className="mb-0">
                                <i className="fas fa-map-marker-alt"></i>{" "}
                                {item?.clientData?.country +
                                  ", " +
                                  item?.clientData?.city}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="patient-info">
                        <ul>
                          <li>
                            Phone <span>{item?.clientData?.phone}</span>
                          </li>
                          <li>
                            Gender <span> {item.clientData?.gender}</span>
                          </li>
                          <li>
                            Blood Group{" "}
                            <span>{item?.clientData?.bloodgroup}</span>
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
