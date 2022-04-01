import React from "react";
import { Link } from "react-router-dom";

const Reviews = () => {
  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="doc-review review-listing">
          {/* <!-- Review Listing --> */}
          <ul className="comments-list">
            {/* <!-- Comment List --> */}
            <li>
              <div className="comment">
                <img
                  className="avatar rounded-circle"
                  alt="User Image"
                  src="/assets/img/patients/patient.jpg"
                />
                <div className="comment-body">
                  <div className="meta-data">
                    <span className="comment-author">Richard Wilson</span>
                    <span className="comment-date">Reviewed 2 Days ago</span>
                    <div className="review-count rating">
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                  <p className="recommended">
                    <i className="far fa-thumbs-up"></i> I recommend the doctor
                  </p>
                  <p className="comment-content">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                    Curabitur non nulla sit amet nisl tempus
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
                {/* <!-- Comment Reply List --> */}
                <li>
                  <div className="comment">
                    <img
                      className="avatar rounded-circle"
                      alt="User Image"
                      src="/assets/img/doctors/doctor-thumb-02.jpg"
                    />
                    <div className="comment-body">
                      <div className="meta-data">
                        <span className="comment-author">Dr. Darren Elder</span>
                        <span className="comment-date">
                          Reviewed 3 Days ago
                        </span>
                      </div>
                      <p className="comment-content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam. Curabitur
                        non nulla sit amet nisl tempus
                      </p>
                      <div className="comment-reply">
                        <a className="comment-btn" href="#">
                          <i className="fas fa-reply"></i> Reply
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                {/* <!-- /Comment Reply List --> */}
              </ul>
              {/* <!-- /Comment Reply --> */}
            </li>
            {/* <!-- /Comment List --> */}

            {/* <!-- Comment List --> */}
            <li>
              <div className="comment">
                <img
                  className="avatar rounded-circle"
                  alt="User Image"
                  src="/assets/img/patients/patient2.jpg"
                />
                <div className="comment-body">
                  <div className="meta-data">
                    <span className="comment-author">Travis Trimble</span>
                    <span className="comment-date">Reviewed 4 Days ago</span>
                    <div className="review-count rating">
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                    </div>
                  </div>
                  <p className="comment-content">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                    Curabitur non nulla sit amet nisl tempus
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
        </div>
      </div>
    </>
  );
};

export default Reviews;
