import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowContext } from '../Context/Context';
import apiClient from '../Util/axios';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import { signUpSchema } from '../Schemas'
import CustomToast from '../ToastComponent/CustomToast';

import './Register.scss'

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    cpassword: "",
};

function Register() {

    const { setShowToast } = useContext(ShowContext);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = Cookies.get('token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/signup');
        }else{
            setIsLoggedIn(true);
            return navigate('/chat');
        }
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    const formik = useFormik({
        initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values, action) => {
            console.log(values);
            apiClient.post('/users/register',{
                firstName: values.firstName,
                lastName: values.lastName,
                gender: values.gender,
                password: values.password, 
                email: values.email,
            }).then((response) =>{
                setShowToast({ show: true, msg: "Register Successfull", type: 'success' });
                // console.log("register success")
                // console.log(response);
            }).catch((AxiosError) =>{
                // console.log(AxiosError);
                setShowToast({ show: true, msg: AxiosError.response.data.message, type: 'error' });
            })

            action.resetForm();
        },
    });

    const openNavigate = () => {
        navigate('/login');
    }

    return (
        <>
            <div className="container-fluid text-center">
                <div className="row register">
                    <div className="register-info">
                        <div className="card register-card border-0 mt-3">
                            <div className="card-body">
                                <h3 className="mt-3 text-start">Messenger</h3>
                                <h2 className="text-start my-5">Start Your Journey with us.</h2>
                                <p className='text-start'>Connect with your Friend's around the world.</p>
                                <img className='register-img mt-3' src="https://cdn.pixabay.com/animation/2022/11/16/11/48/11-48-15-802_512.gif" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="register-user-input">
                        <form onSubmit={formik.handleSubmit}>
                            <h3 className="register-title text-start mt-4">Messenger</h3>
                            <h2 className='text-start my-4'>Sign Up</h2>
                            <div className='my-3'>
                                <input
                                    className='register-form-input w-100 p-3 border-0'
                                    type="text"
                                    placeholder='Enter your First Name'
                                    name='firstName'
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete='off'
                                />
                                {formik.errors.firstName && formik.touched.firstName ? (
                                    <p className='register-errors w-100 mt-2 border-0'>{formik.errors.firstName}</p>
                                ) : null}

                            </div>
                            <div className='my-3'>
                                <input
                                    className='register-form-input w-100 p-3 border-0'
                                    type="text"
                                    placeholder='Enter your Last Name'
                                    name='lastName'
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete='off'
                                />
                                {formik.errors.lastName && formik.touched.lastName ? (
                                    <p className='register-errors mt-2'>{formik.errors.lastName}</p>
                                ) : null}

                            </div>
                            <div className='my-3 input-radio-div text-start'>
                                <span className='input-radio-title me-4'>Gender: </span>
                                <span className='input-radio me-2'>
                                    <label htmlFor="male">Male</label>
                                    <input
                                    className='mx-2'
                                        id='male'
                                        type="radio"
                                        name='gender'
                                        value='male'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </span>
                                <span className='input-radio me-2'>
                                    <label htmlFor="female">Female</label>
                                    <input
                                        className='mx-2'
                                        id='female'
                                        type="radio"
                                        name='gender'
                                        value='female'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </span>
                                <span className='input-radio me-2'>
                                    <label htmlFor="other">Other</label>
                                    <input
                                        className='mx-2'
                                        id='other'
                                        type="radio"
                                        name='gender'
                                        value='other'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </span>
                                {formik.errors.gender && formik.touched.gender ? (
                                    <p className='register-errors text-center mt-2'>{formik.errors.gender}</p>
                                ) : null}

                            </div>
                            <div className='my-3'>
                                <input
                                    className='register-form-input w-100 p-3 border-0'
                                    type="text"
                                    placeholder='Enter your Email'
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete='off'
                                />
                                {formik.errors.email && formik.touched.email ? (
                                    <p className='register-errors mt-2'>{formik.errors.email}</p>
                                ) : null}
                            </div>
                            <div className='my-3'>
                                <input
                                    className='register-form-input w-100 p-3 border-0'
                                    type="password"
                                    placeholder='Enter your Password' name='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete='off'
                                />
                                {formik.errors.password && formik.touched.password ? (
                                    <p className='register-errors mt-2'>{formik.errors.password}</p>
                                ) : null}
                            </div>
                            <div className='my-3'>
                                <input
                                    className='register-form-input w-100 p-3 border-0'
                                    type="password"
                                    placeholder='Enter your Confirm Password' name='cpassword'
                                    value={formik.values.cpassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete='off'
                                />
                                {formik.errors.cpassword && formik.touched.cpassword ? (
                                    <p className='register-errors mt-2'>{formik.errors.cpassword}</p>
                                ) : null}
                            </div>
                            <div className='register-sub-btn-div my-4'>
                                <input className='register-sub-btn' type="submit" value='Register' />
                            </div>
                            <div>
                                <p className='register-to-login'>Already have an account? <span className='login-link' onClick={openNavigate}>Login</span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <CustomToast/>
        </>
    )
}

export default Register;