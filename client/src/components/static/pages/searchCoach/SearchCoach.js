import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getHttpRequest } from "../../../../axios";
import { useSelector } from "react-redux";
import { LOGIN } from "../../../../router/constants/ROUTES";
import Toast from "../../../common/toast/Toast";
const SearchCoach = () => {
  const { coachList } = useSelector((state) => state.filters);
  
  const mediaPath = process.env.REACT_APP_IMG;
  const role = useSelector((state) => state.auth.user.userRole);
  const userId = useSelector((state) => state.auth.user.userid);
  const history = useHistory();
  const [servicesList, setServicesList] = useState([]);
  const [servicesFilter, setServicesFilter] = useState([]);

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

  function handleChange() {
    let gender = [];
    const male =
      maleCoach.current.checked === true
        ? gender.push(maleCoach.current.value)
        : "";
    const female =
      femaleCoach.current.checked === true
        ? gender.push(femaleCoach.current.value)
        : "";

    const services = [];

    const kick =
      kickBoxing.current.checked === true
        ? services.push(kickBoxing.current.value)
        : "";
    const yoga =
      Yoga.current.checked === true ? services.push(Yoga.current.value) : "";
    const nutritions =
      Nutritionists.current.checked === true
        ? services.push(Nutritionists.current.value)
        : "";
    const holiHealth =
      HolisticHealth.current.checked === true
        ? services.push(HolisticHealth.current.value)
        : "";
    const wellness =
      WellnessHealth.current.checked === true
        ? services.push(WellnessHealth.current.value)
        : "";
    const paleHealth =
      PaleoHealth.current.checked === true
        ? services.push(PaleoHealth.current.value)
        : "";

    const courses = [];

    const Certified_Phlebotom =
      Certified_Phlebotomy.current.checked === true
        ? courses.push(Certified_Phlebotomy.current.value)
        : "";
    const ProfessionalCode =
      ProfessionalCoder.current.checked === true
        ? courses.push(ProfessionalCoder.current.value)
        : "";

    console.log(services, "wins on click services");
    console.log(gender, "wins on click gender");
    console.log(courses, "wins on click courses");
  }

  const unAuth = (err, id) => {
    err.preventDefault();
    Toast.fire({
      icon: "error",
      title: "Login to Book Coach",
    }).then(() => {
      history.push(LOGIN);
      localStorage.setItem("accociatedCoach", id);
    });
  };

  useEffect(() => {
    getservicesList();
  }, []);

  const getservicesList = async () => {
    getHttpRequest(`/admin/services/list/`)
      .then((response) => {
        if (!response) {
          console.log("Something went wrong with response...");
          return;
        }
        if (response?.data?.success === true) {
          setServicesList(response?.data?.data?.services);
        } else {
          console.log(response.data.message);
        }
      })
      .catch(() => {
        console.log("Something went wrong...");
      });
  };

  const handleChangeCheckbox = (e) => {
    let updatedList = [...servicesFilter];
    if (e.target.checked) {
      updatedList = [...servicesFilter, e.target.value];
    } else {
      updatedList.splice(servicesFilter.indexOf(e.target.value), 1);
    }
    setServicesFilter(updatedList);
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
              <h2 className="breadcrumb-title">Search Coach</h2>
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
      {console.log(servicesFilter,"servicesFilter")}
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
                    {servicesList &&
                      servicesList.map((item) => (
                        <div>
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name={item.name}
                              value={item.name}
                              onChange={handleChangeCheckbox}
                            />
                            <span className="checkmark"></span> {item.name}
                          </label>
                        </div>
                      ))}
                  </div>
                  <div className="filter-widget">
                    <h4>Health courses</h4>
                    <div>
                      <label className="custom_check">
                        <input
                          type="checkbox"
                          name="select_specialist"
                          value="certified_phlebotomy"
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
                          value="ProfessionalCoder"
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
              {coachList.length > 1 ? (
                coachList.map((item, idx) => {
                  return (
                    <>
                      {item.firstname && item.lastname && (
                        <div key={`coach_${idx}`} className="card">
                          <div className="card-body">
                            <div className="doctor-widget">
                              <div className="doc-info-left">
                                <div className="doctor-img">
                                  <img
                                    src={
                                      item?.fileName
                                        ? mediaPath + item.fileName
                                        : mediaPath + "avatar.jpg"
                                    }
                                    className="img-fluid search-image"
                                    alt="User"
                                  />
                                </div>
                                <div className="doc-info-cont">
                                  <h4 className="doc-name">
                                    <Link to={"/coach-profile/" + item?._id}>
                                      {item.firstname + " " + item.lastname}
                                    </Link>
                                  </h4>
                                  <p className="doc-speciality">{item.about}</p>

                                  {item.specialization && (
                                    <h5 className="doc-department">
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
                                    </div>
                                  )}
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
                                    to={"/coach-profile/" + item?._id}
                                  >
                                    View Profile
                                  </Link>
                                </div>
                                {role != 3 ? (
                                  <div className="clinic-booking">
                                    {userId ? (
                                      <Link
                                        className="apt-btn"
                                        to={
                                          "/app/book-appointment/" + item?._id
                                        }
                                      >
                                        Book Appointment
                                      </Link>
                                    ) : (
                                      <Link
                                        className="apt-btn"
                                        onClick={(err) =>
                                          unAuth(err, item?._id)
                                        }
                                      >
                                        Book Appointment
                                      </Link>
                                    )}
                                  </div>
                                ) : (
                                  ""
                                )}

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
                <div className="no_data_found">
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
