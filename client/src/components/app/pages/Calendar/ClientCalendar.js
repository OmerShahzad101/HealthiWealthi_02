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
import { createGlobalStyle } from "styled-components";
window.jQuery = $;

const ClientCalendar = (props) => {
  const userid = useSelector((state) => state.auth.user.userid);
  const [dates, setDates] = useState([]);
  const [booking, setBooking] = useState();
  const [loading, setLoading] = useState(false);
  const [initDatePicker, setInitDatePicker] = useState(true);
  const [slotsByEachDate, setslotsByEachDate] = useState({});
  const [disabledPrevButton, setDisabledPrevButton] = useState(true);
  const [date, setDate] = useState(moment().format("MM/DD/YYYY"));
  const [today, setToday] = useState(moment().format("MM/DD/YYYY"));
  const [startDate, setStartDate] = useState(moment().format("MM/DD/YYYY"));
  const [endDate, setEndDate] = useState(moment().add(6, "days").format("MM/DD/YYYY"));

  useEffect(() => {
    setLoading(true);   
    generateWeekDates();
  }, [startDate]);

  useEffect(()=>{
    getHttpRequest(`/front/schedule/get/${props.id}`)
    .then((response) => {
      if (!response) {
        alert("Something went wrong with response...");
        return;
      }

      if (response && response?.data?.success === true) {
        let selections = response?.data?.ScheduleData?.selections;
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
        console.log(slotsByEachDate);
      } else {
        console.log(response.data.message);
      }
    })
    .catch((e) => {
      console.log("Something went wrongggg...");
    });
  },[])

  
  const generateWeekDates = () => {
    // debugger;
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
      timeStops.push(new moment(startTime).format("HH:mm"));
      startTime.add(60, "minutes");
    }
    return timeStops;
  };
  const handleOnClickGridSlot = (event, time, date) => {
    event.preventDefault();
    Toast.fire("TimeSlot!", "Date: " + date + ", Time: " + time, "success");
  };

  const handleOnClickNextButton =  () => {
    //   debugger;
      
    //  var endDate = endDate;
    // console.log(endDate,"end date message");

    // var startDate = moment(endDate).add(1, "days").format("MM/DD/YYYY");
    // endDate = moment(startDate).add(6, "days").format("MM/DD/YYYY");


    setStartDate(  moment(endDate).add(1, "days").format("MM/DD/YYYY"));
    setDate(  moment(endDate).add(1, "days").format("MM/DD/YYYY"));
    setEndDate( moment(endDate).add(7, "days").format("MM/DD/YYYY"));
    setLoading(true);
    setInitDatePicker(true);
    // generateWeekDates();
  };

  const handleOnClickPrevButton = () => {
    // var startDate = startDate;
    // var endDate = moment(startDate).subtract(1, "days").format("MM/DD/YYYY");
    // startDate = moment(endDate).subtract(6, "days").format("MM/DD/YYYY");

    debugger;
    setStartDate(moment(startDate).subtract(7, "days").format("MM/DD/YYYY"));
    setDate(moment(startDate).subtract(7, "days").format("MM/DD/YYYY"));
    setEndDate(moment(endDate).subtract(7, "days").format("MM/DD/YYYY"));
    setLoading(true);
    setInitDatePicker(true);
    generateWeekDates();
  };

  let selectedHeader = "";

  var timeStops = getTimeStops("00:00", "23:00");
  var selectedHumanReadableDate = moment(date).format("MMM DD, YYYY");
  let allActiveSlots = [];
  let activeSlot = [];
  // ------B------------A---------------------------------------
  // -------O------------P-------------------------------------
  // --------O------------P--------T---------------------------
  // ---------K------------O------N----------------------------
  // ----------I------------I----E-----------------------------
  // -----------N------------N--M-------------------------------
  // ------------G------------T--------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({
      ...booking,
      [name]: value,
    });
  };
  const bookHandler = () => {
    const payload= {
      clientId : userid,
      coachId: props.id,
      // slot: startTime of appoinment
      // date: startDate of Appointments
      // bookingDetail: both time and date
      status: true,
    }
    console.log(payload)
    // postHttpRequest(`/front/booking/create` , payload)
  }
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  // ----------------------------------------------------------

  const gridSlots = dates.map((date, index) => {
    var day = moment(date).format("DD");
    var dayName = moment(date).format("ddd");
    var humanReadableDate = moment(date).format("dddd, MMM DD, YYYY");

    var gridClass = "";
    if (date == today) gridClass = "today";
    else if (date < today) gridClass = "disabled-slot";


    return (
      <div className={`gridDay ${gridClass}`} key={date}>
        {/* {console.log("date", date)} */}
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
          {/* {console.log("stops", timeStops)}
          {console.log("mytime", slotsByEachDate)} */}


          {timeStops.map((timeStop) => {
            let disabled = true;
            for (const filterCurrentDate in slotsByEachDate) {
              if (filterCurrentDate == date) {
                // console.log("matched", filterCurrentDate, date);
                // console.log("asjkhdajkhda", slotsByEachDate[filterCurrentDate]);
                allActiveSlots = [];
                activeSlot = [];
            
                allActiveSlots = slotsByEachDate[filterCurrentDate].map((data) => {
                 //console.log(data.start);
                  return data.start;
                });
                //console.log(allActiveSlots);
                activeSlot = allActiveSlots.filter((val) => timeStop == val);
                //console.log(activeSlot);
                if (activeSlot.length) {
                 // console.log(disabled);
                  disabled = false; 
                }
              }
            }
          
            return (
              <div className="gridSlot" key={timeStop}>
                {date < today ? (
                  <span>{timeStop}</span>
                ) : (
                  <button
                    disabled={disabled}
                    to="#"
                    onClick={(event) =>
                      handleOnClickGridSlot(event, timeStop, humanReadableDate)
                    }
                  >
                    {timeStop}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  });
  return (
    <div>
      <section className="account-wrapper section-pd pb-0">
        {/* <h3 className="page-title">
          <span className="title-align"> Book Your Video Consultation</span>
        </h3> */}

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
        {/* <!-- Submit Section --> */}
        <div className="submit-section proceed-btn text-end">
          <button type="submit" onClick={bookHandler}  className="btn btn-primary submit-btn">
            Proceed to Pay
          </button >
        </div>
        {/* <!-- /Submit Section --> */}
      
      </section>
    </div>
  );
};

export default ClientCalendar;