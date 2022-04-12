import React, { useEffect, useState } from "react";
import AvailableTimes from "react-available-times";
import moment from "moment";
import { getHttpRequest, postHttpRequest } from "../../../../axios";
import { useSelector } from "react-redux";
import Toast from "../../../common/toast/Toast";

const CoachCalendar = ({ calendarTab }) => {
  const userid = useSelector((state) => state.auth.userid);
  const start = moment();

  const [selections, setSelections] = useState([]);
  const [dates, setDates] = useState([]);
  const [loadcalender, setLoadcalender] = useState(false);

  function loadMoreEvents(calendarId, start, end) {
    console.log("calendarId");
    console.log(calendarId, start, end);
  }

  useEffect(() => {
    getHttpRequest(`/front/schedule/get/${userid}`)
      .then((response) => {
        if (!response) {
          alert("Something went wrong with response...");
          console.log("Something went wrong with response...");
          return;
        }
        console.log("first response", response);
        if (response.data.success === true) {
          if (response.length > 0) {
            let newSelections = [];

            if (response[0].selections) {
              var response = JSON.parse(response[0].selections).map(function (
                val,
                key
              ) {
                var newobject = {};
                newobject.start = moment(val.start).toDate();
                newobject.end = moment(val.end).toDate();
                newSelections.push(newobject);
              });
            }
            console.log("newSelectionsaaaaaaaaaaaaaaaaaaaaaaa");
            console.log(newSelections);
            setSelections(newSelections);
            setLoadcalender(true);
          } else {
            console.log("setLoading");
            setLoadcalender(true);
          }
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        alert(e);
        console.log("Something went wrong...");
      });
  }, []);

  return (
    calendarTab === "calendar" && (
      <div class="dashboard-content">
        <div class="row">
          <div class="col-lg-12">
            <div id="add-listing">
              <div class="add-listing-section">
                <div class="add-listing-headline">
                  <h3 class="inner-custom-color">
                    <i class="sl sl-icon-doc"></i> Trainer Schedule
                  </h3>
                  <h5 style={{ marginLeft: "20%", color: "grey" }}>
                    {" "}
                    Open time slots on your calendar so clients know when they
                    can book a session with you.
                  </h5>
                </div>
                <div class="submit-section">
                  {loadcalender ? (
                    <AvailableTimes
                      weekStartsOn="monday"
                      calendars={[
                        {
                          id: "work",
                          title: "Work",
                          foregroundColor: "#ff00ff",
                          backgroundColor: "#f0f0f0",
                          selected: true,
                        },
                        {
                          id: "private",
                          title: "My private cal",
                          foregroundColor: "#666",
                          backgroundColor: "#f3f3f3",
                        },
                      ]}
                      onChange={async (selections) => {
                        let dates = [];
                        selections.forEach(({ start, end }) => {
                          console.log("Start:", start, "End:", end);
                          dates.push(moment(start).format("MM/DD/YYYY"));
                        });

                        // let uniqueArray = dates.filter(function(item, pos) {
                        //   return dates.indexOf(item) == pos;
                        // });

                        // console.log("dates", dates);
                        // if(dates.length !== uniqueArray.length){
                        //   selections.pop();
                        //   alert("You can't select multiple slot in a day");

                        //   window.location.reload();
                        //   return false;
                        // }

                        console.log("aaaaaaaaaaaaaaa", selections);
                        //   const user = JSON.parse(
                        //     localStorage.getItem("accessToken")
                        //   );
                        var formData = {
                          userId: userid,
                          selections: JSON.stringify(selections),
                        };

                        console.log("formData", formData);

                        var response = await getHttpRequest(
                          `front/schedule/get/${userid}`
                        );
                        if (response.length == 1) {
                          console.log("aaaaaaa", response[0].id);

                          var result = await postHttpRequest(
                            `front/schedule/set`,
                            formData
                          );
                          if (result.status === 403) {
                            console.log("status403");
                            //   this.setState({ errors: result.message });
                          } else if (result.status === 200) {
                            Toast.fire({
                              icon: "success",
                              title: "Event registered successfully",
                            });
                            //   debugger;
                            //   notify.show(
                            //     "Event has been registered successfully!!",
                            //     "success",
                            //     2000
                            //   );
                            //   this.props.history.push({
                            //     pathname: "/user/activity",
                            //     state: {
                            //       key: "value",
                            //     },
                            //   });
                          } else if (result.status === 500) {
                            console.log("status500");
                            //   this.setState({ errors: result.message });
                            //   return;
                          }
                        } else {
                          var result = await postHttpRequest(
                            "front/schedule/set",
                            formData
                          );
                          if (result.status === 403) {
                            console.log("status403");
                            //   this.setState({ errors: result.message });
                          } else if (result.status === 200) {
                            Toast.fire({
                              icon: "success",
                              title: "Event registered successfully",
                            });
                            //   notify.show(
                            //     "Event has been registered successfully!!",
                            //     "success",
                            //     2000
                            //   );
                            //   this.props.history.push({
                            //     pathname: "/user/activity",
                            //     state: {
                            //       key: "value",
                            //     },
                            //   });
                          } else if (result.status === 500) {
                            console.log("status500");
                            //   this.setState({ errors: result.message });
                            //   return;
                          }
                        }
                      }}
                      onEventsRequested={({
                        calendarId,
                        start,
                        end,
                        callback,
                      }) => {
                        loadMoreEvents(calendarId, start, end);
                      }}
                      initialSelections={selections}
                      height={400}
                      recurring={false}
                      availableDays={[
                        "monday",
                        "tuesday",
                        "wednesday",
                        "thursday",
                        "friday",
                        "saturday",
                        "sunday",
                      ]}
                      availableHourRange={{ start: 0, end: 24 }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CoachCalendar;
