import React, { Component } from "react";
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

// __ __ Component For Calender __ __ //
// __ __ __ __ __ __ __ __ __ __ __ _ //

class ClientCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: moment().format("MM/DD/YYYY"),
      date: moment().format("MM/DD/YYYY"),
      startDate: moment().format("MM/DD/YYYY"),
      endDate: moment().add(6, "days").format("MM/DD/YYYY"),
      dates: [],
      initDatePicker: true,
      loading: false,
      disabledPrevButton: true,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.generateWeekDates();
    var self = this;

    // $("#datepicker").datepicker({
    //     dateFormat: "mm/dd/yy",
    //     minDate: 0,
    //     onSelect: function (date) {
    //         var startDate = moment(date).subtract(3, "days").format("MM/DD/YYYY");
    //         var endDate = moment(date).add(3, "days").format("MM/DD/YYYY");

    //         self.setState({
    //             date: date,
    //             startDate: startDate,
    //             endDate: endDate,
    //             loading: true,
    //             initDatePicker: false
    //         }, () => {
    //             self.generateWeekDates()
    //         })
    //     },
    //     beforeShowDay: function (date) {
    //         if (self.state.initDatePicker) {
    //             var a = new Date(self.state.startDate);
    //             var b = new Date(self.state.startDate);
    //             a.setDate(a.getDate());
    //             b.setDate(b.getDate() + 6);
    //             return [true, a <= date && date <= b ? "selected-grid-cells" : ""];
    //         }
    //         else {
    //             var a = new Date(self.state.date);
    //             var b = new Date(self.state.date);
    //             a.setDate(a.getDate() - 3);
    //             b.setDate(b.getDate() + 3);
    //             return [true, a <= date && date <= b ? "selected-grid-cells" : ""];
    //         }
    //     },
    // })
  }

//   onSelect = (date) => {
//     console.log("onSelect");
//     var self = this;
//     var startDate = moment(date).subtract(3, "days").format("MM/DD/YYYY");
//     var endDate = moment(date).add(3, "days").format("MM/DD/YYYY");

//     self.setState(
//       {
//         date: date,
//         startDate: startDate,
//         endDate: endDate,
//         loading: true,
//         initDatePicker: false,
//       },
//       () => {
//         self.generateWeekDates();
//       }
//     );
//   };

//   handleChange = (date) => {
//     console.log("hello world");
//     var self = this;
//     if (self.state.initDatePicker) {
//       var a = new Date(self.state.startDate);
//       var b = new Date(self.state.startDate);
//       a.setDate(a.getDate());
//       b.setDate(b.getDate() + 6);
//       return [true, a <= date && date <= b ? "selected-grid-cells" : ""];
//     } else {
//       var a = new Date(self.state.date);
//       var b = new Date(self.state.date);
//       a.setDate(a.getDate() - 3);
//       b.setDate(b.getDate() + 3);
//       return [true, a <= date && date <= b ? "selected-grid-cells" : ""];
//     }
//   };

  generateWeekDates = () => {
    setTimeout(() => {
      if (this.state.startDate > this.state.today) {
        this.setState({ disabledPrevButton: false });
      } else {
        this.setState({ disabledPrevButton: true });
      }
      var tempStartDate = this.state.startDate;
      var dates = [];

      while (tempStartDate <= this.state.endDate) {
        dates.push(tempStartDate);
        tempStartDate = moment(tempStartDate)
          .add(1, "days")
          .format("MM/DD/YYYY");
      }

      this.setState({
        dates: dates,
        loading: false,
      });
    }, 1000);
  };

  getTimeStops = (start, end) => {
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

  handleOnClickGridSlot = (event, time, date) => {
    event.preventDefault();
    Toast.fire("TimeSlot!", "Date: " + date + ", Time: " + time, "success");
  };

  handleOnClickNextButton = () => {
    var endDate = this.state.endDate;
    var startDate = moment(endDate).add(1, "days").format("MM/DD/YYYY");
    endDate = moment(startDate).add(6, "days").format("MM/DD/YYYY");

    this.setState(
      {
        date: startDate,
        startDate: startDate,
        endDate: endDate,
        loading: true,
        initDatePicker: true,
      },
      () => {
        this.generateWeekDates();
      }
    );
  };

  handleOnClickPrevButton = () => {
    var startDate = this.state.startDate;
    var endDate = moment(startDate).subtract(1, "days").format("MM/DD/YYYY");
    startDate = moment(endDate).subtract(6, "days").format("MM/DD/YYYY");

    this.setState(
      {
        date: startDate,
        startDate: startDate,
        endDate: endDate,
        loading: true,
        initDatePicker: true,
      },
      () => {
        this.generateWeekDates();
      }
    );
  };

  render() {
    let selectedHeader = "";

    var timeStops = this.getTimeStops("00:00", "23:40");
    var selectedHumanReadableDate = moment(this.state.date).format(
      "MMM DD, YYYY"
    );

    const gridSlots = this.state.dates.map((date, index) => {
      var day = moment(date).format("DD");
      var dayName = moment(date).format("ddd");
      var humanReadableDate = moment(date).format("dddd, MMM DD, YYYY");

      var gridClass = "";
      if (date == this.state.today) gridClass = "today";
      else if (date < this.state.today) gridClass = "disabled-slot";

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
              {date == this.state.today ? (
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
                {date < this.state.today ? (
                  <span>{timeStop}</span>
                ) : (
                  <Link
                    to="#"
                    onClick={(event) =>
                      this.handleOnClickGridSlot(
                        event,
                        timeStop,
                        humanReadableDate
                      )
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
                <h3 className="booking-title m-0">
                  {selectedHumanReadableDate}
                </h3>
              </div>
              <div className="col-md-6 text-right">
                <div className=" datepick-wrap">
                  {/* <input type="text" id="datepicker" placeholder="Select Date" /> */}

                  <DatePicker
                    name="dateOfBirth"
                    id="datepicker"
                    onSelect={this.onSeclect}
                    selected={this.state.dateOfBirth}
                    onChange={this.handleChange}
                  />
                  <span className="dp-icon">
                    <i className="fa fa-calendar"></i>
                  </span>
                </div>
                <div className="week-controls">
                  <button
                    title="Prev Week"
                    className="btn btn-arrow btn-sm"
                    onClick={this.handleOnClickPrevButton}
                    disabled={this.state.disabledPrevButton}
                  >
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                  </button>
                  &nbsp;&nbsp;
                  <button
                    title="Next Week"
                    type="button"
                    className="btn btn-arrow btn-sm"
                    onClick={this.handleOnClickNextButton}
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
  }
}
export default ClientCalendar;
