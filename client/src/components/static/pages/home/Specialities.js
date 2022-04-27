import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getHttpRequest } from "../../../../axios";

const Specialities = () => {
  const settingsSpecialities = {
    dots: true,
    autoplay: false,
    infinite: true,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  const [specialities, setSpecialities] = useState();

  useEffect(() => {
    const res = getHttpRequest("admin/services/list").then((response) => {
      console.log(response);
      setSpecialities(response.data.data.services);
    });
  },[]);

  return (
    <div className="container-fluid">
      <div className="section-header text-center">
        <h2>Clinic and Specialities</h2>
        <p className="sub-title">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-9">
          <div className="">
            <Slider {...settingsSpecialities}>
              <div className="speicality-item text-center">
                <div className="speicality-img">
                  <img
                    src="assets/img/specialities/meditation.png"
                    className="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Yoga Experts</p>
              </div>
              <div className="speicality-item text-center">
                <div className="speicality-img">
                  <img
                    src="assets/img/specialities/nutrition.png"
                    className="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Nutritionist</p>
              </div>
              <div className="speicality-item text-center">
                <div className="speicality-img">
                  <img
                    src="assets/img/specialities/suncream.png"
                    className="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Dermatologist</p>
              </div>
              <div className="speicality-item text-center">
                <div className="speicality-img">
                  <img
                    src="assets/img/specialities/liposuction.png"
                    className="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Gym Coaches</p>
              </div>
              <div className="speicality-item text-center">
                <div className="speicality-img">
                  <img
                    src="assets/img/specialities/dumbbell.png"
                    className="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Cardio Care</p>
              </div>
              <div className="speicality-item text-center">
                <div className="speicality-img">
                  <img
                    src="assets/img/specialities/lunges.png"
                    className="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Streching</p>
              </div>
              <div className="speicality-item text-center">
                <div className="speicality-img">
                  <img
                    src="assets/img/specialities/runner.png"
                    className="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Lifestyle</p>
              </div>
              <div className="speicality-item text-center">
                <div className="speicality-img">
                  <img
                    src="assets/img/specialities/fitness.png"
                    className="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Weight Training</p>
              </div>
              <div className="speicality-item text-center">
                <div className="speicality-img">
                  <img
                    src="assets/img/specialities/weightlifting.png"
                    className="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Crossfit</p>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialities;
