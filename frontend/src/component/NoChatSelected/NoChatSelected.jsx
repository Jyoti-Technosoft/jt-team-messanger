import { useContext } from 'react';
import { ShowContext } from '../Context/Context';
import './NoChatSelected.scss';
import UsersList from '../UsersList/UsersList';

function NoChatSelected() {

    const { showChat } = useContext(ShowContext);

    return (
        <>
            {/* <div className="container scrollbar user-chat chat-on ">
                <div className="chatbox-container container">
                    <img
                        src="https://i.pinimg.com/originals/e3/1b/75/e31b752875679b64fce009922f9f0dda.gif"
                        alt=""
                    />
                </div>
            </div> */}
            <div className="web-box row">
                <div className={`user-list custom-background-user list-on ${showChat ? 'list-off' : 'list-on'}`}>
                    <UsersList />
                </div>
                <div className="container scrollbar user-chat chat-on ">
                    <div className="container scrollbar user-chat chat-on ">
                        <div className="chatbox-container container">
                            <img
                                src="https://i.pinimg.com/originals/e3/1b/75/e31b752875679b64fce009922f9f0dda.gif"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoChatSelected;