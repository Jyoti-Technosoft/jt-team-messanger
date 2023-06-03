import { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { io } from "socket.io-client";

import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { ShowContext } from './component/Context/Context';

import ShowUsersChat from './component/ShowUsersChat/ShowUsersChat';
import UsersList from './component/UsersList/UsersList';
import { useSearchParams } from 'react-router-dom';
import NoChatSelected from './component/NoChatSelected/NoChatSelected';
import './App.css';

function App() {
  const socket = useRef();
  const { showChat, currentSelectedUserId } = useContext(ShowContext);
  const [currentUser, useCurrentUser] = useState(true);
  const { userId } = useParams();

  useEffect(() => {


  }, []);

  return (
    <>
      <div className="web-box row">
        <div className={`user-list custom-background-user list-on ${showChat ? 'list-off' : 'list-on'}`}>
          <UsersList />
        </div>
        <div className="container scrollbar user-chat chat-on ">
          <Routes>
            <Route path='/:userId'
              element={
                <ShowUsersChat />
              }>
            </Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App;
