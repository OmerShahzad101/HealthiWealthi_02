import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getHttpRequest, postHttpRequest } from "../../../../axios";
const CoachProfile = (props) => {

  const mediaPath = process.env.REACT_APP_IMG;
  const userRole = useSelector((state) => state.auth.user.userRole);
  const userId = useSelector((state) => state.auth.user.userid);
  const [coachProfileData, setCoachProfileData] = useState([]);
  const url = window.location.pathname;
  const id = url.split("/").pop();
  
  useEffect(async () => {
    let res = await getHttpRequest(`/front/coach/get/${id}`);
    if (res) { 
      setCoachProfileData(res?.data?.coach)
      return;
    }
  }, []);

  // API Function TO Add Favourit
  const favorite = () => {
    const payload = {
      coachId: coachProfileData._id,
      clientId: userId,
    };
    postHttpRequest("/front/favourites/create", payload);
  };

  return (
    <div className="content">
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="doctor-widget">
              <div className="doc-info-left">
                <div className="doctor-img">
                  <img src={coachProfileData?.fileName ? mediaPath + coachProfileData.fileName : mediaPath + "avatar.jpg" } className="img-fluid" alt="User"/>
                </div>
                <div className="doc-info-cont">
                  <h4 className="doc-name">{coachProfileData.firstname} {coachProfileData.lastname}</h4>
                  <p className="doc-speciality">{coachProfileData.about}</p>
                  <p className="doc-department">{coachProfileData.specialization}</p>
                  <div className="clinic-details">
                    <p className="doc-location">
                      <i className="fas fa-map-marker-alt"></i>
                      &nbsp;{coachProfileData.country}{", "}{coachProfileData.city}
                    </p>
                  </div>
                </div>
              </div>
              <div className="doc-info-right">
                <div className="clini-infos">
                  <ul>
                    {/*<li><i className="far fa-thumbs-up"></i> 99%</li>
                    <li><i className="far fa-comment"></i> 35 Feedback</li> */}
                    <li><i className="fas fa-map-marker-alt"></i>&nbsp;{coachProfileData.country}{","}&nbsp;{coachProfileData.city}</li>
                    <li><i className="far fa-money-bill-alt"></i>&nbsp;{coachProfileData?.price}{"$"}&nbsp;</li>
                  </ul>
                </div>
                {userRole == 1 && (
                  <>
                    <div className="doctor-action">
                      <a className="btn btn-white fav-btn"><i  className="far fa-bookmark" onClick={() => favorite()}></i></a>
                      <Link to="/chat" className="btn btn-white msg-btn"><i className="far fa-comment-alt"></i></Link>
                      <Link to="/#" className="btn btn-white call-btn" data-toggle="modal" data-target="#voice_call"> <i className="fas fa-phone"></i></Link>
                      <Link to="/#" className="btn btn-white call-btn" data-toggle="modal" data-target="#video_call"><i className="fas fa-video"></i></Link>
                    </div>
                    <div className="clinic-booking">
                      <Link className="apt-btn" to="/app/book-appointment">Book Appointment</Link>
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
            {/* <!-- Tab Menu --> */}
            <nav className="user-tabs mb-4">
              <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                <li className="nav-item">
                  <a className="nav-link active" href="#doc_overview" data-toggle="tab">Overview</a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#doc_locations"
                    data-toggle="tab"
                  >
                    Locations
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#doc_reviews" data-toggle="tab">
                    Reviews
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#doc_business_hours"
                    data-toggle="tab"
                  >
                    Business Hours
                  </a>
                </li>
              </ul>
            </nav>
            {/* <!-- /Tab Menu --> */}

            {/* <!-- Tab Content --> */}
            <div className="tab-content pt-0">
              {/* <!-- Overview Content --> */}
              <div
                role="tabpanel"
                id="doc_overview"
                className="tab-pane fade show active"
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

              {/* <!-- Locations Content --> */}
              <div role="tabpanel" id="doc_locations" className="tab-pane fade">
                {/* <!-- Location List --> */}
                <div className="location-list">
                  <div className="row">
                    {/* <!-- Clinic Content --> */}
                    <div className="col-md-6">
                      <div className="clinic-content">
                        <h4 className="clinic-name">
                          <a href="#">Smile Cute Dental Care Center</a>
                        </h4>
                        <p className="doc-speciality">
                          MDS - Periodontology and Oral Implantology, BDS
                        </p>
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <span className="d-inline-block average-rating">
                            (4)
                          </span>
                        </div>
                        <div className="clinic-details mb-0">
                          <h5 className="clinic-direction">
                            {" "}
                            <i className="fas fa-map-marker-alt"></i> 2286
                            Sundown Lane, Austin, Texas 78749, USA <br />
                            <a href="#;">Get Directions</a>
                          </h5>
                          <ul>
                            <li>
                              <a
                                href="assets/img/features/feature-01.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-01.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="assets/img/features/feature-02.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-02.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="assets/img/features/feature-03.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-03.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="assets/img/features/feature-04.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-04.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Clinic Content --> */}

                    {/* <!-- Clinic Timing --> */}
                    <div className="col-md-4">
                      <div className="clinic-timing">
                        <div>
                          <p className="timings-days">
                            <span> Mon - Sat </span>
                          </p>
                          <p className="timings-times">
                            <span>10:00 AM - 2:00 PM</span>
                            <span>4:00 PM - 9:00 PM</span>
                          </p>
                        </div>
                        <div>
                          <p className="timings-days">
                            <span>Sun</span>
                          </p>
                          <p className="timings-times">
                            <span>10:00 AM - 2:00 PM</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Clinic Timing --> */}

                    <div className="col-md-2">
                      <div className="consult-price">$250</div>
                    </div>
                  </div>
                </div>
                {/* <!-- /Location List --> */}

                {/* <!-- Location List --> */}
                <div className="location-list">
                  <div className="row">
                    {/* <!-- Clinic Content --> */}
                    <div className="col-md-6">
                      <div className="clinic-content">
                        <h4 className="clinic-name">
                          <a href="#">The Family Dentistry Clinic</a>
                        </h4>
                        <p className="doc-speciality">
                          MDS - Periodontology and Oral Implantology, BDS
                        </p>
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <span className="d-inline-block average-rating">
                            (4)
                          </span>
                        </div>
                        <div className="clinic-details mb-0">
                          <p className="clinic-direction">
                            {" "}
                            <i className="fas fa-map-marker-alt"></i> 2883
                            University Street, Seattle, Texas Washington, 98155{" "}
                            <br />
                            <a href="#;">Get Directions</a>
                          </p>
                          <ul>
                            <li>
                              <a
                                href="assets/img/features/feature-01.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-01.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="assets/img/features/feature-02.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-02.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="assets/img/features/feature-03.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-03.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                href="assets/img/features/feature-04.jpg"
                                data-fancybox="gallery2"
                              >
                                <img
                                  src="assets/img/features/feature-04.jpg"
                                  alt="Feature Image"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Clinic Content --> */}

                    {/* <!-- Clinic Timing --> */}
                    <div className="col-md-4">
                      <div className="clinic-timing">
                        <div>
                          <p className="timings-days">
                            <span> Tue - Fri </span>
                          </p>
                          <p className="timings-times">
                            <span>11:00 AM - 1:00 PM</span>
                            <span>6:00 PM - 11:00 PM</span>
                          </p>
                        </div>
                        <div>
                          <p className="timings-days">
                            <span>Sat - Sun</span>
                          </p>
                          <p className="timings-times">
                            <span>8:00 AM - 10:00 AM</span>
                            <span>3:00 PM - 7:00 PM</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Clinic Timing --> */}

                    <div className="col-md-2">
                      <div className="consult-price">$350</div>
                    </div>
                  </div>
                </div>
                {/* <!-- /Location List --> */}
              </div>
              {/* <!-- /Locations Content --> */}

              {/* <!-- Reviews Content --> */}
              <div role="tabpanel" id="doc_reviews" className="tab-pane fade">
                {/* <!-- Review Listing --> */}
                <div className="widget review-listing">
                  <ul className="comments-list">
                    {/* <!-- Comment List --> */}
                    <li>
                      <div className="comment">
                        <img
                          className="avatar avatar-sm rounded-circle"
                          alt="User Image"
                          src="assets/img/patients/patient.jpg"
                        />
                        <div className="comment-body">
                          <div className="meta-data">
                            <span className="comment-author">
                              Richard Wilson
                            </span>
                            <span className="comment-date">
                              Reviewed 2 Days ago
                            </span>
                            <div className="review-count rating">
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>
                          <p className="recommended">
                            <i className="far fa-thumbs-up"></i> I recommend the
                            doctor
                          </p>
                          <p className="comment-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation. Curabitur non nulla sit amet
                            nisl tempus
                          </p>
                          <div className="comment-reply">
                            <a className="comment-btn" href="#">
                              <i className="fas fa-reply"></i> Reply
                            </a>
                            <p className="recommend-btn">
                              <span>Recommend?</span>
                              <a href="#" className="like-btn">
                                <i className="far fa-thumbs-up"></i> Yes
                              </a>
                              <a href="#" className="dislike-btn">
                                <i className="far fa-thumbs-down"></i> No
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* <!-- Comment Reply --> */}
                      <ul className="comments-reply">
                        <li>
                          <div className="comment">
                            <img
                              className="avatar avatar-sm rounded-circle"
                              alt="User Image"
                              src="assets/img/patients/patient1.jpg"
                            />
                            <div className="comment-body">
                              <div className="meta-data">
                                <span className="comment-author">
                                  Charlene Reed
                                </span>
                                <span className="comment-date">
                                  Reviewed 3 Days ago
                                </span>
                                <div className="review-count rating">
                                  <i className="fas fa-star filled"></i>
                                  <i className="fas fa-star filled"></i>
                                  <i className="fas fa-star filled"></i>
                                  <i className="fas fa-star filled"></i>
                                  <i className="fas fa-star"></i>
                                </div>
                              </div>
                              <p className="comment-content">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam. Curabitur non nulla sit
                                amet nisl tempus
                              </p>
                              <div className="comment-reply">
                                <a className="comment-btn" href="#">
                                  <i className="fas fa-reply"></i> Reply
                                </a>
                                <p className="recommend-btn">
                                  <span>Recommend?</span>
                                  <a href="#" className="like-btn">
                                    <i className="far fa-thumbs-up"></i> Yes
                                  </a>
                                  <a href="#" className="dislike-btn">
                                    <i className="far fa-thumbs-down"></i> No
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      {/* <!-- /Comment Reply --> */}
                    </li>
                    {/* <!-- /Comment List --> */}

                    {/* <!-- Comment List --> */}
                    <li>
                      <div className="comment">
                        <img
                          className="avatar avatar-sm rounded-circle"
                          alt="User Image"
                          src="assets/img/patients/patient2.jpg"
                        />
                        <div className="comment-body">
                          <div className="meta-data">
                            <span className="comment-author">
                              Travis Trimble
                            </span>
                            <span className="comment-date">
                              Reviewed 4 Days ago
                            </span>
                            <div className="review-count rating">
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>
                          <p className="comment-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation. Curabitur non nulla sit amet
                            nisl tempus
                          </p>
                          <div className="comment-reply">
                            <a className="comment-btn" href="#">
                              <i className="fas fa-reply"></i> Reply
                            </a>
                            <p className="recommend-btn">
                              <span>Recommend?</span>
                              <a href="#" className="like-btn">
                                <i className="far fa-thumbs-up"></i> Yes
                              </a>
                              <a href="#" className="dislike-btn">
                                <i className="far fa-thumbs-down"></i> No
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* <!-- /Comment List --> */}
                  </ul>

                  {/* <!-- Show All --> */}
                  <div className="all-feedback text-center">
                    <a href="#" className="btn btn-primary btn-sm">
                      Show all feedback <strong>(167)</strong>
                    </a>
                  </div>
                  {/* <!-- /Show All --> */}
                </div>
                {/* <!-- /Review Listing --> */}

                {/* <!-- Write Review --> */}
                <div className="write-review">
                  <h4>
                    Write a review for <strong>Dr. Darren Elder</strong>
                  </h4>

                  {/* <!-- Write Review Form --> */}
                  <form>
                    <div className="form-group">
                      <label>Review</label>
                      <div className="star-rating">
                        <input
                          id="star-5"
                          type="radio"
                          name="rating"
                          value="star-5"
                        />
                        <label htmlFor="star-5" title="5 stars">
                          <i className="active fa fa-star"></i>
                        </label>
                        <input
                          id="star-4"
                          type="radio"
                          name="rating"
                          value="star-4"
                        />
                        <label htmlFor="star-4" title="4 stars">
                          <i className="active fa fa-star"></i>
                        </label>
                        <input
                          id="star-3"
                          type="radio"
                          name="rating"
                          value="star-3"
                        />
                        <label htmlFor="star-3" title="3 stars">
                          <i className="active fa fa-star"></i>
                        </label>
                        <input
                          id="star-2"
                          type="radio"
                          name="rating"
                          value="star-2"
                        />
                        <label htmlFor="star-2" title="2 stars">
                          <i className="active fa fa-star"></i>
                        </label>
                        <input
                          id="star-1"
                          type="radio"
                          name="rating"
                          value="star-1"
                        />
                        <label htmlFor="star-1" title="1 star">
                          <i className="active fa fa-star"></i>
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Title of your review</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="If you could say it in one sentence, what would you say?"
                      />
                    </div>
                    <div className="form-group">
                      <label>Your review</label>
                      <textarea
                        id="review_desc"
                        maxLength="100"
                        className="form-control"
                      ></textarea>

                      <div className="d-flex justify-content-between mt-3">
                        <small className="text-muted">
                          <span id="chars">100</span> characters remaining
                        </small>
                      </div>
                    </div>
                    <hr />
                    <div className="form-group">
                      <div className="terms-accept">
                        <div className="custom-checkbox">
                          <input type="checkbox" id="terms_accept" />
                          <label htmlFor="terms_accept">
                            I have read and accept{" "}
                            <a href="#">Terms &amp; Conditions</a>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        Add Review
                      </button>
                    </div>
                  </form>
                  {/* <!-- /Write Review Form --> */}
                </div>
                {/* <!-- /Write Review --> */}
              </div>
              {/* <!-- /Reviews Content --> */}

              {/* <!-- Business Hours Content --> */}
              <div
                role="tabpanel"
                id="doc_business_hours"
                className="tab-pane fade"
              >
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    {/* <!-- Business Hours Widget --> */}
                    <div className="widget business-widget">
                      <div className="widget-content">
                        <div className="listing-hours">
                          <div className="listing-day current">
                            <div className="day">
                              Today <span>5 Nov 2019</span>
                            </div>
                            <div className="time-items">
                              <span className="open-status">
                                <span className="badge bg-success-light">
                                  Open Now
                                </span>
                              </span>
                              <span className="time">07:00 AM - 09:00 PM</span>
                            </div>
                          </div>
                          <div className="listing-day">
                            <div className="day">Monday</div>
                            <div className="time-items">
                              <span className="time">07:00 AM - 09:00 PM</span>
                            </div>
                          </div>
                          <div className="listing-day">
                            <div className="day">Tuesday</div>
                            <div className="time-items">
                              <span className="time">07:00 AM - 09:00 PM</span>
                            </div>
                          </div>
                          <div className="listing-day">
                            <div className="day">Wednesday</div>
                            <div className="time-items">
                              <span className="time">07:00 AM - 09:00 PM</span>
                            </div>
                          </div>
                          <div className="listing-day">
                            <div className="day">Thursday</div>
                            <div className="time-items">
                              <span className="time">07:00 AM - 09:00 PM</span>
                            </div>
                          </div>
                          <div className="listing-day">
                            <div className="day">Friday</div>
                            <div className="time-items">
                              <span className="time">07:00 AM - 09:00 PM</span>
                            </div>
                          </div>
                          <div className="listing-day">
                            <div className="day">Saturday</div>
                            <div className="time-items">
                              <span className="time">07:00 AM - 09:00 PM</span>
                            </div>
                          </div>
                          <div className="listing-day closed">
                            <div className="day">Sunday</div>
                            <div className="time-items">
                              <span className="time">
                                <span className="badge bg-danger-light">
                                  Closed
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Business Hours Widget --> */}
                  </div>
                </div>
              </div>
              {/* <!-- /Business Hours Content --> */}
            </div>
          </div>
        </div>
        {/* <!-- /Doctor Details Tab --> */}
      </div>
    </div>
  );
};

export default CoachProfile;
