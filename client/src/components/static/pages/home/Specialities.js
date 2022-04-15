import React from "react";

const Specialities = () => {
  return (
      <div class="container-fluid">
        <div class="section-header text-center">
          <h2>Clinic and Specialities</h2>
          <p class="sub-title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-9">
            <div class="specialities-slider slider">
              <div class="speicality-item text-center">
                <div class="speicality-img">
                  <img
                    src="assets/img/specialities/specialities-01.png"
                    class="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i class="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Urology</p>
              </div>
              <div class="speicality-item text-center">
                <div class="speicality-img">
                  <img
                    src="assets/img/specialities/specialities-02.png"
                    class="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i class="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Neurology</p>
              </div>
              <div class="speicality-item text-center">
                <div class="speicality-img">
                  <img
                    src="assets/img/specialities/specialities-03.png"
                    class="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i class="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Orthopedic</p>
              </div>
              <div class="speicality-item text-center">
                <div class="speicality-img">
                  <img
                    src="assets/img/specialities/specialities-04.png"
                    class="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i class="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Cardiologist</p>
              </div>
              <div class="speicality-item text-center">
                <div class="speicality-img">
                  <img
                    src="assets/img/specialities/specialities-05.png"
                    class="img-fluid"
                    alt="Speciality"
                  />
                  <span>
                    <i class="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <p>Dentist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Specialities;
