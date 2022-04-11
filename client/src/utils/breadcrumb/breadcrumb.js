export default function breadCrumb(path) {
  if (path) {
    const urlArray = path.split("/");
    const URI = urlArray.pop();
    var schema = [
      {
        path: "coach-dashboard",
        associatedName: "Dashboard",
      },
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
        path: "my-clients",
        associatedName: "My Clients",
      },
      {
        path: "invoices-view",
        associatedName: "Invoices",
      },
      {
        path: "reviews",
        associatedName: "Reviews",
      },
      {
        path: "coach-profile-setting",
        associatedName: "Profile Setting",
      },
      {
        path: "coach-change-password",
        associatedName: "Change Password",
      },
      {
        path: "client-change-password",
        associatedName: "Change Password",
      },
      {
        path: "client-profile-setting",
        associatedName: "Profile Setting",
      },
      {
        path: "coach-profile",
        associatedName: "Profile",
      },
      {
        path: "client-profile",
        associatedName: "Profile",
      },
    ];
    const result = schema.filter((schema) => schema.path === URI);
    const res = result.pop();
    return res;
  }
}
