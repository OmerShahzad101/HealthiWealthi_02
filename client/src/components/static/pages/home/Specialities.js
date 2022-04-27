import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getHttpRequest } from "../../../../axios";

const Specialities = () => {
  const mediaPath = process.env.REACT_APP_IMG;

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
      setSpecialities(response.data.data.services);
    });
  }, []);

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
              {specialities && specialities.length > 0
                ? specialities.map((item) => (
                    <div className="speicality-item text-center">
                      <div className="speicality-img">
                        <img
                          src={mediaPath + item.logo}
                          className="img-fluid"
                          alt="Speciality"
                        />
                        <span>
                          <i className="fa fa-circle" aria-hidden="true"></i>
                        </span>
                      </div>
                      <p>{item.name}</p>
                    </div>
                  ))
                : ""}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialities;
