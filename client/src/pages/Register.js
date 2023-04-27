import { React, useState } from 'react';
import { Form, Input, message } from 'antd';
import '../styles/RegisterStyles.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const Register = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const emailPattern = /^[a-zA-Z]+@gmail\.com$/;
    //     const passwordPattern = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    //     if (emailPattern.test(email) && passwordPattern.test(password)) {
    //         // The input is valid

    //         console.log('Valid email and password:', email, password);
    //     } else {
    //         // The input is not valid
    //         setError('Please enter a valid Gmail address and a password with at least 8 characters, including one uppercase letter, one lowercase letter, and one special character.');
    //     }
    // };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    //form handler
    const onfinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/register', values);
            dispatch(hideLoading());
            if (res.data.success) {
                message.success('Register Successfully');
                navigate('/login');
            }
            else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something Went Wrong");
        }
    };

    return (
        <>
            <div className="form-container">
                <Form layout='vertical' onFinish={onfinishHandler} className='register-form'>

                    <h3 className='text-center'>Register Form</h3>

                    <Form.Item label="Name" name="name">
                        <Input type="text" required></Input>
                    </Form.Item>

                    <Form.Item label="Email" name="email">
                        <Input type="email"
                            value={email}
                            onChange={handleEmailChange}
                            pattern="^[a-zA-Z]+@gmail\.com$"
                            required></Input>
                    </Form.Item>

                    <Form.Item label="Password" name="password">
                        <Input type="password"
                            value={password}
                            // onChange={handlePasswordChange}
                            // pattern="^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$"


                            required></Input>
                    </Form.Item>

                    <Link to="/login" className='m-2'>Already User Login Here</Link>
                    <button className='btn btn-primary' type='submit'>Register</button>


                </Form>
            </div>
        </>
    )
}

export default Register
