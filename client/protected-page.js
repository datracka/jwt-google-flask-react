import React from "react";
import PROTECTED_REQUEST from "apollo/queries/protected_request.graphql";
import SIGN_OUT from "apollo/mutations/sign_out.graphql";
import { useHistory } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { getSignInPagePath } from "paths";
import {
  TOKEN_KEY,
  removeLocalStorageKey,
} from "utils/local-storage";

const ProtectedPage = () => {
  const history = useHistory();
  const [value, setValue] = React.useState("");
  const handleChange = e => setValue(e.target.value);
  const [protectedRequest, { data }] = useLazyQuery(
    PROTECTED_REQUEST,
  );
  const [signOut] = useMutation(SIGN_OUT);
  const handleClick = () => {
    protectedRequest({ variables: { value } });
  };
  const logOut = () => {
    signOut().then(() => {
      removeLocalStorageKey(TOKEN_KEY);
      history.push({
        pathname: getSignInPagePath(),
      });
    });
  };
  return (
    <React.Fragment>
      <div>Protected Page</div>
      <div>
        <input type="text" value={value} onChange={handleChange} />
        <button type="button" onClick={handleClick}>
          click to query API
        </button>
      </div>
      {data ? <div>{data.protectedRequest}</div> : null}
      <div>
        <button type="button" onClick={logOut}>
          log out
        </button>
      </div>
    </React.Fragment>
  );
};

export default ProtectedPage;
