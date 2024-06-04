import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss'
import { postLogin } from '../../Services/apiService';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleLogin = async () => {
        //validate
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error("Invalid Email");
            // toast.success();
            // toast.info();
            return;
        }
        if (!password) {
            toast.error("Invalid Password")
            return;
        }

        //submit apis
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            toast.success(data.EM);

        }
        else {
            toast.error(data.EM)

        }
        console.log('check ', data)
    }

    return (
        <div className='login-component'>
            <div className='login-header '>
                <span > Don't have an account yet?</span>
                <button className='btn-primary' onClick={() => navigate('/register')}>Sign up</button>
                <span className='contact-us'>Contact us</span>
            </div>
            <div className='login-content col-4 mx-auto'>
                <div className='title col-4 mx-auto' onClick={() => navigate('/')}>
                    Bơ Bánh Bao
                </div>
                <div className='welcome col-4 mx-auto'>
                    Hello, Who's this?
                </div>
                <div className='form-content col-4 mx-auto'>
                    <div className='form-group'>
                        <label>Email</label>
                        <div>
                            <input
                                type='email'
                                placeholder='enter your email'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className='form-group pass-group'>
                        <label>Password</label>
                        <div>
                            <input
                                type={isShowPassword ? 'text' : 'password'}
                                placeholder='enter your password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            {
                                isShowPassword ?
                                    <span className='icon-eye' onClick={() => setIsShowPassword(false)}>
                                        <VscEye />
                                    </span>
                                    :
                                    <span className='icon-eye' onClick={() => setIsShowPassword(true)} >
                                        <VscEyeClosed />
                                    </span>
                            }
                        </div>
                    </div >
                    <div className='forgot-password'>
                        <span >Forgot your password?</span>
                    </div>
                    <div>
                        <button className='btn-submit' onClick={() => handleLogin()}> Log in to Bơ Bánh Bao</button>
                    </div>
                    <div className='back-to-home'>
                        <span onClick={() => navigate('/')} >Back to Homepage</span>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Login;