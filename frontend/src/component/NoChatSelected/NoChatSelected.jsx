import { useParams } from "react-router-dom";
import UsersList from "../UsersList/UsersList";

function NoChatSelected() {
  const { userId } = useParams();

  return (
    <>
      <div className="web-box row">
        <div
          className={`user-list custom-background-user list-on ${
            userId ? "list-off" : "list-on"
          }`}
        >
          <UsersList />
        </div>
        <div className="container scrollbar user-chat chat-on ">
          <div className="container scrollbar user-chat chat-on ">
            <div className="chatbox-container container">
              <img src="src/assets/images/nochatimg.gif" alt="Logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoChatSelected;
