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
  const [refreshcalender, setRefreshcalender] = useState(false);


  function loadMoreEvents(calendarId, start, end) {
    // console.log("calendarId", calendarId, start, end);
  }

  useEffect(() => {

    getHttpRequest(`/front/schedule/get/${userid}`)
      .then((response) => {
        if (!response) {
          return;
        }
        if (response && response?.data?.success === true) {
          let newSelections = [];
          // console.log("response?.data?.scheduleData", response);
          if (response?.data?.scheduleData) {
            var response = response?.data?.scheduleData?.selections.map(
              function (val, key) {
                var newobject = {};
                newobject.start = moment(val.start).toDate();
                newobject.end = moment(val.end).toDate();
                newSelections.push(newobject);
              }
            );
          }
          setSelections(newSelections);
          // console.log(newSelections,"newwwwwwwwwwwwwwww")
          setLoadcalender(true);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log("Something went wrong...");
      });
  }, [refreshcalender]);

  return (
    availabilityTab === "availability" && (
      
      <div className="dashboard-content">
        <div className="row">
          <div className="col-lg-12">
            <div id="add-listing">
              <div className="add-listing-section">
                <div className="add-listing-headline">
                  <h5 style={{ color: "grey" }}>
                    {" "}
                    Open time slots on your calendar so clients know when they
                    can book a session with you.
                  </h5>
                </div>
                <div className="submit-section">
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
                        // debugger
                        let dates = [];
                        selections.forEach(({ start, end }) => {
                          var checkHours = moment.utc(moment(end, "HH:mm").diff(moment(start, "HH:mm"))).format("HH:mm")
                          if(moment.duration(checkHours).asMinutes() % 60 == 0){
                            dates.push(moment(start).format("MM/DD/YYYY"));
                          }
                          else{
                            alert("Minimum Hour slot can be selected")
                            window.location.reload()
                          }
                          
                        });

                        var formData = {
                          userId: userid,
                          selections: JSON.stringify(selections),
                        };

                        // var response = await getHttpRequest(
                        //   `front/schedule/get/${userid}`
                        // );
                        // if (response) {
                          
                        // }
                        var result = await postHttpRequest(
                          "front/schedule/set",
                          formData
                        );
                        if (result.status === 200) {
                          Toast.fire({
                            icon: "success",
                            title: "Event registered successfully",
                          });
                          setRefreshcalender(!refreshcalender)
                        } else if (result.status === 500) {
                          console.log("status500");
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
