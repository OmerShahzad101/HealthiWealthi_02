import { useEffect, useState, useRef } from "react";
import { getHttpRequest, postHttpRequest } from "../../../../axios";
import Specialities from "./Specialities";
import { useHistory } from "react-router-dom";
import AvaliableFeature from "./avaliableFeature";
import CoachSlider from "./CoachSlider";
export default function Home() {
  const history = useHistory();
  const searchNameRef = useRef();

  let payload;

  const searchHandler = (e) => {
    e.preventDefault();

    payload = {
      searchName: searchNameRef.current.value,
    };
    postHttpRequest("/front/search", payload)
      .then((response) => {
        if (response.data) {
          history.push({
            pathname: "/search-coach",
            state: { name: { payload } },
          });
        }
      })
      .catch((response) => {
        console.log("Error");
      });
    console.log(payload);
  };

  return (
    <>
      <section className="section section-search">
        <div className="container-fluid">
          <div className="banner-wrapper">
            <div className="banner-header text-center">
              <h1>Search Coach, Make an Appointment</h1>
              <p>Discover the best Couch nearest to you.</p>
            </div>

            {/* <!-- Search --> */}
            <div className="search-box">
              <form action="#">
                <div className="form-group search-location">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Location"
                  />
                  <span className="form-text">Based on your Location</span>
                </div>
                <div className="form-group search-info">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Coach"
                  />
                  <span className="form-text">
                    Ex : Nutritionists or Yoga Expert etc
                  </span>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary search-btn"
                  onClick={searchHandler}
                >
                  <i className="fas fa-search"></i> <span>Search</span>
                </button>
              </form>
            </div>
            {/* <!-- /Search --> */}
          </div>
        </div>
      </section>

      <section className="section section-specialities">
        <Specialities />
      </section>

      <section className="section section-doctor">
        <CoachSlider />
      </section>

      <section className="section section-features">
        <AvaliableFeature />
      </section>
    </>
  );
}
