import { useFormik } from 'formik';
import { loginSchema } from '../Schemas';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { ShowContext } from '../Context/Context';
import CustomToast from '../ToastComponent/CustomToast';
import apiClient from '../Util/axios';

import './Login.scss'

const initialValues = {
    email: '',
    password: '',
}

function Login() {

    const { showToast, setShowToast } = useContext(ShowContext);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = Cookies.get('token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/login');
        } else {
            setIsLoggedIn(true);
            return navigate('/chat');
        }
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values, action) => {
            apiClient.post('/users/login',{
                email: values.email,
                password: values.password,
            })
            .then((response) => {
                setShowToast({ show: true, msg: "Login Successfully", type: 'success' });
                const token = response.data.token;
                // let encodedtoken = window.btoa(token);
                const decode = jwtDecode(token);
                console.log(decode);
                const expdt = new Date(decode.exp * 1000);
                Cookies.set('token', token, { expires: expdt, path: '/' })
                navigate('/chat');
            }).catch((AxiosError) => {
                console.log(AxiosError);
                const axiosmsg = AxiosError.response.data.message;
                setShowToast({ show: true, msg: axiosmsg, type: 'error' });
            })

            action.resetForm();
        },
    })


    const openNavigate = () => {
        console.log("clicked");
        navigate('/signup');
    }

    return (
        <>
            <div className="container-fluid text-center">
                <div className="row login">
                    <div className="login-info">
                        <div className="card login-card border-0 my-3">
                            <div className="card-body">
                                <h3 className="card-title mt-3 text-start">Messenger</h3>
                                <h2 className="text-start my-5">Start Your Journey with us.</h2>
                                <p className='text-start'>Connect with your Friend's around the world.</p>
                                <img className='login-img mt-3' src="https://cdn.pixabay.com/animation/2022/11/16/11/48/11-48-15-802_512.gif" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="login-user-input">
                        <form onSubmit={formik.handleSubmit}>
                            <h3 className="login-title text-start mt-4">Messenger</h3>
                            <h2 className='text-start my-4'>Login</h2>
                            <div className='my-3'>
                                <input
                                    className='login-form-input p-3 border-0'
                                    type="text"
                                    placeholder='Enter your Email'
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete='off'
                                />
                                {formik.errors.email && formik.touched.email ? (
                                    <p className='login-errors mt-2'>{formik.errors.email}</p>
                                ) : null}
                            </div>
                            <div className='my-3'>
                                <input
                                    className='login-form-input p-3 border-0'
                                    type="password"

                                    placeholder='Enter your Password' name='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete='off'
                                />
                                {formik.errors.password && formik.touched.password ? (
                                    <p className='login-errors mt-2'>{formik.errors.password}</p>
                                ) : null}
                            </div>
                            <div className='login-sub-btn-div my-4 d-flex'>
                                <input className='login-sub-btn border-0' type="submit" value='login' />
                            </div>
                            <div>
                                <p className='login-to-register text-start'>Don't have an account? <span className='signup-link' onClick={openNavigate}>Sign Up</span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            { showToast ? <CustomToast/> : null}
           
        </>
    )
}

export default Login;