import { useEffect, useState } from "react";
import ClientCalendar from "../Calendar/ClientCalendar";
import imagePath from "../../../../utils/url/imagePath";
import { getHttpRequest, postHttpRequest } from "../../../../axios";
const BookAppointment = () => {
  const mediaPath = process.env.REACT_APP_IMG;
  const url = window.location.pathname;
  const id = url.split("/").pop();
  const [coachProfileData, setCoachProfileData] = useState([]);
  useEffect(async () => {
    let res = await getHttpRequest(`/front/coach/get/${id}`);
    setCoachProfileData(res?.data?.coach);
  }, []);

  

  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="card">
          <div className="card-body">
            <div className="booking-doc-info">
              <div className="booking-doc-img">
                <img src={imagePath(coachProfileData.fileName)}alt="User"/>
              </div>
              <div className="booking-info">
                <h4>
                  <div>{coachProfileData.firstname}{coachProfileData.lastname}</div>
                </h4>
                <div className="rating">
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star"></i>
                  <span className="d-inline-block average-rating">35</span>
                </div>
                <p className="text-muted mb-0">
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {coachProfileData.country}{", "}{coachProfileData.city}
                </p>
              </div>
            </div>
          </div>
        </div>
        <ClientCalendar id={id}/>
      </div>
    </>
  );
};

export default BookAppointment;
