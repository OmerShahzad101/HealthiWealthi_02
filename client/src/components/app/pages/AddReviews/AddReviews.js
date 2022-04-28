import React, { useState } from "react";
import { postHttpRequest } from "../../../../axios";

const AddReviews = () => {
    const initialvalues={
      rating: "",
      title: "",
      description: ""
    }
  const [review, setReview] = useState(initialvalues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
    console.log(review)
  };

  const addReview =() => {
    console.log(review)
    postHttpRequest("front/client/add-review" , review)
  }
  return (
    <div className="write-review col-md-7 col-lg-8 col-xl-9">
      <h4>
        Write a review for <strong>Dr. Darren Elder</strong>
      </h4>

      {/* <!-- Write Review Form --> */}
      <form onSubmit={addReview}>
        <div className="form-group">
          <div className="star-rating">
            <input
              id="star-5"
              type="radio"
              name="rating"
              value="5"
              onChange={handleChange}
            />
            <label htmlFor="star-5" title="5 stars">
              <i className="active fa fa-star"></i>
            </label>
            <input
              id="star-4"
              type="radio"
              name="rating"
              value="4"
              onChange={handleChange}
            />
            <label htmlFor="star-4" title="4 stars">
              <i className="active fa fa-star"></i>
            </label>
            <input
              id="star-3"
              type="radio"
              name="rating"
              value="3"
              onChange={handleChange}
            />
            <label htmlFor="star-3" title="3 stars">
              <i className="active fa fa-star"></i>
            </label>
            <input
              id="star-2"
              type="radio"
              name="rating"
              value="2"
              onChange={handleChange}
            />
            <label htmlFor="star-2" title="2 stars">
              <i className="active fa fa-star"></i>
            </label>
            <input
              id="star-1"
              type="radio"
              name="rating"
              value="1"
              onChange={handleChange}
            />
            <label htmlFor="star-1" title="1 star">
              <i className="active fa fa-star"></i>
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Title of your review</label>
          <input
            onChange={handleChange}
            name="title"
            value={review.title}
            className="form-control"
            type="text"
            placeholder="If you could say it in one sentence, what would you say?"
          />
        </div>
        
        <div className="form-group">
          <label>Your review</label>
          <textarea
            onChange={handleChange}
            name="description"
            value={review.description}
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
          <button type="submit" className="btn btn-primary submit-btn">
            Add Review
          </button>
        </div>
      </form>
      {/* <!-- /Write Review Form --> */}
    </div>
  );
};

export default AddReviews;
