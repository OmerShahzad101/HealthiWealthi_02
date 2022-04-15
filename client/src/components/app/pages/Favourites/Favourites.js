import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getHttpRequest, postHttpRequest } from "../../../../axios";
import { useSelector } from "react-redux";
import Toast from "../../../common/toast/Toast";

const Favourites = () => {
  const id = useSelector((state) => state.auth.user.userid);
  const [favouriteList, setfavouriteList] = useState([]);

  useEffect(() => {
    getHttpRequest(`/front/favourites/get/${id}`)
      .then((response) => {
        setfavouriteList(response.data.favouriteData.clientFavourite);
        if (response.data.favouriteData.clientFavourite[0]) {
          Toast.fire({
            icon: "success",
            title: response.data.message
          })
        }
        else {
          Toast.fire({
            icon: "info",
            title: "No data found"
          })
        }
      })
      .catch((response) => {
        Toast.fire({
          icon: "error",
          title: response.data.message
        })
      });
  }, []);

  const favorite = (idx,key) => {
    console.log(idx)
    const payload = {
      coachId: idx,
      clientId: id
    }
    postHttpRequest("/front/favourites/create", payload)
      .then((response) => {
        Toast.fire({
          icon: "success",
          title: response.data.message
        })
        console.log('favouriteList',favouriteList)
      const newFav = favouriteList.filter((fav,i) => i !== key);
      console.log('newFav',newFav)
      setfavouriteList(newFav);
      })
      .catch((response) => {
        Toast.fire({
          icon: "error",
          title: response.data.message
        })
      });
  }

  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="row row-grid">
          {
            favouriteList ? favouriteList?.map((e, idx) =>
              <div className="col-md-6 col-lg-4 col-xl-3" key={idx}>
                <div className="profile-widget">
                  <div className="doc-img">
                    <Link to="/coach-profile">
                      <img
                        className="img-fluid"
                        alt="User Image"
                        src="/assets/img/doctors/doctor-01.jpg"
                      />
                    </Link>
                    {/* <a className="fav-btn">
                  <i className="far fa-bookmark"></i>
                </a> */}
                    <a className="not-fav-btn" onClick={() => favorite(e?._id,idx)}>
                      <i className="far fa-bookmark" ></i>
                    </a>
                  </div>
                  <div className="pro-content">
                    <h3 className="title">
                      <Link to="/coach-profile">{e?.firstname + " " + e?.lastname}</Link>
                      <i className="fas fa-check-circle verified"></i>
                    </h3>
                    {e?.specialization && <p className="speciality">
                      {e?.specialization}
                    </p>}

                    <ul className="available-info">
                      {(e?.city || e?.country) && <li>
                        <i className="fas fa-map-marker-alt"></i>{e?.city + ", " + e?.country}
                      </li>}
                      {/* <li>
                    <i className="far fa-clock"></i> Available on Fri, 22 Mar
                  </li> */}
                      <li>
                        <i className="far fa-money-bill-alt"></i>{e?.price}{"$ "}
                        <i
                          className="fas fa-info-circle"
                          data-toggle="tooltip"
                          title="Lorem Ipsum"
                        ></i>
                      </li>
                    </ul>
                    <div className="row row-sm">
                      <div className="col-6">
                        <Link to="/coach-profile" className="btn view-btn">
                          View Profile
                        </Link>
                      </div>
                      <div className="col-6">
                        <Link to="/app/book-appointment" className="btn book-btn">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : "No Data Found"
          }
        </div>
      </div>
    </>
  );
};

export default Favourites;
