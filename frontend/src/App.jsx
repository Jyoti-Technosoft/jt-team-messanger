import { Route, Routes, useParams } from "react-router-dom";

import ShowUsersChat from "./component/ShowUsersChat/ShowUsersChat";
import UsersList from "./component/UsersList/UsersList";

import "./App.scss";

function App() {
  const { userId } = useParams();

  return (
    <>
      <div className="web-box row">
        <div
          className={`user-list custom-background-user list-on ${
            userId ? "list-on" : "list-off"
          }`}
        >
          <UsersList />
        </div>
        <div className="container scrollbar user-chat chat-on ">
          <Routes>
            <Route path="/:userId" element={<ShowUsersChat />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
