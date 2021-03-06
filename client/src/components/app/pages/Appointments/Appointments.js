import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getHttpRequest,
  postHttpRequest,
  putHttpRequest,
} from "../../../../axios";
import imagePath from "../../../../utils/url/imagePath";


const Appointments = () => {
  const coachId = useSelector((state) => state.auth.user.userid);
  const [appointments, setAppointments] = useState();
  const [appointmentStatus, setAppointmentStatus] = useState(false);
  const mediaPath = process.env.REACT_APP_IMG;
  const userImage = useSelector((state) => state.auth.user.fileName);

  useEffect(() => {
    getHttpRequest(`/front/booking/get/${coachId}`)
      .then((response) => {
        console.log("booking:", response);
        const newArr = response?.data?.BookingData.filter(
          (item) => item.status == "pending"
        );
        setAppointments(newArr);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, [appointmentStatus]);

  const updateBooking = async (value, _id, CliendId) => {
    const statusDetail = {
      bookingStatus: value,
      _id,
    };
    const res = await putHttpRequest("front/booking/status", statusDetail);
    if (res) {
      postHttpRequest("front/notification/create", {
        from: coachId,
        to: CliendId,
        content: `${value} your appoinment`,
        isRead: "false",
        type: 1,
      });
    }
    setAppointmentStatus(true);
  };

  return (
    <div className="col-md-7 col-lg-8 col-xl-9">
      {appointments && appointments.length > 0 ? (
        appointments.map((item, idx) => {
          return (
            item?.client?.firstname &&
            item?.status == "pending" && (
              <div>
                <div className="appointments">
                  <div className="appointment-list">
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
                          {" "}
                          {item?.client?.firstname}&nbsp;
                          {item?.client?.lastname}
                        </h3>
                        <div className="patient-details">
                          <h5>
                            <i className="far fa-clock"></i>
                            {item.bookingDate}&nbsp;&nbsp;
                            {item.slots}
                          </h5>
                          <h5>
                            <i className="fas fa-map-marker-alt"></i>{" "}
                            {item?.client?.country + ", " + item?.client?.city}
                          </h5>
                          <h5>
                            {" "}
                            <i className="fas fa-envelope"></i>{" "}
                            {item?.client?.email}
                          </h5>
                          <h5>
                            {item?.client?.phone ? (
                              <h5>
                                <i className="fas fa-phone"></i>{" "}
                                <span>{item?.client?.phone}</span>
                              </h5>
                            ) : (
                              ""
                            )}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="appointment-action">
                      {/* <a href="#" className="btn btn-sm bg-info-light" data-toggle="modal" data-target="#appt_details"><i className="far fa-eye"></i> View</a> */}
                      <button
                        onClick={() =>
                          updateBooking("Approved", item._id, item.client._id)
                        }
                        className="btn btn-sm bg-success-light"
                      >
                        <i className="fas fa-check"></i> Accept
                      </button>
                      <button
                        onClick={() =>
                          updateBooking("Cancelled", item._id, item.client._id)
                        }
                        className="btn btn-sm bg-danger-light"
                      >
                        <i className="fas fa-times"></i> Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          );
        })
      ) : (
        <div className="no-Appoinents">
          <span>You Don't Have any Appoinments</span>
        </div>
      )}
    </div>
  );
};

export default Appointments;
