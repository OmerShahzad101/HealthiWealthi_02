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
                    src="assets/img/specialities/specialities-01.png"
                    className="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Urology</p>
              </div>
              <div className="speicality-item text-center">
                <div className="speicality-img">
                  <img
                    src="assets/img/specialities/specialities-02.png"
                    className="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Neurology</p>
              </div>
              <div className="speicality-item text-center">
                <div className="speicality-img">
                  <img
                    src="assets/img/specialities/specialities-03.png"
                    className="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Orthopedic</p>
              </div>
              <div className="speicality-item text-center">
                <div className="speicality-img">
                  <img
                    src="assets/img/specialities/specialities-04.png"
                    className="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Cardiologist</p>
              </div>
              <div className="speicality-item text-center">
                <div className="speicality-img">
                  <img
                    src="assets/img/specialities/specialities-05.png"
                    className="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Dentist</p>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialities;
