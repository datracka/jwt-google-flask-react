import React from "react";
import { useLocation } from "react-router-dom";
import { toObject } from "utils/query-string-helpers";
import {
  TOKEN_KEY,
  saveInLocalStorage,
  getValidToken,
} from "utils/local-storage";
import { getLoginAction, getProtectedPagePath } from "paths";

const SignInPage = () => {
  const location = useLocation();
  const params = toObject(location.search);
  const token = getValidToken(TOKEN_KEY);
  const handleOnClick = () => {
    window.location.href = getLoginAction();
  };

  React.useEffect(() => {
    if (params.token) {
      saveInLocalStorage(TOKEN_KEY, params.token);
      window.location.href = getProtectedPagePath();
    }
    if (token) {
      window.location.href = getProtectedPagePath();
    }
  }, []);

  return (
    <React.Fragment>
      <button type="button" onClick={handleOnClick}>
        sign in using google
      </button>
    </React.Fragment>
  );
};

export default SignInPage;
