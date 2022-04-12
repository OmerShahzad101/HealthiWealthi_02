import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getHttpRequest } from "../../../../axios";
const BookAppointment = () => {
  const location = useLocation();
  const { id } = location.state;
  const [coachProfileData, setCoachProfileData] = useState([]);
  useEffect(async () => {
    let res = await getHttpRequest(`/front/coach/get/${id}`);
    console.log(res);
    setCoachProfileData(res?.data?.coach);
  }, []);

  return (
    <>
      {/* <!-- Page Content --> */}

      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="card">
          <div className="card-body">
            <div className="booking-doc-info">
              <Link to="/coach-profile" className="booking-doc-img">
                <img
                  src="assets/img/doctors/doctor-thumb-02.jpg"
                  alt="User Image"
                />
              </Link>
              <div className="booking-info">
                <h4>
                  <Link to="/coach-profile">
                    {coachProfileData.firstname} {coachProfileData.lastname}
                  </Link>
                </h4>
                <div className="rating">
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star"></i>
                  <span className="d-inline-block average-rating">35</span>
                </div>
                <p className="text-muted mb-0">
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {coachProfileData.country}
                  {", "}
                  {coachProfileData.city}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Schedule Widget --> */}
        <div className="card booking-schedule schedule-widget">
          {/* <!-- Schedule Header --> */}
          <div className="schedule-header">
            <div className="row">
              <div className="col-md-12">
                {/* <!-- Day Slot --> */}
                <div className="day-slot">
                  <ul>
                    <li className="left-arrow">
                      <a href="#">
                        <i className="fa fa-chevron-left"></i>
                      </a>
                    </li>
                    <li>
                      <span>Mon</span>
                      <span className="slot-date">
                        11 Nov
                        <small className="slot-year"> 2021</small>
                      </span>
                    </li>
                    <li>
                      <span>Tue</span>
                      <span className="slot-date">
                        12 Nov
                        <small className="slot-year"> 2021</small>
                      </span>
                    </li>
                    <li>
                      <span>Wed</span>
                      <span className="slot-date">
                        13 Nov
                        <small className="slot-year"> 2021</small>
                      </span>
                    </li>
                    <li>
                      <span>Thu</span>
                      <span className="slot-date">
                        14 Nov
                        <small className="slot-year"> 2021</small>
                      </span>
                    </li>
                    <li>
                      <span>Fri</span>
                      <span className="slot-date">
                        15 Nov
                        <small className="slot-year"> 2021</small>
                      </span>
                    </li>
                    <li>
                      <span>Sat</span>
                      <span className="slot-date">
                        16 Nov
                        <small className="slot-year"> 2021</small>
                      </span>
                    </li>
                    <li>
                      <span>Sun</span>
                      <span className="slot-date">
                        17 Nov
                        <small className="slot-year"> 2021</small>
                      </span>
                    </li>
                    <li className="right-arrow">
                      <a href="#">
                        <i className="fa fa-chevron-right"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <!-- /Day Slot --> */}
              </div>
            </div>
          </div>
          {/* <!-- /Schedule Header --> */}

          {/* <!-- Schedule Content --> */}
          <div className="schedule-cont">
            <div className="row">
              <div className="col-md-12">
                {/* <!-- Time Slot --> */}
                <div className="time-slot">
                  <ul className="clearfix">
                    <li>
                      <a className="timing" href="#">
                        <span>9:00</span> <span>AM</span>
                      </a>
                      <a className="timing" href="#">
                        <span>10:00</span> <span>AM</span>
                      </a>
                      <a className="timing" href="#">
                        <span>11:00</span> <span>AM</span>
                      </a>
                    </li>
                    <li>
                      <a className="timing" href="#">
                        <span>9:00</span> <span>AM</span>
                      </a>
                      <a className="timing" href="#">
                        <span>10:00</span> <span>AM</span>
                      </a>
                      <a className="timing" href="#">
                        <span>11:00</span> <span>AM</span>
                      </a>
                    </li>
                    <li>
                      <a className="timing" href="#">
                        <span>9:00</span> <span>AM</span>
                      </a>
                      <a className="timing" href="#">
                        <span>10:00</span> <span>AM</span>
                      </a>
                      <a className="timing" href="#">
                        <span>11:00</span> <span>AM</span>
                      </a>
                    </li>
                    <li>
                      <a className="timing" href="#">
                        <span>9:00</span> <span>AM</span>
                      </a>
                      <a className="timing" href="#">
                        <span>10:00</span> <span>AM</span>
                      </a>
                      <a className="timing" href="#">
                        <span>11:00</span> <span>AM</span>
                      </a>
                    </li>
                    <li>
                      <a className="timing" href="#">
                        <span>9:00</span> <span>AM</span>
                      </a>
                      <a className="timing selected" href="#">
                        <span>10:00</span> <span>AM</span>
                      </a>
                      <a className="timing" href="#">
                        <span>11:00</span> <span>AM</span>
                      </a>
                    </li>
                    <li>
                      <a className="timing" href="#">
                        <span>9:00</span> <span>AM</span>
                      </a>
                      <a className="timing" href="#">
                        <span>10:00</span> <span>AM</span>
                      </a>
                      <a className="timing" href="#">
                        <span>11:00</span> <span>AM</span>
                      </a>
                    </li>
                    <li>
                      <a className="timing" href="#">
                        <span>9:00</span> <span>AM</span>
                      </a>
                      <a className="timing" href="#">
                        <span>10:00</span> <span>AM</span>
                      </a>
                      <a className="timing" href="#">
                        <span>11:00</span> <span>AM</span>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <!-- /Time Slot --> */}
              </div>
            </div>
          </div>
          {/* <!-- /Schedule Content --> */}
        </div>
        {/* <!-- /Schedule Widget --> */}

        {/* <!-- Submit Section --> */}
        <div className="submit-section proceed-btn text-end">
          <Link to="/checkout" className="btn btn-primary submit-btn">
            Proceed to Pay
          </Link>
        </div>
        {/* <!-- /Submit Section --> */}
      </div>

      {/* <!-- /Page Content --> */}
    </>
  );
};

export default BookAppointment;
