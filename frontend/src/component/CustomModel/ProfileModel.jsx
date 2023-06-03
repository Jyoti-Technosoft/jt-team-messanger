import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Modal from 'react-bootstrap/Modal';

import apiClient from '../Util/axios';
import './ProfileModel.scss';

function ProfileModel(props) {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [createdTime, setCreatedTime] = useState();
    const [email, setEmail] = useState();
    const [gender, setGender] = useState();

    useEffect(() => {

        const token = Cookies.get('token');
        // const encodedToken = window.atob(token);
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        apiClient.get(`/users/${userId}`,
            {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((data) => {
                // console.log(data);
                setFirstName(data.data.user.firstName);
                setLastName(data.data.user.lastName);
                setEmail(data.data.user.email);
                const d = new Date(data.data.user.createdAt);
                const date = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${d.getDate()}:${d.getMonth()}:${d.getFullYear()}`;
                setCreatedTime(date);
                setGender(data.data.user.gender);
            }).catch((error) => {
                console.log(error);
            })

    }, [])

    function firstLetterOfName(str) {
        const firstLetter = str.charAt(0).toUpperCase();
        return firstLetter;
    }

    return (
        <>
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className='profile-model-div p-0'>
                    <div className='text-center custom-model-container py-2 profile-model'>
                        <div className="mb-4 image d-flex flex-column justify-content-center align-items-center">
                            <div className="user-icon-div">
                                <div className="user-img d-flex justify-content-center align-items-center">
                                    <h3 className='first-char-text mb-0'>{`${firstName}`}</h3>
                                </div>
                            </div>
                            <span className="name mt-3"></span>
                            <table className='table-profile w-100 my-3'>
                                <tbody>
                                    <tr>
                                        <td className='text-left '>Profile</td>
                                    </tr>
                                    <tr>
                                        <th className='text-left'>First Name</th>
                                        <td className='text-right'>{firstName}</td>
                                    </tr>
                                    <tr>
                                        <th className='text-left'>Last Name</th>
                                        <td className='text-right'>{lastName}</td>
                                    </tr>
                                    <tr>
                                        <th className='text-left'>Email</th>
                                        <td className='text-right'>{email}</td>
                                    </tr>
                                    <tr>
                                        <th className='text-left'>Gender</th>
                                        <td className='text-right'>{gender}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text mt-3">
                            </div>
                            <div className=" px-2 rounded mt-4 date "> <span className="join">{createdTime}</span> </div>
                        </div>
                        <span className='cancel-btn' onClick={props.onHide}>Close</span>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProfileModel;