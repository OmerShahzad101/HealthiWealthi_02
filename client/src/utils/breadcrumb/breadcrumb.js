export default function breadCrumb(path) {
  if (path) {
    const urlArray = path.split("/");
    const URI = urlArray.pop();
    var schema = [
      {
        path: "client-dashboard",
        associatedName: "Dashboard",
      },
      {
        path: "favourites",
        associatedName: "Favourites",
      },
      {
        path: "appointments",
        associatedName: "Appointments",
      },
      {
        path: "book-appointment",
        associatedName: "Book Appointment",
      },
      {
        path: "/booking-successful",
        associatedName: "Booking Successfull",
      },
      // {
      //   path: "favourites",
      //   associatedName: "Favourites",
      // },
      // {
      //   path: "favourites",
      //   associatedName: "Favourites",
      // },
      // {
      //   path: "favourites",
      //   associatedName: "Favourites",
      // },
      // {
      //   path: "favourites",
      //   associatedName: "Favourites",
      // },
      // {
      //   path: "favourites",
      //   associatedName: "Favourites",
      // },
      // {
      //   path: "favourites",
      //   associatedName: "Favourites",
      // },
      // {
      //   path: "favourites",
      //   associatedName: "Favourites",
      // },
      // {
      //   path: "favourites",
      //   associatedName: "Favourites",
      // },
      // {
      //   path: "favourites",
      //   associatedName: "Favourites",
      // },
      // {
      //   path: "favourites",
      //   associatedName: "Favourites",
      // },
    ];
    const result = schema.filter((schema) => schema.path == URI);
    const res = result.pop();
    return res;
  }
}
