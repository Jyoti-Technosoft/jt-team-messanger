import { createContext, useState } from "react"
import Cookies from "js-cookie";
import jwtDecode from 'jwt-decode';
import userdataarr from '../../assets/userdata.js'
import { chatMessages } from "../../assets/message.js";

export const ShowContext = createContext();

const toastobj = {
    show : true,
    msg : '',
    type : 'sucess',
}

export const ContextProvider = (props) =>{

    const [showConversation, SetShowConversation] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [userArr, setUserArr] = useState(userdataarr);
    const [currentUserObj, setCurrentUserObj] = useState({});
    const [currentUserIndex, setCurrentUserIndex] = useState();
    const [currentSelectedUserId, setCurrentSelectedUserId] = useState();
    const [showUserAccount, setShowUserAccount] = useState(false);
    const [showToast, setShowToast] = useState(toastobj);
    const [selectedEmojiArr, setSelectedEmojiArr] = useState();
    const token = Cookies.get('token');
    let loggedUserId;
    let decodeToken;
    if(token){
        decodeToken = jwtDecode(token);
        loggedUserId = decodeToken.id;
    }

    return (
        <>
            <ShowContext.Provider value={ {showConversation, SetShowConversation,showChat, setShowChat, userArr, setUserArr,currentUserObj, setCurrentUserObj, currentUserIndex, setCurrentUserIndex, currentSelectedUserId, setCurrentSelectedUserId, showUserAccount, setShowUserAccount, showToast, setShowToast, token, decodeToken, loggedUserId } }>
                { props.children }
            </ShowContext.Provider>
        </>
    )
}