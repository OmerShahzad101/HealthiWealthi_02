import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useEffect, useState, useRef } from "react";
import { getHttpRequest, postHttpRequest } from "../../../../axios";
import { useSelector } from "react-redux";
import Toast from "../../../common/toast/Toast";
import Specialities from "./Specialities";

import { useHistory } from "react-router-dom";
export default function Home(props) {
  const mediaPath = process.env.REACT_APP_IMG;
  console.log("process.env", process.env);
  const userId = useSelector((state) => state.auth.user.userid);
  const [coachList, setCoachList] = useState([]);
  const searchNameRef = useRef();
  const history = useHistory();
  let payload;
  const role = useSelector((state) => state.auth.user.userRole);
  useEffect(() => {
    getHttpRequest("/front/coach/list")
      .then((response) => {
        setCoachList(response.data.data.coaches);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);
  const searchHandler = (e) => {
    e.preventDefault();
    payload = {
      searchName: searchNameRef.current.value,
    };
    postHttpRequest("/front/search", payload)
      .then((response) => {
        if (response.data) {
          history.push({
            pathname: "/search-coach",
            state: { name: { payload } },
          });
        }
      })
      .catch((response) => {
        console.log("Error");
      });
    console.log(payload);
  };
  const settings = {
    dots: false,
    autoplay: false,
    infinite: true,
    variableWidth: true,
  };
  const favorite = (e) => {
    const payload = {
      coachId: e,
      clientId: userId,
    };
    postHttpRequest("/front/favourites/create", payload)
      .then((response) => {
        if(response){
        getHttpRequest("/front/coach/list")
        .then((response) => {
          setCoachList(response.data.data.coaches);
        })
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
    <>
      <section className="section section-search">
        <div className="container-fluid">
          <div className="banner-wrapper">
            <div className="banner-header text-center">
              <h1>Search Coach, Make an Appointment</h1>
              <p>Discover the best Couch nearest to you.</p>
            </div>

            {/* <!-- Search --> */}
            <div className="search-box">
              <form action="#">
                <div className="form-group search-location">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Location"
                  />
                  <span className="form-text">Based on your Location</span>
                </div>
                <div className="form-group search-info">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Coach"
                  />
                  <span className="form-text">
                    Ex : Nutritionists or Yoga Expert etc
                  </span>
                </div>
                <button type="submit" className="btn btn-primary search-btn">
                  <i className="fas fa-search"></i> <span>Search</span>
                </button>
              </form>
            </div>
            {/* <!-- /Search --> */}
          </div>
        </div>
      </section>
      <section class="section section-specialities">
        {/* <Specialities /> */}
      </section>

      <section className="section section-doctor">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <div className="section-header ">
                <h2>Book Our Coach</h2>
                <p>Lorem Ipsum is simply dummy text </p>
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
                            <Link to="/coach-profile">
                              <img
                                className="img-fluid"
                                alt="User"
                                src={
                                  e?.profileImage
                                    ? mediaPath + e.profileImage
                                    : mediaPath + "avatar.jpg"
                                }
                              />
                            </Link>
                            {role === 1 && (
                              <>
                                {e?.isFavourite === true ? (
                                  <a className="not-fav-btn" onClick={() => favorite(e?._id)}>
                                    <i
                                      className="far fa-bookmark" 
                                    ></i>
                                  </a>
                                ) : (
                                  <a className="fav-btn" onClick={() => favorite(e?._id)}>
                                    <i
                                      className="far fa-bookmark"
                                    ></i>
                                  </a>
                                )}
                              </>
                            )}
                          </div>
                          <div className="pro-content">
                            <h3 className="title">
                              <Link to="/coach-profile">
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
                                  to="/coach-profile"
                                  className="btn view-btn"
                                >
                                  View Profile
                                </Link>
                              </div>
                              {role === 1 ? (
                                <div className="col-6">
                                  <Link
                                    to="app/book-appointment"
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
      </section>
    </>
  );
}
