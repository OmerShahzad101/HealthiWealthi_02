import { useState } from "react";
import { getHttpRequest, postHttpRequest } from "../../../../axios";
import Specialities from "./Specialities";
import { useHistory } from "react-router-dom";
import AvaliableFeature from "./AvaliableFeature";
import CoachSlider from "./CoachSlider";
import { useDispatch } from "react-redux";
import { setCoachesList } from "../../../../store/slices/search/coachFiltersSlice";

export default function Home() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [values, setValues] = useState({ location: "", coach: "", gender: [] });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // setValues((state)=>{console.log(state.coach); return state} )
  };

  const handleSearch = async () => {
    
    debugger;
    let queryParams = `?name=${values.coach}`
    // const { data } = await postHttpRequest("front/search/get", values);
    // if (data.success === true) {
    //   dispatch(setCoachesList(data.data));
      
    // }
    history.push(`/search-coach${queryParams}`);
    // console.log(data, "response from search api");
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
                    name="location"
                    onChange={handleChange}
                  />
                  <span className="form-text">Based on your Location</span>
                </div>
                <div className="form-group search-info">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Coach"
                    name="coach"
                    onChange={handleChange}
                  />
                  <span className="form-text">
                    Ex : Nutritionists or Yoga Expert etc
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-primary search-btn"
                  onClick={handleSearch}
                  disabled={!values.coach && !values.location}
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
