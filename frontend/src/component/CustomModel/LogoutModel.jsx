import { useContext } from 'react';

import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { ShowContext } from '../Context/Context';
import Cookies from 'js-cookie';

import './LogoutModel.scss';

function CustomModel(props) {

    const { setShowToast } = useContext(ShowContext);
    const navigate = useNavigate();

    const openUserDetails = () => {
        setShowToast({ show: true, msg: 'Logout Successfully', type: 'success' });
        Cookies.remove('token');
        navigate('/login');
    }

    return (
        <>
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >   
                <Modal.Body>
                    <div className='text-center custom-model-container py-2'>
                        <p>Are you sure you want to Logout?</p>
                        <span className='logout-btn' onClick={openUserDetails}>Yes, logout</span>
                        <span className='cancel-btn' onClick={props.onHide}>Cancel</span>
                    </div>                    
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CustomModel;