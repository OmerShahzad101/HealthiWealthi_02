import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHttpRequest } from "../../../../axios";

const Reviews = () => {
  const [review, setReview] = useState();
  const userId = useSelector((state) => state.auth.user.userid);


  useEffect(async () => {
    await getHttpRequest(`front/review/get/${userId}`).then((response) => {
      console.log(response);
      setReview(response.data.review);
    });
  }, []);
  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="doc-review review-listing">
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
                          <p className="comment-content"> {item.comment}</p>
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
      </div>
    </>
  );
};

export default Reviews;
