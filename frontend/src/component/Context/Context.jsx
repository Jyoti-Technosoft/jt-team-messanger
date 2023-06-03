import { createContext, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const ShowContext = createContext();

export const ContextProvider = (props) => {
  const [userArr, setUserArr] = useState([]);
  const [currentUserObj, setCurrentUserObj] = useState({});
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [showToast, setShowToast] = useState({});
  const token = Cookies.get("token");
  let loggedUserId;
  let decodeToken;
  if (token) {
    decodeToken = jwtDecode(token);
    loggedUserId = decodeToken.id;
  }

  return (
    <>
      <ShowContext.Provider
        value={{
          userArr,
          setUserArr,
          currentUserObj,
          setCurrentUserObj,
          showUserAccount,
          setShowUserAccount,
          showToast,
          setShowToast,
          token,
          decodeToken,
          loggedUserId,
        }}
      >
        {props.children}
      </ShowContext.Provider>
    </>
  );
};
