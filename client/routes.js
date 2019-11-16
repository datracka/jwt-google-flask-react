import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getSignInPagePath, getProtectedPagePath } from "paths";
import SignInPage from "./sign-in-page";
import ProtectedPage from "./protected-page";
import PrivateRoute from "./private-route";

export default () => {
  return (
    <Router>
      <Route
        path={getSignInPagePath()}
        exact
        component={SignInPage}
      />
      <PrivateRoute
        path={getProtectedPagePath()}
        exact
        component={ProtectedPage}
      />
    </Router>
  );
};
