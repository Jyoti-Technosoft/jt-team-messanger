import { useContext, useEffect, useState } from 'react';
import Users from '../Users/Users';
import { ShowContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';
import CustomModel from '../CustomModel/LogoutModel';
import ProfileModel from '../CustomModel/ProfileModel';
import axios from 'axios';
import apiClient from '../Util/axios';
import socket from '../Util/webSocketHelper';
import './UsersList.scss';
import CustomToast from '../ToastComponent/CustomToast';
import { useFormik } from 'formik';
import CapitalizeFirstLetter from '../CapitalizeFirstLetter/CapatilizeFirstLetter';

function UsersList() {
    const navigate = useNavigate();
    // const userdata = userArr;
    const [userData, setUserData] = useState([]);
    const [profileModal, setProfileModel] = useState(false);
    const [logoutModal, setlogoutModal] = useState(false);
    const [searchUser, setSearchUser] = useState(false);

    const { SetShowConversation, setShowChat, currentSelectedUserId, setCurrentSelectedUserId, token, loggedUserId, userArr, setUserArr, decodeToken, showToast } = useContext(ShowContext);

    const openConversation = (index, id) => {
        navigate(`/chat/${id}`)
        socket.emit('set_current_chat', id);
        // console.log("open", id);
        SetShowConversation(true);
        // setCurrentUserIndex(index);
        setCurrentSelectedUserId(id);
        setShowChat(true);
        // console.log(currentUserId);
    }

    useEffect(() => {
        apiClient.get('/users', {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((response) => {
                // console.log(response);
                // console.log(response.data.users);
                setUserData(response.data.users);
                console.log(response.data.users)
                setUserArr(response.data.users);
                // console.log(userArr);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    function capitalizeFirstLetter(str) {
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
        return capitalized;
    }

    function firstLetterOfName(str) {
        const firstLetter = str.charAt(0).toUpperCase();
        return firstLetter;
    }

    function handleChange(event) {
        setSearchUser(event.target.value);
    }

    return (
        <>

            <div className="users-list-box">
                <div className="header-user-list">
                    <div className="user-details-div">
                        <div className="user-details">
                            <div className="dropdown user-dropdown">
                                <a className="dropdown-toggle user-icon-div" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="user-icon-text">
                                        <h5 className='first-char-text'>{`${CapitalizeFirstLetter(decodeToken.firstName)}${CapitalizeFirstLetter(decodeToken.lastName)}`}</h5>
                                    </div>
                                </a>
                                <ul className="dropdown-menu mt-3" aria-labelledby="dropdownMenuLink">
                                    <li className='user-dropdown-list'><a className="dropdown-item item-user-dropdown" onClick={() => setProfileModel(true)}>Profile</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li className='user-dropdown-list'><a className="dropdown-item item-user-dropdown" onClick={() => setlogoutModal(true)}>Logout</a></li>
                                </ul>
                            </div>
                            <h5 className='user-name'>{`${capitalizeFirstLetter(decodeToken.firstName)} ${capitalizeFirstLetter(decodeToken.lastName)}`}</h5>
                        </div>
                        <div className="three-dot">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                            </svg>
                        </div>
                    </div>
                    <div className="search-box text-center">
                            <input
                                className='search-box-input'
                                type="text"
                                placeholder='Search users'
                                name='searchVal'
                                onChange={handleChange}
                                autoComplete='off'
                            />
                    </div>
                    <p>Recent Chats</p>
                    <hr className='hr-line' />
                </div>
                <div className="user-container-body custom-scroll-bar">
                    {
                        userData.map((val, index) => {
                            return (

                                val._id != loggedUserId && ( searchUser ? val.firstName.includes(searchUser) || val.lastName.includes(searchUser) : 
                                
                                <div className="single-user" key={index} onClick={() => openConversation(index, val._id)}>
                                        <Users firstName={val.firstName} lastName={val.lastName} userid={val._id} image={val.image} />
                                    </div>

                                ) ?

                                    <div className="single-user" key={index} onClick={() => openConversation(index, val._id)}>
                                        <Users firstName={val.firstName} lastName={val.lastName} userid={val._id} image={val.image} />
                                    </div>

                                    : null
                            )
                        })
                    }
                </div>
            </div>

            {logoutModal ?

                <CustomModel show={logoutModal} onHide={() => setlogoutModal(false)} />

                : null}

            {profileModal ?

                <ProfileModel show={profileModal} onHide={() => setProfileModel(false)} />

                : null}

            {showToast ? <CustomToast /> : null}

        </>
    )
}

export default UsersList;