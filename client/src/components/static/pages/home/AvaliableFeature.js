import React from "react";
import Slider from "react-slick";

const AvaliableFeature = () => {
  const settingsAvaliableFeature = {
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll:1,
    speed: 500,
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
          <div className="">
            <Slider {...settingsAvaliableFeature}>

              <div className="feature-item text-center">
                <img
                  src="/assets/img/features/call.png"
                  className="img-fluid"
                  alt="Feature"
                />
                <p>Audio consultation</p>
              </div>
              <div className="feature-item text-center">
                <img
                  src="/assets/img/features/customer-service.png"
                  className="img-fluid"
                  alt="Feature"
                />
                <p>Chat with coach</p>
              </div>

              <div className="feature-item text-center">
                <img
                  src="/assets/img/features/video-call.png"
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
