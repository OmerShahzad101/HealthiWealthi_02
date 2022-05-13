import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHttpRequest } from "../../../../axios";

const Reviews = () => {
  const [review , setReview] = useState()
  useEffect(()=>{
    getHttpRequest("front/review/get/userId").then((response)=>{
      setReview(response.data.review)
    })
  })
  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="doc-review review-listing">
          <ul>
            <li>
              <div className="comment">
                <img className="avatar rounded-circle" alt="User Image" src="/assets/img/patients/patient2.jpg"/>
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
                  <p className="comment-content"> </p>
                  <div className="comment-reply">
                    <p className="recommend-btn">
                      <span>Recommend?</span>
                      <a href="#" className="like-btn"><i className="far fa-thumbs-up"></i>Yes</a>
                      <a href="#" className="dislike-btn"><i className="far fa-thumbs-down"></i>No</a>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Reviews;
