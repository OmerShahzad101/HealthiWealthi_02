import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getHttpRequest , postHttpRequest } from "../../../../axios";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../../../router/constants/ROUTES";
import Toast from "../../../common/toast/Toast";
import { setCoachesList } from "../../../../store/slices/search/coachFiltersSlice";

const SearchCoach = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const mediaPath = process.env.REACT_APP_IMG;
  const { coachList } = useSelector((state) => state.filters);
  const role = useSelector((state) => state.auth.user.userRole);
  const userId = useSelector((state) => state.auth.user.userid);
  const [servicesList, setServicesList] = useState([]);
  const [servicesFilter, setServicesFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  // const [values, setValues] = useState({ coach: "", gender: [], services: [] });

  const params = new Proxy(new URLSearchParams(location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  let values = { name: params.name ? params.name : "" , gender: [], services: [] } 
  
//  console.log(params.name,"params")
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
  
  useEffect(async() => {
    const { data } =  values.name === "" ? await getHttpRequest(`front/search/get`) :  await getHttpRequest(`front/search/get?name=${values.name}`);
    if (data?.success === true) {
      console.log(data)
      dispatch(setCoachesList(data.data));
    }
    getservicesList();
  }, []);

  const getservicesList = async () => {
    getHttpRequest(`/admin/services/list`)
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

  const handleChangeServices = (e) => {
    let updatedList = [...servicesFilter];
    if (e.target.checked) {
      updatedList = [...servicesFilter, e.target.value];
    } else {
      updatedList.splice(servicesFilter.indexOf(e.target.value), 1);
    }
    setServicesFilter(updatedList);
  }

  const handleChangeGender = (e) => {
    let updatedList = [...genderFilter];
    if (e.target.checked) {
      updatedList = [...genderFilter, e.target.value];
    } else {
      updatedList.splice(genderFilter.indexOf(e.target.value), 1);
    }
    setGenderFilter(updatedList);
  }


  const filterSubmit =  () => {
    
    // setValues({coach: "helo", gender: genderFilter ,services : servicesFilter })
    values = ({name: values.name , gender: genderFilter ,services : servicesFilter })
    // setValues((state)=>{console.log(state); return state;})
    const { data } = 
    (values.name != "" && values.gender.length > 0 && values.services.length > 0) ? getHttpRequest(`front/search/get?name=${values.name}?gender=${values.gender}?services=${values.services}`) : console.log("failed");
    if (data?.success === true) {
      dispatch(setCoachesList(data.data));
    }

    history.push({
      pathname: '/search-coach',
      search: `?name=${values.name}?gender=${genderFilter}?services=${servicesFilter}`
    })
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
                  <select className="select">
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
                        // ref={userName}
                      />
                    </div>
                  </div>
                  <div className="filter-widget">
                    <h4>Gender</h4>
                    <div>
                      <label className="custom_check">
                        <input type="checkbox" name="male" value="male" onChange={handleChangeGender} />
                        <span className="checkmark"></span> Male Coach
                      </label>
                    </div>
                    <div>
                      <label className="custom_check">
                        <input
                          name="female"
                          type="checkbox"
                          value="female"
                          onChange={handleChangeGender}
                        />
                        <span className="checkmark"></span> Female Coach
                      </label>
                    </div>
                  </div>
                  <div className="filter-widget">
                    <h4>Select Services</h4>
                    {servicesList &&
                      servicesList?.map((item) => (
                        <div>
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name={item.name}
                              value={item._id}
                              onChange={handleChangeServices}
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
                          // ref={Certified_Phlebotomy}
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
                          // ref={ProfessionalCoder}
                        />
                        <span className="checkmark"></span> Professional Coder
                      </label>
                    </div>
                  </div>
                  <div className="btn-search">
                    <button
                      type="button"
                      className="btn btn-block"
                      onClick={filterSubmit}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 col-lg-8 col-xl-9">
              {coachList.length > 0 ? (
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
