import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getHttpRequest } from "../../../../axios";

export default function Home(props) {

  const [coachList, setCoachList] = useState([]);

  useEffect(() => {
    getHttpRequest("/front/coach/list")
      .then((response) => {
        console.log(response);
        setCoachList(response.data.data.coaches);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  console.log("data", coachList);

  const settings = {
    dots: false,
    autoplay: false,
    infinite: true,
    variableWidth: true,
    speed: 500,
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
            <div className="col-lg-8 doctor-slider slider">
              {coachList ? (<>
              
             {coachList.length > 3 ?
             <Slider {...settings}>
                {coachList.map((e, idx) =>
                 e?.firstname && e?.lastname &&
                 <div key={`coach_${idx}`}className="profile-widget">
                  <div className="doc-img">
                    <Link to="/coach-profile">
                      <img
                        className="img-fluid"
                        alt="User"
                        src="assets/img/doctors/doctor-02.jpg"
                      />
                    </Link>
                    <a href="#" className="fav-btn">
                      <i className="far fa-bookmark"></i>
                    </a>
                  </div>
                  <div className="pro-content">
                    <h3 className="title">
                      <Link to="/coach-profile">{e?.firstname + " " + e?.lastname}</Link>
                      <i className="fas fa-check-circle verified"></i>
                    </h3>
                    {e?.specialization && <p className="speciality">
                      {e?.specialization}
                    </p>}
                    {/* <div className="rating">
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star"></i>
                      <span className="d-inline-block average-rating">
                        (35)
                      </span>
                    </div> */}
                    <ul className="available-info">
                     {( e.country || e.city ) && 
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
                      <div className="col-6">
                        <Link to="app/book-appointment" className="btn book-btn">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
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

              </Slider> 
              : 
                coachList.map((e, idx) =>
                 e?.firstname && e?.lastname &&
                 <div key={`coach_${idx}`}className="profile-widget">
                  <div className="doc-img">
                    <Link to="/coach-profile">
                      <img
                        className="img-fluid"
                        alt="User"
                        src="assets/img/doctors/doctor-02.jpg"
                      />
                    </Link>
                    <a href="#" className="fav-btn">
                      <i className="far fa-bookmark"></i>
                    </a>
                  </div>
                  <div className="pro-content">
                    <h3 className="title">
                      <Link to="/coach-profile">{e?.firstname + " " + e?.lastname}</Link>
                      <i className="fas fa-check-circle verified"></i>
                    </h3>
                    {e?.specialization && <p className="speciality">
                      {e?.specialization}
                    </p>}
                    {/* <div className="rating">
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star"></i>
                      <span className="d-inline-block average-rating">
                        (35)
                      </span>
                    </div> */}
                    <ul className="available-info">
                     {( e.country || e.city ) && 
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
                      <div className="col-6">
                        <Link to="app/book-appointment" className="btn book-btn">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </>
              ) : <div className="no_data">
                <span>No Coaches found</span>
              </div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
