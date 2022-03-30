import React from "react";
import { Link } from "react-router-dom";

const BookingSuccessful = () => {
  return (
    <div className="col-md-7 col-lg-8 col-xl-9">
      <div className="card success-card">
        <div className="card-body">
          <div className="success-cont">
            <i className="fas fa-check"></i>
            <h3>Appointment booked Successfully!</h3>
            <p>
              Appointment booked with <strong>Dr. Darren Elder</strong>
              <br /> on <strong>12 Nov 2019 5:00PM to 6:00PM</strong>
            </p>
            <Link to="/invoice" className="btn btn-primary view-inv-btn">
              View Invoice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessful;
