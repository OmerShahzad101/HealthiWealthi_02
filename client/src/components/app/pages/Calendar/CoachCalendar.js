import React, { useEffect, useState } from "react";
import AvailableTimes from "react-available-times";
import moment from "moment";
import { getHttpRequest, postHttpRequest } from "../../../../axios";
import { useSelector } from "react-redux";
import Toast from "../../../common/toast/Toast";

const CoachCalendar = ({ availabilityTab }) => {
  const userid = useSelector((state) => state.auth.user.userid);
  const start = moment();

  const [selections, setSelections] = useState([]);
  const [dates, setDates] = useState([]);
  const [loadcalender, setLoadcalender] = useState(false);

  function loadMoreEvents(calendarId, start, end) {
    //console.log("calendarId");
    console.log("calendarId",calendarId, start, end);
  }

  useEffect(() => {
    getHttpRequest(`/front/schedule/get/${userid}`)
      .then((response) => {
        if (!response) {
          alert("Something went wrong with response...");
          return;
        }
        if (response && response?.data?.success === true) {
          let newSelections = [];
          if (response?.data?.ScheduleData) {
            var response = response?.data?.ScheduleData?.selections.map(
              function (val, key) {
                var newobject = {};
                newobject.start = moment(val.start).toDate();
                newobject.end = moment(val.end).toDate();
                newSelections.push(newobject);
              }
            );
          }
          setSelections(newSelections);
          setLoadcalender(true);
        } 
        else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        alert(e);
        console.log("Something went wrong...");
      });
  }, []);

  return (
    availabilityTab === "availability" && (
      <div class="dashboard-content">
        <div class="row">
          <div class="col-lg-12">
            <div id="add-listing">
              <div class="add-listing-section">
                <div class="add-listing-headline">
                  <h5 style={{ color: "grey" }}>
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

                        var formData = {
                          userId: userid,
                          selections: JSON.stringify(selections),
                        };

                        var response = await getHttpRequest(
                          `front/schedule/get/${userid}`
                        );
                        if (response) {
                          var result = await postHttpRequest(
                            "front/schedule/set",
                            formData
                          );
                          if (result.status === 200) {
                            Toast.fire({
                              icon: "success",
                              title: "Event registered successfully",
                            });
                          } else if (result.status === 500) {
                            console.log("status500");
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
                      height={600}
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
