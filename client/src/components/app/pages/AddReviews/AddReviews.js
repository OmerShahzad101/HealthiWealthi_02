import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import {
  getHttpRequest,
  postHttpRequest,
  putHttpRequest,
} from "../../../../axios";
import Toast from "../../../common/toast/Toast";

const AddReviews = () => {
  const id = useSelector((state) => state.auth.user.userid);
  const userid = useSelector((state) => state.auth.user.userid);
  const [coachDetail, setCoachDetail] = useState();
  const [review, setReview] = useState();
  const [storeReview, setStoreReview] = useState();

  useEffect(() => {
    getHttpRequest(`/front/client/get/${userid}`).then((res) => {
      setCoachDetail(res.data.client.accociatedCoach);
    });

    getHttpRequest(`/front/review/get/${userid}`).then((res) => {
      setReview(res?.data?.review[0]);
      setStoreReview(res?.data?.review[0]?.title);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
      reviewTo: coachDetail?._id,
      reviewBy: id,
    });
  };

  const addReview = () => {
    storeReview
      ? putHttpRequest("front/review/edit", review).then((response) => {
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
        })
      : postHttpRequest("front/review/create", review).then((response) => {
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
        });
    postHttpRequest("front/notification/create", {
      from: userid,
      to: coachDetail?._id,
      content: "gives a review",
      isRead: "false",
      type: 7,
    });
  };
  const ratingChanged = (newRating) => {
    setReview({
      ...review,
      score: newRating,
      reviewTo: coachDetail?._id,
      reviewBy: id,
    });
  };
  return (
    <div className="write-review col-md-7 col-lg-8 col-xl-9">
      <h4>
        Write a review for{" "}
        <strong>
          {coachDetail?.firstname}&nbsp;{coachDetail?.lastname}
        </strong>
      </h4>

      {/* <!-- Write Review Form --> */}
      <form>
        {review ? (
          <ReactStars
            value={review.score}
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />
        ) : (
          <ReactStars
            
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />
        )}
        <div className="form-group">
          <label>Title of your review</label>
          <input
            onChange={handleChange}
            name="title"
            value={review?.title}
            className="form-control"
            type="text"
            placeholder="If you could say it in one sentence, what would you say?"
          />
        </div>

        <div className="form-group">
          <label>Your review</label>
          <textarea
            onChange={handleChange}
            name="comment"
            value={review?.comment}
            id="review_desc"
            maxLength="100"
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <div className="terms-accept">
            <div className="custom-checkbox">
              <input type="checkbox" id="terms_accept" />
              <label htmlFor="terms_accept">
                &nbsp;&nbsp; I have read and accept{" "}
                <a href="#">Terms &amp; Conditions</a>
              </label>
            </div>
          </div>
        </div>
        <div className="submit-section">
          {console.log(storeReview)}
          <button
            type="button"
            onClick={addReview}
            className="btn btn-primary submit-btn"
          >
            {storeReview ? "Update Review" : "Add Review "}
          </button>
        </div>
      </form>
      {/* <!-- /Write Review Form --> */}
    </div>
  );
};

export default AddReviews;
