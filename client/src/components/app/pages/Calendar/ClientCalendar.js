import React, { Component, useEffect, useState } from "react";

import Slider from "react-slick";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { getHttpRequest, postHttpRequest } from "../../../../axios";
import { useSelector } from "react-redux";
import Toast from "../../../common/toast/Toast";
import { CLIENT_DASHBOARD } from "../../../../router/constants/ROUTES";
import { useHistory } from "react-router-dom";

const ClientCalendar = (props) => {
  const userid = useSelector((state) => state.auth.user.userid);
  const [today, setToday] = useState(moment().format("MM/DD/YYYY"));
  const [slotsByEachDate, setslotsByEachDate] = useState({});
  const googleRefreshToken = localStorage.getItem("googleRefreshToken");
  const history = useHistory();
  let bookingDate;

  const settings = {
    dots: false,
    autoplay: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getHttpRequest(`/front/schedule/get/${props.id}`)
      .then((response) => {
        if (!response) {
          alert("Something went wrong with response...");
          return;
        }

        if (response && response?.data?.success === true) {
          let selections = response?.data?.scheduleData?.selections;
          for (var i = 0; i < selections.length; i++) {
            let _start = selections[i]?.start;
            let _end = selections[i]?.end;
            let _dateAsIndexed = moment(_start).format("MM/DD/YYYY");
            let _formatedStartDate = moment(_start).format("MM-DD-YYYY");
            let _formatedStartTime = moment(_start).format("HH:mm");
            let _formatedEndTime = moment(_end).format("HH:mm");
            if (slotsByEachDate[_dateAsIndexed])
              slotsByEachDate[_dateAsIndexed].push({
                start: _formatedStartTime,
                end: _formatedEndTime,
              });
            else
              slotsByEachDate[_dateAsIndexed] = [
                { start: _formatedStartTime, end: _formatedEndTime },
              ];
          }
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        alert(e);
        console.log("Something went wrongggg...");
      });
  }, []);
  const handleOnClickGridSlot = (event, timeStart, timeEnd, date) => {
    bookingDate = date;
    event.preventDefault();
    // Toast.fire(
    //   "Your Appoinment is Booked on ",
    //   "Date: " + date + ", Time: " + timeStart + " to " + timeEnd,
    //   "success"
    // ).then(() => {
    //   history.push(CLIENT_DASHBOARD);
    // });

    let startTime = moment(date + " " + timeStart);
    let endTime = moment(date + " " + timeEnd);

    startTime = moment(startTime).format();
    endTime = moment(endTime).format();
    let summary = "Coach Meeting";

    postHttpRequest(`front/googleMeet/create`, {
      startTime,
      endTime,
      googleRefreshToken,
      summary,
    })
      .then((response) => {
        if (!response) {
          alert("Something went wrong with response...");
          return;
        }
        if (response.data.meetLink) {
          postHttpRequest(`front/booking/create`, {
            slots: timeStart + "-" + timeEnd,
            client: userid,
            coach: props.id,
            bookingDate,
            meetingLink: response.data.meetLink,
          }).then((res) => {
            console.log(res);
            Toast.fire(
              "Your Appoinment is Booked on ",
              "Date: " + date + ", Time: " + timeStart + " to " + timeEnd,
              "success"
            ).then(() => {
              history.push(CLIENT_DASHBOARD);
            });
          });
        }
      })
      .catch((e) => {
        console.log("Something went wrongggg...");
      });
  };

  const appointmentSlots = Object.entries(slotsByEachDate).map(
    ([availableDay, availableTime]) => {
      let dayName = moment(availableDay).format("ddd");
      let humanReadableDate = moment(availableDay).format("DD MMM, YYYY");
      let gridClass = "";
      if (availableDay < today) {
        return false;
      }
      if (availableDay == today) gridClass = "today";

      return (
        <div className={`gridDay ${gridClass} p-3`} key={availableDay}>
          <div className="gridDayHeader">
            <h3>
              {availableDay == today && (
                <span className="gridDayHeaderToday"> Today</span>
              )}
              <span className="gridDayHeaderName">{dayName}</span>
              <span className="gridDayHeaderDate">{humanReadableDate}</span>
            </h3>
          </div>
          <div className="gridSlots">
            {availableTime.map((time) => (
              <div className="gridSlot">
                <button
                  to="#"
                  onClick={(event) =>
                    handleOnClickGridSlot(
                      event,
                      time.start,
                      time.end,
                      humanReadableDate
                    )
                  }
                >
                  {time.start} -- {time.end}
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }
  );

  return (
    <>
      <div>
        <section className="account-wrapper section-pd pb-0">
          <h3 className="page-title">
            <span className="title-align"> Book Your Video Consultation</span>
          </h3>

          <div className="container booking">
            <div className="booking-form">
              <Slider {...settings}>{appointmentSlots}</Slider>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ClientCalendar;
