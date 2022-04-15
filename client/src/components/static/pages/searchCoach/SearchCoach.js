import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getHttpRequest } from "../../../../axios";
import { useSelector } from "react-redux";
const SearchCoach = () => {
  // const [male, setmale] = useState(false);
  // console.log(male)
  const role = useSelector((state) => state.auth.user.userRole);
  const SearchFilter = useRef();
  const maleCoach = useRef();
  const femaleCoach = useRef();
  const Certified_Phlebotomy = useRef();
  const ProfessionalCoder = useRef();
  const Yoga = useRef();
  const Nutritionists = useRef();
  const HolisticHealth = useRef();
  const WellnessHealth = useRef();
  const PaleoHealth = useRef();
  const kickBoxing = useRef();
  const userName = useRef();

  // let coachGender = {};
  // let Services = {};
  // let healthCourse = {};

  let coachGender = {
    femaleCoach: femaleCoach.current?.checked,
    maleCoach: maleCoach.current?.checked,
  };
  let Services = {
    kickBoxing: kickBoxing.current?.checked,//false
    Yoga: Yoga.current?.checked,
    Nutritionists: Nutritionists.current?.checked,
    HolisticHealth: HolisticHealth.current?.checked,
    PaleoHealth: PaleoHealth.current?.checked,
  };
  let healthCourse = {
    Certified_Phlebotomy: Certified_Phlebotomy.current?.checked,
    ProfessionalCoder: ProfessionalCoder.current?.checked,
  };
  // const Services = {
  //   kickBoxing: kickBoxing.current,
  //   Yoga: Yoga.current,
  //   Nutritionists: Nutritionists.current,
  //   HolisticHealth: HolisticHealth.current,
  //   PaleoHealth: PaleoHealth.current,
  // };

  // const healthCourse = {
  //   Certified_Phlebotomy: Certified_Phlebotomy.current,
  //   ProfessionalCoder: ProfessionalCoder.current,
  // };
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

  function handleChange(event) {
    // let coachGender = {
    //   femaleCoach: femaleCoach.current?.checked,
    //   maleCoach: maleCoach.current?.checked,
    // };
    //setTimeout(function () {
    console.log("Services", Services);
    console.log("healthCourse", healthCourse);
    console.log("coachGender", maleCoach);
    //}, 2000);
  }

  return (
    <>
      <div className="breadcrumb-bar">
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
                  <select className="select" ref={SearchFilter}>
                    <option>Select</option>
                    <option className="sorting" value="rating">
                      Rating
                    </option>
                    <option className="sorting" value="popular">
                      Popular
                    </option>
                    <option className="sorting" value="popular">
                      Latest
                    </option>
                    <option className="sorting" value="popular">
                      Free
                    </option>
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
                        ref={userName}
                      />
                    </div>
                  </div>
                  <div className="filter-widget">
                    <h4>Gender</h4>
                    <div>
                      <label className="custom_check">
                        <input type="checkbox" ref={maleCoach} value="male" />
                        <span className="checkmark"></span> Male Coach
                      </label>
                    </div>
                    <div>
                      <label className="custom_check">
                        <input
                          ref={femaleCoach}
                          type="checkbox"
                          value="female"
                        />
                        <span className="checkmark"></span> Female Coach
                      </label>
                    </div>
                  </div>
                  <div className="filter-widget">
                    <h4>Select Services</h4>
                    <div>
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          name="select_specialist"
                          ref={kickBoxing}
                          value={!kickBoxing}
                        />
                        <span className="checkmark"></span> Kick Boxing
                      </label>
                    </div>
                    <div>
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          name="select_specialist"
                          value={Yoga}
                          ref={Yoga}
                        />
                        <span className="checkmark"></span> Yoga
                      </label>
                    </div>
                    <div>
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          name="select_specialist"
                          value={true}
                          ref={Nutritionists}
                        />
                        <span className="checkmark"></span> Nutritionists
                      </label>
                    </div>
                    <div>
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          value={true}
                          name="select_specialist"
                          ref={HolisticHealth}
                        />
                        <span className="checkmark"></span> Holistic Health
                      </label>
                    </div>
                    <div>
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          value={true}
                          name="select_specialist"
                          ref={WellnessHealth}
                        />
                        <span className="checkmark"></span> Wellness Health
                        Coach
                      </label>
                    </div>
                    <div>
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          name="select_specialist"
                          value={true}
                          ref={PaleoHealth}
                        />
                        <span className="checkmark"></span> Paleo Health
                      </label>
                    </div>
                  </div>
                  <div className="filter-widget">
                    <h4>Health courses</h4>
                    <div>
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          name="select_specialist"
                          value={true}
                          ref={Certified_Phlebotomy}
                        />
                        <span className="checkmark"></span>Certified Phlebotomy
                        Technician (CPT) Training time
                      </label>
                    </div>
                    <div>
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          name="select_specialist"
                          // onChange={handleChange}
                          value={true}
                          ref={ProfessionalCoder}
                        />
                        <span className="checkmark"></span> Professional Coder
                      </label>
                    </div>
                  </div>

                  <div className="btn-search">
                    <button
                      type="button"
                      className="btn btn-block"
                      onClick={handleChange}
                    >
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
                    <>
                      {item.firstname && item.lastname && (
                        <div key={`coach_${idx}`} className="card">
                          <div className="card-body">
                            <div className="doctor-widget">
                              <div className="doc-info-left">
                                <div className="doctor-img">
                                  <Link to="/coach-profile">
                                    <img
                                      src="/assets/img/doctors/Ellie-Krieger.png"
                                      className="img-fluid"
                                      alt="User"
                                    />
                                  </Link>
                                </div>
                                <div className="doc-info-cont">
                                  <h4 className="doc-name">
                                    <Link to="/coach-profile">
                                      {item.firstname + " " + item.lastname}
                                    </Link>
                                  </h4>
                                  <p className="doc-speciality">{item.about}</p>

                                  {item.specialization && (
                                    <h5 className="doc-department">
                                      {/* <img
                                    src="assets/img/specialities/specialities-05.png"
                                    className="img-fluid"
                                    alt="Speciality"
                                  /> */}
                                      {item.specialization}
                                    </h5>
                                  )}
                                  {/* <div className="rating">
                                  <i className="fas fa-star filled"></i>
                                  <i className="fas fa-star filled"></i>
                                  <i className="fas fa-star filled"></i>
                                  <i className="fas fa-star filled"></i>
                                  <i className="fas fa-star"></i>
                                  <span className="d-inline-block average-rating">
                                    (17)
                                  </span>
                                </div> */}
                                  {(item.country || item.city) && (
                                    <div className="clinic-details">
                                      <p className="doc-location">
                                        <i className="fas fa-map-marker-alt"></i>{" "}
                                        {item.country + ", " + item.city}
                                      </p>
                                      {/* <ul className="clinic-gallery">
                                        <li>
                                          <a
                                            href="/assets/img/features/feature-01.png"
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
                                            href="/assets/img/features/feature-02.png"
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
                                      </ul> */}
                                    </div>
                                  )}
                                  {/* <div className="clinic-services">
                                    <span>Diet Plan</span>
                                    <span>Fitness</span>
                                  </div> */}
                                </div>
                              </div>
                              <div className="doc-info-right">
                                <div className="clini-infos">
                                  <ul>
                                    {/* <li>
                                    <i className="far fa-thumbs-up"></i> 98%
                                  </li>
                                  <li>
                                    <i className="far fa-comment"></i> 17 Feedback
                                  </li> */}
                                    {(item.country || item.city) && (
                                      <li>
                                        <i className="fas fa-map-marker-alt"></i>{" "}
                                        {item.country + ", " + item.city}
                                      </li>
                                    )}
                                    <li>
                                      <i className="far fa-money-bill-alt"></i>{" "}
                                      ${item.price}{" "}
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
                                   
                                    to={{
                                      
                                      pathname: "/coach-profile",
                                      state: { id: item?._id },
                                    }}
                                  >
                                    View Profile
                                  </Link>
                                </div>
                                {role == 1 ? <div className="clinic-booking">
                                    <Link
                                      className="apt-btn"
                                      to={{
                                        pathname: "/app/book-appointment",
                                        state: { id: item._id },
                                      }}
                                    >
                                      Book Appointment
                                    </Link>
                                  </div>:""}
                                {/* {role === 3 ? (
                                  <div className="clinic-disable">
                                    <button
                                      disabled
                                      className="clinic-disable"
                                      to={{
                                        pathname: "/app/book-appointment",
                                        state: { id: item._id },
                                      }}
                                    >
                                      Book Appointment
                                    </button>
                                  </div>
                                ) : (
                                  <div className="clinic-booking">
                                    <Link
                                      className="apt-btn"
                                      to={{
                                        pathname: "/app/book-appointment",
                                        state: { id: item._id },
                                      }}
                                    >
                                      Book Appointment
                                    </Link>
                                  </div>
                                )} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
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
