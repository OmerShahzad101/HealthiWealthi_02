import { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";

import { LOGIN } from "../constants/ROUTES";
import validateAuthState from "../../utils/auth/validateAuthState";

export default function Page({ route, abc }) {
  const location = useLocation();

  useEffect(() => {
    // document.title = route?.meta?.title ? `${route.meta.title} - Digno` : 'Digno';
  }, [route?.meta?.title]);

  if (route?.meta?.requiresAuth && !validateAuthState()) {
    // Redirect the user to login screen if no valid access token available
    return <Redirect to={{ pathname: LOGIN, state: { location } }} />;
  }

  // Call the guard function with the `next` function as the callback
  if (route?.beforeEnter && typeof route.beforeEnter === "function") {
    return route.beforeEnter(next);
  } else {
    return next();
  }

  // Define the `next` function to be called by the guard function after validating the access conditions
  function next(newRoute) {
    if (
      newRoute &&
      (typeof newRoute === "string" || typeof newRoute === "object")
    ) {
      return <Redirect to={newRoute} />;
    }

    return route?.element;
  }
}
