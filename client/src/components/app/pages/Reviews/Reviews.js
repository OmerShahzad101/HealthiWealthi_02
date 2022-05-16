import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHttpRequest } from "../../../../axios";

const Reviews = () => {
  const [review, setReview] = useState();
  const mediaPath = process.env.REACT_APP_IMG;
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
              {review && review?.length > 0 ? (
                review?.map((item, idx) => {
                  return (
                    <div className="comment">
                      {item.reviewBy?.fileName?.length > 20 ? (
                        <img
                          className=" rounded-circle notification-img"
                          src={item.reviewBy?.fileName}
                          alt="User Image"
                        />
                      ) : (
                        <img
                          className=" rounded-circle notification-img"
                          src={
                            item?.reviewBy?.fileName
                              ? mediaPath + item.reviewBy?.fileName
                              : mediaPath + "avatar.jpg"
                          }
                          alt="User"
                        />
                      )}

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
                            {review ? (
                              <ReactStars
                                value={item.score}
                                size={24}
                                activeColor="#ffd700"
                              />
                            ) : (
                              " "
                            )}
                          </div>
                        </div>
                        <strong> {item.title}</strong>
                        <p className="comment-content"> {item.comment}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-Appoinents">
                  <span>You Don't Have any Reviews</span>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Reviews;
