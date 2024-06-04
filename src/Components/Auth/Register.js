import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.scss';
import { postRegister } from '../../Services/apiService';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleClickCreate = async () => {

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
        let data = await postRegister(username, email, password)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login')
        }
        else {
            toast.error(data.EM)

        }
        console.log('check register', data)
    }

    return (
        <div className="register-component">
            <div className='register-header'>
                <span > Already have an account?</span>
                <button className='btn-primary' onClick={() => navigate('/login')}>Log in</button>
            </div>
            <div className='register-content col-4 mx-auto'>
                <div className='title col-4 mx-auto' onClick={() => navigate('/')}>
                    Bơ Bánh Bao
                </div>
                <div className='welcome col-4 mx-auto'>
                    Welcome to Bơ Bánh Bao! Let's register to experience!
                </div>
                <div className='form-content col-4 mx-auto'>
                    <div className='form-group'>
                        <label>Username</label>
                        <input
                            type='username'
                            placeholder='enter your username'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input
                            type='email'
                            placeholder='enter your email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='form-group pass-group'>
                        <label>Password (*)</label>
                        <input
                            type={isShowPassword ? 'type' : 'password'}
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
                    </div >
                    <div>
                        <button className='btn-create' onClick={() => handleClickCreate()}> Create free account</button>
                    </div>
                    <div className='back-to-home'>
                        <span onClick={() => navigate('/')} >Back to Homepage</span>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Register