import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useEffect, useState, useRef } from "react";
import { getHttpRequest, postHttpRequest } from "../../../../axios";
import { useSelector } from "react-redux";
import Toast from "../../../common/toast/Toast";

const CoachSlider = () => {
  const mediaPath = process.env.REACT_APP_IMG;
  const userId = useSelector((state) => state.auth.user.userid);
  const role = useSelector((state) => state.auth.user.userRole);

  const [coachList, setCoachList] = useState([]);

  const settings = {
    dots: false,
    autoplay: false,
    infinite: false,
    variableWidth: true,
  };

  useEffect(() => {
    getHttpRequest("/front/coach/list")
      .then((response) => {
        setCoachList(response.data.data.coaches);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  const favorite = (e) => {
    const payload = {
      coachId: e,
      clientId: userId,
    };

    postHttpRequest("/front/favourites/create", payload)
      .then((response) => {
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
        if (response) {
          getHttpRequest("/front/coach/list").then((response) => {
            setCoachList(response.data.data.coaches);
          });
        }
      })
      .catch((response) => {
        Toast.fire({
          icon: "error",
          title: response.data.message,
        });
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4">
          <div className="section-header ">
            <h2 className="mb-4 mt-1">Book Our Coach</h2>
            <p className="mb-3">Lorem Ipsum is simply dummy text </p>
            <p className="mb-3">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum.{" "}
            </p>
            <p>
              web page editors now use Lorem Ipsum as their default model text,
              and a search for 'lorem ipsum' will uncover many web sites still
              in their infancy. Various versions have evolved over the years,
              sometimes{" "}
            </p>
          </div>
        </div>

        <div className="col-lg-8 doctor-slider slider">
          {coachList ? (
            <Slider {...settings}>
              {coachList.map(
                (e, idx) =>
                  e?.firstname &&
                  e?.lastname && (
                    <div key={`coach_${idx}`} className="profile-widget">
                      <div className="doc-img">
                        <Link to={"/coach-profile/" + e?._id}>
                          <img
                            className="img-fluid"
                            alt="User"
                            src={
                              e?.fileName
                                ? mediaPath + e.fileName
                                : mediaPath + "avatar.jpg"
                            }
                          />
                        </Link>
                        {role === 1 && (
                          <>
                            {e?.isFavourite === true ? (
                              <a
                                className="not-fav-btn"
                                onClick={() => favorite(e?._id)}
                              >
                                <i className="far fa-bookmark"></i>
                              </a>
                            ) : (
                              <a
                                className="fav-btn"
                                onClick={() => favorite(e?._id)}
                              >
                                <i className="far fa-bookmark"></i>
                              </a>
                            )}
                          </>
                        )}
                      </div>
                      <div className="pro-content">
                        <h3 className="title">
                          <Link to={"/coach-profile/" + e?._id}>
                            {e?.firstname + " " + e?.lastname}
                          </Link>
                          <i className="fas fa-check-circle verified"></i>
                        </h3>
                        <p className="speciality">
                          {e?.specialization && e.specialization != ""
                            ? e.specialization
                            : "N/A"}
                        </p>

                        <ul className="available-info">
                          {(e.country || e.city) && (
                            <li>
                              <i className="fas fa-map-marker-alt"></i>
                              {e?.country + ", " + e?.city}
                            </li>
                          )}

                          <li>
                            <i className="far fa-money-bill-alt"></i>
                            {e?.price}{" "}
                            <i
                              className="fas fa-info-circle"
                              data-toggle="tooltip"
                              title="Lorem Ipsum"
                            ></i>
                          </li>
                        </ul>
                        <div className="row row-sm">
                          <div className="col-6">
                            <Link
                              to={"/coach-profile/" + e?._id}
                              className="btn view-btn"
                            >
                              View Profile
                            </Link>
                          </div>
                          {role === 1 ? (
                            <div className="col-6">
                              <Link
                                to={"/app/book-appointment/" + e?._id}
                                className="btn book-btn"
                              >
                                Book Now
                              </Link>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </Slider>
          ) : (
            <div className="no_data">
              <span>No Coaches found</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachSlider;
