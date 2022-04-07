// import React, { useEffect, useState } from "react";
// import AvailableTimes from "react-available-times";
// import moment from "moment";
// import { getHttpRequest, postHttpRequest } from "../../../../axios";

// const CoachCalendar = (props) => {
//   const start = moment()
  
//   const [selections, setSelections]= useState([])
//   const [dates, setDates]= useState([])
//   const [loadcalender, setLoadcalender]= useState(false)

//   useEffect(() => {
//     getHttpRequest(`/front/coach/get/${userid}`)
//       .then((response) => {
//         if (!response) {
//           alert("Something went wrong with response...");
//           console.log("Something went wrong with response...");
//           return;
//         }

//         if (response.data.success === true) {
//           if (response.length > 0) {
//             let newSelections = [];
      
//             if (response[0].selections) {
//               var response = JSON.parse(response[0].selections).map(function (
//                 val,
//                 key
//               ) {
//                 var newobject = {};
//                 newobject.start = moment(val.start).toDate();
//                 newobject.end = moment(val.end).toDate();
//                 newSelections.push(newobject);
//               });
//             }
//             console.log("newSelectionsaaaaaaaaaaaaaaaaaaaaaaa");
//             console.log(newSelections);
//             setSelections(newSelections)
//             setLoadcalender(true)
//           } else {
//             setLoadcalender(true)
//           }
//         } else {
//           console.log(response.data.message);
//         }
//       })
//       .catch(() => {
//         console.log("Something went wrong...");
//       });
//   }, []);

//   return (
//     <div class="dashboard-content">
//         <div class="row">
//           <div class="col-lg-12">
//             <div id="add-listing">
//               <div class="add-listing-section">
//                 <div class="add-listing-headline">
//                   <h3 class="inner-custom-color">
//                     <i class="sl sl-icon-doc"></i> Trainer Schedule
//                   </h3>
//                   <h5 style={{ marginLeft: "20%", color: "grey" }}>
//                     {" "}
//                     Open time slots on your calendar so clients know when they
//                     can book a session with you.
//                   </h5>
//                 </div>
//                 <div class="submit-section">
//                   {loadcalender ? (
//                     <AvailableTimes
//                       weekStartsOn="monday"
//                       calendars={[
//                         {
//                           id: "work",
//                           title: "Work",
//                           foregroundColor: "#ff00ff",
//                           backgroundColor: "#f0f0f0",
//                           selected: true,
//                         },
//                         {
//                           id: "private",
//                           title: "My private cal",
//                           foregroundColor: "#666",
//                           backgroundColor: "#f3f3f3",
//                         },
//                       ]}
//                       onChange={async (selections) => {

//                         let dates = [];
//                         selections.forEach(({ start, end }) => {
//                           console.log("Start:", start, "End:", end);
//                           dates.push(moment(start).format('MM/DD/YYYY'));
//                         });

//                         let uniqueArray = dates.filter(function(item, pos) {
//                           return dates.indexOf(item) == pos;
//                         });

//                         console.log("dates", dates);
//                         if(dates.length !== uniqueArray.length){
//                           selections.pop();
//                           alert("You can't select multiple slot in a day");
                          
//                           window.location.reload(); 
//                           return false; 
//                         }



//                         console.log("aaaaaaaaaaaaaaa", selections);
//                         const user = JSON.parse(
//                           localStorage.getItem("accessToken")
//                         );
//                         var formData = {
//                           userId: user.id,
//                           selections: JSON.stringify(selections),
//                         };

//                         console.log("formData", formData);

//                         var response = await apiHelper(
//                           "get",
//                           `api/trainerShedules?filter[where][userId]=${user.id}`,
//                           null
//                         );
//                         if (response.length == 1) {
//                           console.log("aaaaaaa", response[0].id);

//                           var result = await apiHelper(
//                             "post",
//                             `api/trainerShedules/update?where=%7B%22id%22%3A%22${response[0].id}%22%7D`,
//                             formData,
//                             null
//                           );
//                           if (result.status === 403) {
//                             this.setState({ errors: result.message });
//                           } else if (result.status === 200) {
//                             debugger;
//                             notify.show(
//                             "Event has been registered successfully!!",
//                             "success",
//                             2000
//                             );
//                             this.props.history.push({
//                               pathname: "/user/activity",
//                               state: {
//                                 key: "value",
//                               },
//                             });
//                           } else if (result.status === 500) {
//                             this.setState({ errors: result.message });
//                             return;
//                           }
//                         } else {
//                           var result = await apiHelper(
//                             "post",
//                             "api/trainerShedules",
//                             formData,
//                             null
//                           );
//                           if (result.status === 403) {
//                             this.setState({ errors: result.message });
//                           } else if (result.status === 200) {
//                             debugger;
//                             notify.show(
//                             "Event has been registered successfully!!",
//                             "success",
//                             2000
//                             );
//                             this.props.history.push({
//                               pathname: "/user/activity",
//                               state: {
//                                 key: "value",
//                               },
//                             });
//                           } else if (result.status === 500) {
//                             this.setState({ errors: result.message });
//                             return;
//                           }
//                         }
//                       }}
//                       onEventsRequested={({
//                         calendarId,
//                         start,
//                         end,
//                         callback,
//                       }) => {
//                         this.loadMoreEvents(calendarId, start, end).then(
//                           callback
//                         );
//                       }}
//                       initialSelections={selections}
//                       height={400}
//                       recurring={false}
//                       availableDays={[
//                         "monday",
//                         "tuesday",
//                         "wednesday",
//                         "thursday",
//                         "friday",
//                         "saturday",
//                         "sunday",
//                       ]}
//                       availableHourRange={{ start: 3, end: 21 }}
//                     />
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default CoachCalendar;