import { createContext, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const ShowContext = createContext();

const toastObj = {
  show: true,
  msg: "",
  type: "",
};

const userdataarr = [
  {
    createdAt: "",
    email: "",
    firstName: "",
    gender: "",
    lastName: "",
    updatedAt: "",
    _id: "",
  },
];

export const ContextProvider = (props) => {
  const [userArr, setUserArr] = useState(userdataarr);
  const [currentUserObj, setCurrentUserObj] = useState({});
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [showToast, setShowToast] = useState(toastObj);
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
