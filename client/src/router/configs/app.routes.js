import { lazy } from "react";
import withSuspense from "../../hoc/withSuspense";
import * as routes from "../constants/ROUTES";

// --------------------------- Coach_Routes ----------------------------
// Coach Dashboard
const CoachDashboard = lazy(() =>import( /* webpackChunkName: "CoachDashboard" */ "../../components/app/pages/CoachDashboard/CoachDashboard"));
const CoachDashboardWithSuspense = withSuspense(CoachDashboard);

const CoachChangePassword = lazy(() =>import( /* webpackChunkName: "CoachChangePassword" */ "../../components/app/pages/CoachChangePassword/CoachChangePassword"));
const CoachChangePasswordWithSuspense = withSuspense(CoachChangePassword);

// const CoachProfile = lazy(() =>import(/* webpackChunkName: "CoachProfile" */ "../../components/app/pages/CoachProfile/CoachProfile"));
// const CoachProfileWithSuspense = withSuspense(CoachProfile);

const UpgradeProfile = lazy(() =>import( /* webpackChunkName: "CoachProfile" */ "../../components/app/pages/UpgradeProfile/UpgradeProfile"));
const UpgradeProfileWithSuspense = withSuspense(UpgradeProfile);

const CoachProfileSetting = lazy(() =>import( /* webpackChunkName: "CoachProfileSetting" */ "../../components/app/pages/CoachProfileSetting/CoachProfileSetting"));
const CoachProfileSettingWithSuspense = withSuspense(CoachProfileSetting);

const MyClient = lazy(() =>import(/* webpackChunkName: "MyClient" */ "../../components/app/pages/MyClient/MyClient"));
const MyClientWithSuspense = withSuspense(MyClient);

const InvoicesView = lazy(() =>import(/* webpackChunkName: "InvoicesView" */ "../../components/app/pages/InvoicesView/InvoicesView"));
const InvoicesViewWithSuspense = withSuspense(InvoicesView);

const Appointments = lazy(() =>import(/* webpackChunkName: "Appointments" */ "../../components/app/pages/Appointments/Appointments"));
const AppointmentsWithSuspense = withSuspense(Appointments);

const Reviews = lazy(() =>import(/* webpackChunkName: "Reviews" */ "../../components/app/pages/Reviews/Reviews"));
const ReviewsWithSuspense = withSuspense(Reviews);
// --------------------------- Client Routes ----------------------------

const BookAppointment = lazy(() =>import(/* webpackChunkName: "BookAppointment" */ "../../components/app/pages/BookAppointment/BookAppointment"));
const BookAppointmentWithSuspense = withSuspense(BookAppointment);

const BookingSuccessful = lazy(() =>import(/* webpackChunkName: "BookingSuccessful" */ "../../components/app/pages/BookingSuccessful/BookingSuccessful"));
const BookingSuccessfulWithSuspense = withSuspense(BookingSuccessful);

const Checkout = lazy(() =>import(/* webpackChunkName: "Checkout" */ "../../components/app/pages/Checkout/Checkout"));
const CheckoutWithSuspense = withSuspense(Checkout);

const ClientDashboard = lazy(() =>import(/* webpackChunkName: "ClientDashboard" */ "../../components/app/pages/ClientDashboard/ClientDashboard"));
const ClientDashboardWithSuspense = withSuspense(ClientDashboard);

const ClientProfile = lazy(() =>import(/* webpackChunkName: "ClientProfile" */ "../../components/app/pages/ClientProfile/ClientProfile"));
const ClientProfileWithSuspense = withSuspense(ClientProfile);

const Favourites = lazy(() =>import(/* webpackChunkName: "Favourites" */ "../../components/app/pages/Favourites/Favourites"));
const FavouritesWithSuspense = withSuspense(Favourites);

const Invoice = lazy(() =>import(/* webpackChunkName: "Invoice" */ "../../components/app/pages/Invoice/Invoice"));
const InvoiceWithSuspense = withSuspense(Invoice);

const ClientProfileSetting = lazy(() =>import(/* webpackChunkName: "ClientProfileSetting" */ "../../components/app/pages/ClientProfileSetting/ClientProfileSetting"));
const ClientProfileSettingWithSuspense = withSuspense(ClientProfileSetting);

const ClientChangePassword = lazy(() =>import(/* webpackChunkName: "ClientChangePassword" */ "../../components/app/pages/ClientChangePassword/ClientChangePassword"));
const ClientChangePasswordWithSuspense = withSuspense(ClientChangePassword);
// Route configurations for the app


function getRouteConfigs() {
  return [
    // {
    //   path: routes.APP,
    //   exact: true,
    //   redirect: routes.DASHBOARD,
    // },
    {
      // Coach Dashboard ROUTE
      path: routes.COACH_DASHBOARD,
      exact: true,
      element: <CoachDashboardWithSuspense  />,
    },
    {
      // Coach Change Password  ROUTE
      path: routes.COACH_CHANGE_PASSWORD,
      exact: true,
      element: <CoachChangePasswordWithSuspense />,
    },
    // {
    //   // Coach Profile ROUTE
    //   path: routes.COACH_PROFILE,
    //   exact: true,
    //   element: <CoachProfileWithSuspense />,
    // },
    {
      // Coach Profile Setting ROUTE
      path: routes.COACH_PROFILE_SETTING,
      exact: true,
      element: <CoachProfileSettingWithSuspense />,
    },
    {
        // Coach Upgrade Profile ROUTE
        path: routes.COACH_UPGRADE_PROFILE,
        exact: true,
        element: <UpgradeProfileWithSuspense />,
    },
    {
      // Appointments ROUTE
      path: routes.APPOINTMENTS,
      exact: true,
      element: <AppointmentsWithSuspense />,
    },
    {
      // BookAppointment ROUTE
      path: routes.BOOK_APPOINTMENTS,
      exact: true,
      element: <BookAppointmentWithSuspense />,
    },
    {
      // BookingSuccessful ROUTE
      path: routes.BOOK_SUCCESSFUL,
      exact: true,
      element: <BookingSuccessfulWithSuspense />,
    },
    {
      //     Checkout ROUTE
      path: routes.CHECKOUT,
      exact: true,
      element: <CheckoutWithSuspense />,
    },
    {
      // ClientDashboard ROUTE
      path: routes.CLIENT_DASHBOARD,
      exact: true,
      element: <ClientDashboardWithSuspense name="Dashboard" />,
    },
    {
      // ClientProfile ROUTE
      path: routes.CLIENT_PROFILE,
      exact: true,
      element: <ClientProfileWithSuspense />,
    },
    {
      // Favourites ROUTE
      path: routes.FAVOURITES,
      exact: true,
      element: <FavouritesWithSuspense />,
    },
    {
      // Invoice ROUTE
      path: routes.INVOICE,
      exact: true,
      element: <InvoiceWithSuspense />,
    },
    {
      // InvoicesView ROUTE
      path: routes.INVOICE_VIEW,
      exact: true,
      element: <InvoicesViewWithSuspense />,
    },
    {
      // MyClient ROUTE
      path: routes.MY_CLIENTS,
      exact: true,
      element: <MyClientWithSuspense />,
    },
    {
      // Reviews ROUTE
      path: routes.REVIEWS,
      exact: true,
      element: <ReviewsWithSuspense />,
    },
    {
      // Client Profile Setting ROUTE
      path: routes.CLIENT_PROFILE_SETTING,
      exact: true,
      element: <ClientProfileSettingWithSuspense />,
    },
    {
      //Client Change Password ROUTE
      path: routes.CLIENT_CHANGE_PASSWORD,
      exact: true,
      element: <ClientChangePasswordWithSuspense />,
    },

    {
      // NOT FOUND ROUTE
      path: "*",
      redirect: routes.DASHBOARD,
    },
  ];
}

export default getRouteConfigs;
