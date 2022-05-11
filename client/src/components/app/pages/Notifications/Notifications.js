import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getHttpRequest, putHttpRequest } from "../../../../axios";

const Notifications = () => {
  const id = useSelector((state) => state.auth.user.userid);
  const mediaPath = process.env.REACT_APP_IMG;

  const [notification, setNotification] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    getHttpRequest(`front/notification/list?to=${id}`).then((response) => {
      setNotification(response.data.data.notificationData);
      console.log(response);
    });
  }, []);
  const readNotification = (id) => {
    putHttpRequest(`front/notification/update/${id}`).then((response)=> {
      console.log(response)
    })
  }

  return (
    <div className="col-md-7 col-lg-8 col-xl-9">
      {notification && notification.length > 0 ? (
        notification.map((item, idx) => {
          return (
              <Link to="/app/appointments">
                <p className="notifcation-bar" onClick={readNotification(item._id)}>
                  <img className="avatar-img rounded-circle notification-img" alt="User" src={item?.from_info[0]?.fileName ? mediaPath + item.from_info[0].fileName : mediaPath + "avatar.jpg" }/>
                  <strong> {item?.from_info[0].firstname}&nbsp;{item?.from_info[0].lastname}&nbsp;</strong>
                  {item?.content}&nbsp;<sub>{moment(item.createdAt).fromNow()}</sub>
                </p>
              </Link>
          );
        })
      ) : (
        <div className="no-appoinments">
          <p>You don't have any Notifications</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
