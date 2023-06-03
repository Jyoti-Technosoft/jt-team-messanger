import { useContext, useEffect, useRef, useState } from "react";
import { ShowContext } from "../Context/Context";

import { useFormik } from "formik";
import socket from "../Util/webSocketHelper";
import OtherConversationBox from "../ConversationBox/OtherConversationBox";
import MyConversationBox from "../ConversationBox/MyConversationBox";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useNavigate, useParams } from "react-router-dom";
import Popover from "react-bootstrap/Popover";
import EmojiPicker from "emoji-picker-react";
import * as constants from "../Util/constant";
import apiClient from "../Util/axios";
import { userInputMessage } from "../Schemas";
import CapitalizeFirstLetter from "../CustomFunctions/CapatilizeFirstLetter";

import "./ShowUsersChat.scss";

function ShowUsersChat() {
  const navigate = useNavigate();
  const [userMessgaes, setUserMessages] = useState([]);

  const { userArr, loggedUserId, token, currentUserObj, setCurrentUserObj } =
    useContext(ShowContext);
  const scollToRef = useRef();
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      const currentUser = userArr?.find((val) => {
        return val._id === userId;
      });
      setCurrentUserObj(currentUser);
    }
  });

  useEffect(() => {
    setTimeout(() => {
      scollToRef.current?.scrollIntoView();
    }, 100);
  }, [userMessgaes, userId]);

  useEffect(() => {
    if (userId) {
      socket.emit(constants.SET_CURRENT_CHAT, userId);
      getAllMessage();
    }
  }, [userId]);

  const setEmojiInChat = (value) => {
    userMsgInputFormik.setValues({
      message: userMsgInputFormik.values.message + value.emoji,
    });
  };

  const popover = (
    <Popover placement="top" id="popover-basic" className="emoji-popover">
      <EmojiPicker onEmojiClick={setEmojiInChat} emojiVersion="5.0" />
    </Popover>
  );

  const getAllMessage = () => {
    const params = {
      sender: loggedUserId,
      reciver: userId,
    };
    apiClient
      .get("./message", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserMessages(response.data.data);
      })
      .catch((error) => {});

    socket.on(constants.LISTEN_FOR_MESSAGE, (data) => {
      if (data.users.includes(userId) && data.users.includes(loggedUserId) ) {
        setUserMessages((value) => [...(value || []), data]);
      }
    });
  };

  const userMsgInputFormik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: userInputMessage,
    onSubmit: (values, action) => {
      action.resetForm();
      const data = {
        sender: loggedUserId,
        reciver: userId,
        message: values.message,
      };
      socket.emit(constants.SEND_MESSAGE, data);
    },
  });

  const showUserlist = () => {
    navigate("/chat");
  };

  return (
    <>
      {userId ? (
        <div className="container chat-box vh-100 px-">
          <div className="header-chat-box">
            <div className="user-details">
              <div className="other-user-icon d-flex justify-content-center align-items-center">
                <h5 className="first-char-text mb-0">
                  {currentUserObj?.firstName && currentUserObj?.lastName
                    ? `${CapitalizeFirstLetter(
                        currentUserObj?.firstName
                      )}${CapitalizeFirstLetter(currentUserObj?.lastName)}`
                    : null}
                </h5>
              </div>
              <p className="other-user-name">
                {currentUserObj?.firstName} {currentUserObj?.lastName}
              </p>
              <p className="other-user-status">typing...</p>
              <div className="back-btn" onClick={showUserlist}>
                <img
                  src="https://static.thenounproject.com/png/3466561-200.png"
                  alt=""
                  className="back-btn-img"
                />
              </div>
              <hr />
            </div>
          </div>

          <div className="message-chat-box">
            {userMessgaes?.map((val, index) => {
              if (val?.sender == loggedUserId) {
                return <MyConversationBox message={val?.message} key={index} />;
              } else {
                return (
                  <OtherConversationBox message={val?.message} key={index} />
                );
              }
            })}
            <div ref={scollToRef} style={{ visibility: "hidden" }}></div>
          </div>

          <div className="input-chat-box position-sticky bottom-0">
            <div className="message-div position-relative">
              <form onSubmit={userMsgInputFormik.handleSubmit}>
                <input
                  type="text"
                  name="message"
                  onChange={userMsgInputFormik.handleChange}
                  onBlur={userMsgInputFormik.handleBlur}
                  value={userMsgInputFormik.values.message}
                  className="message-input border-0"
                  placeholder="Type your message..."
                  autoComplete="off"
                />
                <button
                  className="send-btn position-absolute border-0"
                  type="submit"
                >
                  <img
                    src="https://icons-for-free.com/download-icon-send+icon-1320185654900887696_512.png"
                    alt=""
                    className="send-btn-img"
                  />
                </button>
                <div className="attach-btn position-absolute border-0">
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    rootClose
                    overlay={popover}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-emoji-smile"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                    </svg>
                  </OverlayTrigger>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ShowUsersChat;
