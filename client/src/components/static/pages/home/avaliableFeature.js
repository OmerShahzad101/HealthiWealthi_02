import React from "react";
import Slider from "react-slick";

const AvaliableFeature = () => {
  const settingsAvaliableFeature = {
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 3,
    speed: 500,
    variableWidth: true,
    arrows: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5 features-img">
          <img
            src="/assets/img/features/feature.png"
            className="img-fluid"
            alt="Feature"
          />
        </div>
        <div className="col-md-7">
          <div className="section-header">
            <h2 className="mt-2">Availabe Features in Our Website</h2>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="features-slider slider">
            <Slider {...settingsAvaliableFeature}>
              <div className="feature-item text-center">
                <img
                  src="/assets/img/features/feature-01.jpg"
                  className="img-fluid"
                  alt="Feature"
                />
                <p>Patient Ward</p>
              </div>

              <div className="feature-item text-center">
                <img
                  src="/assets/img/features/feature-02.jpg"
                  className="img-fluid"
                  alt="Feature"
                />
                <p>Test Room</p>
              </div>

              <div className="feature-item text-center">
                <img
                  src="/assets/img/features/feature-03.jpg"
                  className="img-fluid"
                  alt="Feature"
                />
                <p>ICU</p>
              </div>

              <div className="feature-item text-center">
                <img
                  src="/assets/img/features/feature-01.jpg"
                  className="img-fluid"
                  alt="Feature"
                />
                <p>Chat with coach</p>
              </div>

              <div className="feature-item text-center">
                <img
                  src="/assets/img/features/feature-05.jpg"
                  className="img-fluid"
                  alt="audio"
                />
                <p>Audio consultation</p>
              </div>

              <div className="feature-item text-center">
                <img
                  src="/assets/img/features/feature-06.jpg"
                  className="img-fluid"
                  alt="Feature"
                />
                <p>Video consultation</p>
              </div>
              <div className="feature-item text-center">
                <img
                  src="/assets/img/features/feature-06.jpg"
                  className="img-fluid"
                  alt="Feature"
                />
                <p>Video consultation</p>
              </div>
              <div className="feature-item text-center">
                <img
                  src="/assets/img/features/feature-06.jpg"
                  className="img-fluid"
                  alt="Feature"
                />
                <p>Video consultation</p>
              </div>
              <div className="feature-item text-center">
                <img
                  src="/assets/img/features/feature-06.jpg"
                  className="img-fluid"
                  alt="Feature"
                />
                <p>Video consultation</p>
              </div>
              <div className="feature-item text-center">
                <img
                  src="/assets/img/features/feature-06.jpg"
                  className="img-fluid"
                  alt="Feature"
                />
                <p>Video consultation</p>
              </div>
              <div className="feature-item text-center">
                <img
                  src="/assets/img/features/feature-06.jpg"
                  className="img-fluid"
                  alt="Feature"
                />
                <p>Video consultation</p>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvaliableFeature;
