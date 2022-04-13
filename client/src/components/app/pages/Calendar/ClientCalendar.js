import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import $ from "jquery";
// import "../../jquery-ui"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { getHttpRequest, postHttpRequest } from "../../../../axios";
import { useSelector } from "react-redux";
import Toast from "../../../common/toast/Toast";
window.jQuery = $;

const ClientCalendar = () => {
  const userid = useSelector((state) => state.auth.user.userid);
  const [today, setToday] = useState(moment().format("MM/DD/YYYY"));
  const [date, setDate] = useState(moment().format("MM/DD/YYYY"));
  const [startDate, setStartDate] = useState(moment().format("MM/DD/YYYY"));
  const [endDate, setEndDate] = useState(
    moment().add(6, "days").format("MM/DD/YYYY")
  );
  const [dates, setDates] = useState([]);
  const [initDatePicker, setInitDatePicker] = useState(true);
  const [loading, setLoading] = useState(false);
  const [disabledPrevButton, setDisabledPrevButton] = useState(true);
  const [uniqueDates , setUniqueDates] = useState([])

  function isDateInArray(needle, haystack) {
    for (var i = 0; i < haystack.length; i++) {
      if (needle.getTime() === haystack[i].getTime()) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    setLoading(true);

    getHttpRequest(`/front/schedule/get/${userid}`)
      .then((response) => {
        if (!response) {
          alert("Something went wrong with response...");
          return;
        }

        if (response && response?.data?.success === true) {
          console.log("get schedule API working", response);

          for (var i = 0; i < response?.data?.ScheduleData?.selections?.length; i++) {
            if (!isDateInArray(dates[i], uniqueDates)) {
              uniqueDates.push(dates[i]);
            }
          }
          console.log(uniqueDates)
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        alert(e);
        console.log("Something went wrongggg...");
      });
    generateWeekDates();
  }, []);

  const generateWeekDates = () => {
    setTimeout(() => {
      if (startDate > today) {
        setDisabledPrevButton(false);
      } else {
        setDisabledPrevButton(true);
      }
      var tempStartDate = startDate;
      var dates = [];

      while (tempStartDate <= endDate) {
        dates.push(tempStartDate);
        tempStartDate = moment(tempStartDate)
          .add(1, "days")
          .format("MM/DD/YYYY");
      }
      setDates(dates);
      setLoading(false);
    }, 1000);
  };

  const getTimeStops = (start, end) => {
    var startTime = moment(start, "HH:mm");
    var endTime = moment(end, "HH:mm");

    if (endTime.isBefore(startTime)) {
      endTime.add(1, "day");
    }

    var timeStops = [];

    while (startTime <= endTime) {
      timeStops.push(new moment(startTime).format("hh:mm A"));
      startTime.add(60, "minutes");
    }
    return timeStops;
  };
  const handleOnClickGridSlot = (event, time, date) => {
    event.preventDefault();
    Toast.fire("TimeSlot!", "Date: " + date + ", Time: " + time, "success");

  };

  const handleOnClickNextButton = () => {
    var endDate = endDate;
    var startDate = moment(endDate).add(1, "days").format("MM/DD/YYYY");
    endDate = moment(startDate).add(6, "days").format("MM/DD/YYYY");

    setDate(startDate);
    setStartDate(startDate);
    setEndDate(endDate);
    setLoading(true);
    setInitDatePicker(true);
    generateWeekDates();
  };

  const handleOnClickPrevButton = () => {
    var startDate = startDate;
    var endDate = moment(startDate).subtract(1, "days").format("MM/DD/YYYY");
    startDate = moment(endDate).subtract(6, "days").format("MM/DD/YYYY");

    setDate(startDate);
    setStartDate(startDate);
    setEndDate(endDate);
    setLoading(true);
    setInitDatePicker(true);
    generateWeekDates();
  };

  let selectedHeader = "";

  var timeStops = getTimeStops("00:00", "23:00");
  var selectedHumanReadableDate = moment(date).format("MMM DD, YYYY");

  const gridSlots = dates.map((date, index) => {
    var day = moment(date).format("DD");
    var dayName = moment(date).format("ddd");
    var humanReadableDate = moment(date).format("dddd, MMM DD, YYYY");

    var gridClass = "";
    if (date == today) gridClass = "today";
    else if (date < today) gridClass = "disabled-slot";

    return (
      <div className={`gridDay ${gridClass}`} key={date}>
        <div className="gridDayHeader">
          <h3>
            <span
              className="gridDayHeaderFull"
              id={`col-header-${index}`}
              data-content={humanReadableDate}
            >
              {humanReadableDate}
            </span>
            <span className="gridDayHeaderName" data-content={dayName}>
              {dayName}{" "}
            </span>
            {date == today ? (
              <span className="gridDayHeaderToday"> Today</span>
            ) : null}
            <span className="gridDayHeaderDate" data-content={day}>
              {day}
            </span>
            <span className="aria-hidden">{humanReadableDate} </span>
          </h3>
        </div>
        <div className="gridSlots">
          {timeStops.map((timeStop) => (
            <div className="gridSlot" key={timeStop}>
              {date < today ? (
                <span>{timeStop}</span>
              ) : (
                <Link
                  to="#"
                  onClick={(event) =>
                    handleOnClickGridSlot(event, timeStop, humanReadableDate)
                  }
                >
                  {timeStop}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  });
  return (
    <div>
      <section className="account-wrapper section-pd pb-0">
        <h3 className="page-title">
          <span className="title-align"> Book Your Video Consultation</span>
        </h3>

        <div className="container booking">
          <div className="row align-items-center mb-4">
            <div className="col-md-6">
              <h3 className="booking-title m-0">{selectedHumanReadableDate}</h3>
            </div>
            <div className="col-md-6 text-right">
              <div className="week-controls">
                <button
                  title="Prev Week"
                  className="btn btn-arrow btn-sm"
                  onClick={handleOnClickPrevButton}
                  disabled={disabledPrevButton}
                >
                  <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
                &nbsp;&nbsp;
                <button
                  title="Next Week"
                  type="button"
                  className="btn btn-arrow btn-sm"
                  onClick={handleOnClickNextButton}
                >
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="booking-form">
            <div className="gridDays">{gridSlots}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientCalendar;
