import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// --------------------------------
import { getHttpRequest } from "../../../../axios";
const SearchCoach = () => {
  const [coachList, setCoachList] = useState([]);
  useEffect(() => {
    getHttpRequest("/front/coach/list")
      .then((response) => {
        console.log(response);
        setCoachList(response.data.data.coaches);
      })
      .catch(() => {
        alert("error");
      });
  }, []);

  return (
    <>
      <div className="breadcrumb-bar">
        {console.log(coachList)}{" "}
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-8 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Search
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">
                100+ matches found for : Coach In USA
              </h2>
            </div>
            <div className="col-md-4 col-12 d-md-block d-none">
              <div className="sort-by">
                <span className="sort-title">Sort by</span>
                <span className="sortby-fliter">
                  <select className="select">
                    <option>Select</option>
                    <option className="sorting">Rating</option>
                    <option className="sorting">Popular</option>
                    <option className="sorting">Latest</option>
                    <option className="sorting">Free</option>
                  </select>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-3 theiaStickySidebar">
              <div className="card search-filter">
                <div className="card-header">
                  <h4 className="card-title mb-0">Search Filter</h4>
                </div>
                <div className="card-body">
                  <div className="filter-widget">
                    <div className="cal-icon">
                      <input
                        type="text"
                        className="form-control datetimepicker"
                        placeholder="Select Date"
                      />
                    </div>
                  </div>
                  <div className="filter-widget">
                    <h4>Gender</h4>
                    <div>
                      <label className="custom_check">
                        <input type="checkbox" name="gender_type" checked />
                        <span className="checkmark"></span> Male Coach
                      </label>
                    </div>
                    <div>
                      <label className="custom_check">
                        <input type="checkbox" name="gender_type" />
                        <span className="checkmark"></span> Female Coach
                      </label>
                    </div>
                  </div>
                  <div className="filter-widget">
                    <h4>Select Specialist</h4>
                    <div>
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          name="select_specialist"
                          checked
                        />
                        <span className="checkmark"></span> Kick Boxing
                      </label>
                    </div>
                    <div>
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          name="select_specialist"
                          checked
                        />
                        <span className="checkmark"></span> Yoga Expert
                      </label>
                    </div>
                    <div>
                      <label className="custom_check">
                        <input type="checkbox" name="select_specialist" />
                        <span className="checkmark"></span> Nutritionists
                      </label>
                    </div>
                    <div>
                      <label className="custom_check">
                        <input type="checkbox" name="select_specialist" />
                        <span className="checkmark"></span> Holistic Health
                      </label>
                    </div>
                    <div>
                      <label className="custom_check">
                        <input type="checkbox" name="select_specialist" />
                        <span className="checkmark"></span> Wellness Health
                        Coach
                      </label>
                    </div>
                    <div>
                      <label className="custom_check">
                        <input type="checkbox" name="select_specialist" />
                        <span className="checkmark"></span> Paleo Health
                      </label>
                    </div>
                  </div>
                  <div className="btn-search">
                    <button type="button" className="btn btn-block">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 col-lg-8 col-xl-9">
              {coachList ? (
                coachList.map((item, idx) => {
                  return (
                    <div key={`coach_${idx}`}  className="card">
                      <div className="card-body">
                        <div className="doctor-widget">
                          <div className="doc-info-left">
                            <div className="doctor-img">
                              <Link to="/coach-profile">
                                <img
                                  src="/assets/img/doctors/Ellie-Krieger.png"
                                  className="img-fluid"
                                  alt="User Image"
                                />
                              </Link>
                            </div>
                            <div className="doc-info-cont">
                              <h4 className="doc-name">
                                <Link to="/coach-profile">
                                  {item.firstname + " " + item.lastname}
                                </Link>
                              </h4>
                              {/* //replaced by specialities */}
                              {/* //replaced by specialities */}
                              {/* //replaced by specialities */}
                              {/* //replaced by specialities */}
                              <p className="doc-speciality">
                                {item.about}
                              </p>
                              <h5 className="doc-department">
                                <img
                                  src="assets/img/specialities/specialities-05.png"
                                  className="img-fluid"
                                  alt="Speciality"
                                />
                                Nutritionists
                              </h5>
                              <div className="rating">
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star filled"></i>
                                <i className="fas fa-star"></i>
                                <span className="d-inline-block average-rating">
                                  (17)
                                </span>
                              </div>
                              <div className="clinic-details">
                                <p className="doc-location">
                                  <i className="fas fa-map-marker-alt"></i>{" "}
                                  {item.country + ", " + item.city}
                                </p>
                                <ul className="clinic-gallery">
                                  <li>
                                    <a
                                      href="assets/img/features/feature-01.png"
                                      data-fancybox="gallery"
                                    >
                                      <img
                                        src="assets/img/features/feature-01.png"
                                        alt="Feature"
                                      />
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="assets/img/features/feature-02.png"
                                      data-fancybox="gallery"
                                    >
                                      <img
                                        src="assets/img/features/feature-02.png"
                                        alt="Feature"
                                      />
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="assets/img/features/feature-03.jpeg"
                                      data-fancybox="gallery"
                                    >
                                      <img
                                        src="assets/img/features/feature-03.jpeg"
                                        alt="Feature"
                                      />
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="assets/img/features/feature-04.jpeg"
                                      data-fancybox="gallery"
                                    >
                                      <img
                                        src="assets/img/features/feature-04.jpeg"
                                        alt="Feature"
                                      />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="clinic-services">
                                <span>Diet Plan</span>
                                <span>Fitness</span>
                              </div>
                            </div>
                          </div>
                          <div className="doc-info-right">
                            <div className="clini-infos">
                              <ul>
                                <li>
                                  <i className="far fa-thumbs-up"></i> 98%
                                </li>
                                <li>
                                  <i className="far fa-comment"></i> 17 Feedback
                                </li>
                                <li>
                                  <i className="fas fa-map-marker-alt"></i>{" "}
                                  {item.country + ", " + item.city}
                                </li>
                                <li>
                                  <i className="far fa-money-bill-alt"></i> $
                                  {item.price}
                                  {" "}
                                  <i
                                    className="fas fa-info-circle"
                                    data-toggle="tooltip"
                                    title="Lorem Ipsum"
                                  ></i>{" "}
                                </li>
                              </ul>
                            </div>
                            <div className="clinic-booking">
                              <Link
                                className="view-pro-btn"
                                to="/app/coach-profile"
                              >
                                View Profile
                              </Link>
                              <Link className="apt-btn" to="/app/book-appointment">
                                Book Appointment
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no_data">
                  <span>No Coaches found</span>
                </div>
              )}
              <div className="load-more text-center">
                <a className="btn btn-primary btn-sm" href="#;">
                  Load More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCoach;
