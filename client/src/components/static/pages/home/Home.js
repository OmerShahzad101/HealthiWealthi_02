import { useEffect, useState } from "react";
import Specialities from "./Specialities";
import { useHistory } from "react-router-dom";
import AvaliableFeature from "./AvaliableFeature";
import CoachSlider from "./CoachSlider";
import TopProgressBar from "../../../common/top-progress-bar/TopProgressBar";

export default function Home() {
  const [loading, setLoading] = useState(true);
  let history = useHistory();
  const [values, setValues] = useState({ location: "", name: "", gender: [] });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSearch = async () => {
    let queryParams = `?name=${values.name}`;
    history.push(`/search-coach${queryParams}`);
  };

  useEffect(()=>{
    setLoading(false)
  },[])

  return (
    <>
      {loading ? (
        <TopProgressBar />
      ) : (
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
                        name="name"
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
                      disabled={!values.name && !values.location}
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
      )}
    </>
  );
}
