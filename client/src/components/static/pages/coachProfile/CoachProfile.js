import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import $ from "jquery";
import { getHttpRequest, postHttpRequest } from "../../../../axios";
import { Tabs, Tab } from "react-bootstrap";
import Toast from "../../../common/toast/Toast";
import { LOGIN } from "../../../../router/constants/ROUTES";
import Reviews from "../../../app/pages/Reviews/Reviews";
import moment from "moment";

const CoachProfile = (props) => {
  const mediaPath = process.env.REACT_APP_IMG;
  const userRole = useSelector((state) => state.auth.user.userRole);
  const userId = useSelector((state) => state.auth.user.userid);
  const [coachProfileData, setCoachProfileData] = useState([]);
  const [key, setKey] = useState("overview");
  const url = window.location.pathname;
  const id = url.split("/").pop();
  const [coachList, setCoachList] = useState([]);
  const history = useHistory();
  const [review, setReview] = useState();

  useEffect(async () => {
    $("html,body").animate({ scrollTop: 0 }, "slow");
    await getHttpRequest(`front/review/get/${id}`).then((response) => {
      setReview(response.data.review);
    });
    let res = await getHttpRequest(`/front/coach/get/${id}`);
    if (res) {
      setCoachProfileData(res?.data?.coach);
      return;
    }
  }, []);

  // API Function TO Add Favourit
  const favorite = (id, err) => {
    console.log("dddd");
    if (userId) {
      console.log(userId, "userId");
      const payload = {
        coachId: id,
        clientId: userId,
      };
      postHttpRequest("/front/favourites/create", payload)
        .then((response) => {
          if (response) {
            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
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
    } else {
      err.preventDefault();
      Toast.fire({
        icon: "error",
        title: "Login Required",
      });
    }
  };

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

  return (
    <div className="content">
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="doctor-widget">
              <div className="doc-info-left">
                <div className="doctor-img">
                  <img
                    src={
                      coachProfileData?.fileName
                        ? mediaPath + coachProfileData.fileName
                        : mediaPath + "avatar.jpg"
                    }
                    className="img-fluid search-image"
                    alt="User"
                  />
                </div>
                <div className="doc-info-cont">
                  <h4 className="doc-name">
                    {coachProfileData.firstname} {coachProfileData.lastname}
                  </h4>
                  <p className="doc-speciality">{coachProfileData.about}</p>
                  <p className="doc-department">
                    {coachProfileData.specialization}
                  </p>
                  <div className="clinic-details">
                    <p className="doc-location">
                      <i className="fas fa-map-marker-alt"></i>
                      &nbsp;{coachProfileData.country}
                      {", "}
                      {coachProfileData.city}
                    </p>
                  </div>
                </div>
              </div>
              <div className="doc-info-right">
                <div className="clini-infos">
                  <ul>
                    {/* <li><i className="far fa-thumbs-up"></i> 99%</li>
                    <li><i className="far fa-comment"></i> 35 Feedback</li> */}
                    <li>
                      <i className="fas fa-map-marker-alt"></i>&nbsp;
                      {coachProfileData.country}
                      {","}&nbsp;{coachProfileData.city}
                    </li>
                    <li>
                      <i className="far fa-money-bill-alt"></i>&nbsp;
                      {coachProfileData?.price}
                      {"$"}&nbsp;
                    </li>
                  </ul>
                </div>
                {userRole !== 3 && (
                  <>
                    <div className="doctor-action">
                      {coachProfileData?.isFavourite === true ? (
                        <a className="btn btn-white fav-btn fav-bookmark">
                          {" "}
                          <i
                            className="far fa-bookmark"
                            onClick={(err) =>
                              favorite(coachProfileData?._id, err)
                            }
                          ></i>
                        </a>
                      ) : (
                        <a className="btn btn-white fav-btn ">
                          <i
                            className="far fa-bookmark "
                            onClick={(err) =>
                              favorite(coachProfileData?._id, err)
                            }
                          ></i>
                        </a>
                      )}

                      <Link to="#" className="btn btn-white msg-btn">
                        <i className="far fa-comment-alt"></i>
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-white call-btn"
                        data-toggle="modal"
                        data-target="#voice_call"
                      >
                        {" "}
                        <i className="fas fa-phone"></i>
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-white call-btn"
                        data-toggle="modal"
                        data-target="#video_call"
                      >
                        <i className="fas fa-video"></i>
                      </Link>
                    </div>
                    <div className="clinic-booking">
                      {userId ? (
                        <Link
                          className="apt-btn"
                          to={"/app/book-appointment/" + coachProfileData?._id}
                        >
                          Book Appointment
                        </Link>
                      ) : (
                        <Link
                          className="apt-btn"
                          onClick={(err) => unAuth(err, id)}
                        >
                          Book Appointment
                        </Link>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Doctor Details Tab --> */}
        <div className="card">
          <div className="card-body pt-0">
            <Tabs
              id="controlled-tab-example"
              className="nav nav-tabs nav-tabs-bottom nav-justified"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              {/* <!-- Overview Content --> */}
              <Tab eventKey="overview" title="Overview">
                <div
                  role="tabpanel"
                  id="doc_overview"
                  className="nav-tabs-bottom nav-justified"
                >
                  <div className="row">
                    <div className="col-md-12 col-lg-9">
                      {/* <!-- About Details --> */}
                      <div className="widget about-widget">
                        <h4 className="widget-title">About Me</h4>
                        <p>{coachProfileData.about}</p>
                      </div>

                      {/* <!-- Education Details --> */}
                      <div className="widget education-widget">
                        <h4 className="widget-title">Education</h4>
                        {coachProfileData?.qualifications?.map((edu, i) => {
                          return (
                            <div className="experience-box" key={i}>
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle"></div>
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <a className="name">
                                        {edu.degree.toUpperCase()}
                                      </a>
                                      <div>{edu.college}</div>
                                      <span className="time">{edu.year}</span>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>

                      {/* <!-- Experience Details --> */}
                      <div className="widget experience-widget">
                        <h4 className="widget-title">Work & Experience</h4>
                        <div className="experience-box">
                          <ul className="experience-list">
                            {coachProfileData?.experience?.map((element, i) => {
                              return (
                                <li key={i}>
                                  <div className="experience-user">
                                    <div className="before-circle"></div>
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <a href="#/" className="name">
                                        {element.companyName.toUpperCase()}
                                        {"  ("}
                                        {element.designation}
                                        {")"}
                                      </a>
                                      <span className="time">
                                        {/* {element.designation} */}
                                        {element.dateFrom}
                                        {" -- "}
                                        {element.dateTo}
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      {/* <!-- Awards Details --> */}
                      <div className="widget awards-widget">
                        <h4 className="widget-title">Awards</h4>
                        <div className="experience-box">
                          <ul className="experience-list">
                            {coachProfileData?.awards?.map((element, i) => {
                              return (
                                <li key={i}>
                                  <div className="experience-user">
                                    <div className="before-circle"></div>
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <p className="exp-year">
                                        {element.year.toUpperCase()}
                                      </p>
                                      <h4 className="exp-title">
                                        {element.award}
                                      </h4>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>

              {/* <!-- Reviews Content --> */}
              <Tab eventKey="review" title="Reviews">
                <div role="tabpanel" id="doc_reviews" className="tab-pane doc-review review-listing">
                  <ul>
                    <li>
                      {console.log("review", review)}
                      {review && review?.length > 0
                        ? review?.map((item, idx) => {
                            return (
                              <div className="comment">
                                <img
                                  className="avatar rounded-circle"
                                  alt="User Image"
                                  src="/assets/img/patients/patient2.jpg"
                                />
                                <div className="comment-body">
                                  <div className="meta-data">
                                    <span className="comment-author">
                                      {item?.reviewBy?.firstname}&nbsp;
                                      {item?.reviewBy?.lastname}
                                    </span>
                                    <span className="comment-date">
                                      {moment(item?.createdAt).fromNow()}
                                    </span>
                                    <div className="review-count rating">
                                      <i className="fas fa-star filled"></i>
                                      <i className="fas fa-star filled"></i>
                                      <i className="fas fa-star filled"></i>
                                      <i className="fas fa-star filled"></i>
                                      <i className="fas fa-star filled"></i>
                                    </div>
                                  </div>
                                  <strong> {item.title}</strong>
                                  <p className="comment-content">
                                    {" "}
                                    {item.comment}
                                  </p>
                                  <div className="comment-reply">
                                    <p className="recommend-btn">
                                      <span>Recommend?</span>
                                      <a href="#" className="like-btn">
                                        <i className="far fa-thumbs-up"></i>Yes
                                      </a>
                                      <a href="#" className="dislike-btn">
                                        <i className="far fa-thumbs-down"></i>No
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        : "else"}
                    </li>
                  </ul>
                </div>
              </Tab>
              {/* <!-- /Reviews Content --> */}

              {/* </div> */}
            </Tabs>
          </div>
        </div>
        {/* <!-- /Doctor Details Tab --> */}
      </div>
    </div>
  );
};

export default CoachProfile;
