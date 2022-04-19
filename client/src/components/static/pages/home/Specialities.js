import React from "react";
import Slider from "react-slick";

const Specialities = () => {
  const settingsSpecialities = {
    dots: true,
    autoplay:false,
    infinite: true,
    variableWidth: true,
    arrows: false,
  };
  
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
          <div className="specialities-slider slider">
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
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialities;
