import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHttpRequest } from "../../../../axios";
import { useSelector } from "react-redux";
import imagePath from "../../../../utils/url/imagePath";
const mediaPath = process.env.REACT_APP_IMG;

const MyClient = () => {
  const coachId = useSelector((state) => state.auth.user.userid);
  const userImage = useSelector((state) => state.auth.user.fileName);

  const [myclient, setMyclient] = useState();
  useEffect(() => {
    getHttpRequest(`/front/booking/get/${coachId}`)
      .then((response) => {
        console.log(response);
        const newArr = response?.data?.BookingData.filter(
          (item) => item.status == "Approved"
        );
        setMyclient(newArr);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);
  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="row row-grid">
          {myclient && myclient.length > 0 ? (
            myclient.map((item, idx) => {
              return item?.client?.firstname ? (
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="card widget-profile pat-widget-profile">
                    <div className="card-body">
                      <div className="pro-widget-content">
                        <div className="profile-info-widget">
                          {item.client?.fileName?.length > 20 ? (
                            <img
                              className="booking-doc-img resize"
                              src={item.client?.fileName}
                              alt="User Image"
                            />
                          ) : (
                            <img
                              className="booking-doc-img resize"
                              src={
                                item?.client?.fileName
                                  ? mediaPath + item.client?.fileName
                                  : mediaPath + "avatar.jpg"
                              }
                              alt="User"
                            />
                          )}

                          <div className="profile-det-info">
                            <h3>
                              <div>
                                {item?.client?.firstname +
                                  " " +
                                  item?.client?.lastname}{" "}
                              </div>
                            </h3>

                            <div className="patient-details">
                              <h5>
                                <b>Client ID :</b> {idx + 1}
                              </h5>
                              <h5 className="mb-0">
                                <i className="fas fa-map-marker-alt"></i>{" "}
                                {item?.client?.country +
                                  ", " +
                                  item?.client?.city}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="patient-info">
                        <ul>
                          {item?.client?.phone ? (
                            <li>
                              Phone <span>{item?.client?.phone}</span>
                            </li>
                          ) : (
                            ""
                          )}
                          {item?.client?.gender ? (
                            <li>
                              Gender <span> {item.client?.gender}</span>
                            </li>
                          ) : (
                            ""
                          )}
                          {item?.client?.bloodgroup ? (
                            <li>
                              Blood Group{" "}
                              <span>{item?.client?.bloodgroup}</span>
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              );
            })
          ) : (
            <div className="no-Appoinents">
              <span>You Don't Have any Clients</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default MyClient;
