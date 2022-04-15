import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getHttpRequest, postHttpRequest } from "../../../../axios";
import { useSelector } from "react-redux";
import Toast from "../../../common/toast/Toast";
export default function Home(props) {
  const mediaPath = process.env.REACT_APP_IMG;
  console.log("process.env", process.env);
  const userId = useSelector((state) => state.auth.user.userid);
  const [coachList, setCoachList] = useState([]);
  const role = useSelector(state => state.auth.user.userRole);
  useEffect(() => {
    getHttpRequest("/front/coach/list")
      .then((response) => {
        setCoachList(response.data.data.coaches);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  const settings = {
    dots: false,
    autoplay: false,
    infinite: true,
    variableWidth: true,
  };
  const favorite = (e) => {
    const payload = {
      coachId: e,
      clientId: userId
    }
     postHttpRequest("/front/favourites/create", payload).then((response) => {
      Toast.fire({
        icon: "success",
        title: response.data.message
      })
    })
    .catch((response) => {
      Toast.fire({
        icon: "error",
        title: response.data.message
      })
    });
  }
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
        <section className="section section-doctor">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4">
                <div className="section-header ">
                  <h2>Book Our Coach</h2>
                  <p>Lorem Ipsum is simply dummy text </p>
                </div>
                <div className="about-content">
                  <p>
                    It is a long established fact that a reader will be distracted
                    by the readable content of a page when looking at its layout.
                    The point of using Lorem Ipsum.
                  </p>
                  <p>
                    web page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes
                  </p>
                  <a href="#">Read More..</a>
                </div>
              </div>
<<<<<<< HEAD
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
                                src="assets/img/doctors/doctor-02.jpg"
                              />
                            </Link>
                            {console.log("role", role)}
                            {role == 1 && (
                              <a className="fav-btn">
                                <i
                                  className="far fa-bookmark"
                                  onClick={() => favorite(e?._id)}
                                ></i>
                              </a>
                            )}
                          </div>
                          <div className="pro-content">
                            <h3 className="title">
                              <Link to="/coach-profile">
                                {e?.firstname + " " + e?.lastname}
                              </Link>
                              <i className="fas fa-check-circle verified"></i>
                            </h3>
                            <p className="speciality">{e?.about}</p>
                            {/* <div className="rating">
=======
              <div className="col-lg-8 doctor-slider slider">
                {coachList ? (<Slider {...settings}>
                  {coachList.map((e, idx) =>
                    e?.firstname && e?.lastname && <div key={`coach_${idx}`} className="profile-widget">
                      <div className="doc-img">
                        <Link to="/coach-profile">
                          <img
                            className="img-fluid"
                            alt="User"
                            src={e?.profileImage ? mediaPath+e.profileImage : mediaPath+'avatar.jpg'}
                          />
                        </Link>
                        {role == 1 && <a className="fav-btn">
                          <i className="far fa-bookmark" onClick={() => favorite(e?._id)} ></i>
                        </a>}
                      </div>
                      <div className="pro-content">
                        <h3 className="title">
                          <Link to="/coach-profile">{e?.firstname + " " + e?.lastname}</Link>
                          <i className="fas fa-check-circle verified"></i>
                        </h3>
                        <p className="speciality">
                          {e?.specialization && e.specialization != ''  ? e.specialization: 'N/A'}
                        </p>
                        {/* <div className="rating">
>>>>>>> a5bf3158f4e83bd7b83b2eb4ce5c577190fe57f7
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star"></i>
                      <span className="d-inline-block average-rating">
                        (35)
                      </span>
                    </div> */}
<<<<<<< HEAD
                            <ul className="available-info">
                              {(e.country || e.city) && (
                                <li>
                                  <i className="fas fa-map-marker-alt"></i>
                                  {e?.country + ", " + e?.city}
                                </li>
                              )}
                              {/* <li>
                        <i className="far fa-clock"></i> Available on Fri, 22
                        Mar
                      </li> */}
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
                                  to={{
                                    pathname: "/coach-profile",
                                    state: { id: e?._id },
                                  }}
                                  // to="/coach-profile"
                                  className="btn view-btn"
                                >
                                  View Profile
                                </Link>
                              </div>
                              {role === 3 ? (
                                <div className="col-6">
                                  <button disabled className="disable-book-btn">
                                    Book Now
                                  </button>
                                </div>
                              ) : (
                                <div className="col-6">
                                  <Link
                                    to="app/book-appointment"
                                    className="btn book-btn"
                                  >
                                    Book Now
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
=======
                        <ul className="available-info">
                          {(e.country || e.city) &&
                            <li>
                              <i className="fas fa-map-marker-alt"></i>{e?.country + ", " + e?.city}
                            </li>
                          }
                          {/* <li>
                        <i className="far fa-clock"></i> Available on Fri, 22
                        Mar
                      </li> */}
                          <li>
                            <i className="far fa-money-bill-alt"></i>{e?.price}{" "}
                            <i
                              className="fas fa-info-circle"
                              data-toggle="tooltip"
                              title="Lorem Ipsum"
                            ></i>
                          </li>
                        </ul>
                        <div className="row row-sm">
                          <div className="col-6">
                            <Link to="/coach-profile" className="btn view-btn">
                              View Profile
                            </Link>
                          </div>
                          {role === 1 ?
                            <div className="col-6">
                              <Link to="app/book-appointment" className="btn book-btn">
                                Book Now
                              </Link>
                            </div> : ""
                            //  <div className="col-6">
                            //   <button disabled className="disable-book-btn">
                            //     Book Now
                            //   </button>
                            //  </div>
                          }
                        </div>
                      </div>
                    </div>
>>>>>>> a5bf3158f4e83bd7b83b2eb4ce5c577190fe57f7
                  )}

                  {/* <div className="profile-widget">
                  <div className="doc-img">
                    <Link to="/coach-profile">
                      <img
                        className="img-fluid"
                        alt="User"
                        src="assets/img/doctors/doctor-08.jpg"
                      />
                    </Link>
                    <a href="#" className="fav-btn">
                      <i className="far fa-bookmark"></i>
                    </a>
                  </div>
                  <div className="pro-content">
                    <h3 className="title">
                      <Link to="/coach-profile">Paul Richard</Link>
                      <i className="fas fa-check-circle verified"></i>
                    </h3>
                    <p className="speciality">
                      MBBS, MD - Dermatology , Venereology & Lepros
                    </p>
                    <div className="rating">
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star"></i>
                      <span className="d-inline-block average-rating">
                        (49)
                      </span>
                    </div>
                    <ul className="available-info">
                      <li>
                        <i className="fas fa-map-marker-alt"></i> California,
                        USA
                      </li>
                      <li>
                        <i className="far fa-clock"></i> Available on Fri, 22
                        Mar
                      </li>
                      <li>
                        <i className="far fa-money-bill-alt"></i> $100 - $400
                        <i
                          className="fas fa-info-circle"
                          data-toggle="tooltip"
                          title="Lorem Ipsum"
                        ></i>
                      </li>
                    </ul>
                    <div className="row row-sm">
                      <div className="col-6">
                        <Link to="/coach-profile" className="btn view-btn">
                          View Profile
                        </Link>
                      </div>
                      <div className="col-6">
                        <Link to="/book-appointment" className="btn book-btn">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div> */}
<<<<<<< HEAD
                </Slider>
              ) : (
                <div className="no_data">
                  <span>No Coaches found</span>
                </div>
              )}
=======

                </Slider>) : <div className="no_data">
                  <span>No Coaches found</span>
                </div>}
              </div>
>>>>>>> a5bf3158f4e83bd7b83b2eb4ce5c577190fe57f7
            </div>
          </div>
        </section>
      </>
    );
  }
