import React from 'react';
import Layout from './../components/Layout';
import {Col, Form, Input, Row, TimePicker, message} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {hideLoading, showLoading} from '../redux/features/alertSlice';
import axios from 'axios';
import moment from 'moment';

const ApplyDoctor = () => {

    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //handle form
    const handleFinish = async(values) =>{
        try{
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/apply-doctor',
            {...values, userId:user._id,
                timings: [
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm"),
                ],
            },
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}` 
                },
            });
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.success);
                navigate('/');
            }else{
                message.error(res.data.success);
            }
        } catch(error){
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        }
    };
  return (
    <Layout>
        <h1 className='text-center'>Apply Doctor</h1>
        <Form layout='vertical' onFinish={handleFinish} className='m-3'>
            <h4>Personal Details :</h4>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="First Name" name="firstName" required rules={[{required:true}]}>
                        <Input type="text" placeholder="your name"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Last Name" name="lastName" required rules={[{required:true}]}>
                        <Input type="text" placeholder="your last name"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Phone No." name="phone" required rules={[{required:true}]}>
                        <Input type="text" placeholder="your Contact number"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Email" name="email" required rules={[{required:true}]}>
                        <Input type="email" placeholder="your email"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Website" name="website">
                        <Input type="text" placeholder="Website"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Address" name="address" required rules={[{required:true}]}>
                        <Input type="text" placeholder="Address"/>
                    </Form.Item>
                </Col>
            </Row>
            <h4>Professional Details :</h4>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Specialization" name="specialization" required rules={[{required:true}]}>
                        <Input type="text" placeholder="your specialization"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Experience" name="experience" required rules={[{required:true}]}>
                        <Input type="text" placeholder="your Experience"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Fess" name="feesPerCunsultation" required rules={[{required:true}]}>
                        <Input type="text" placeholder="your Consulting fee"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Timings" name="timings" required rules={[{required:true}]}>
                        <TimePicker.RangePicker format="HH:mm"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}></Col>
                <Col xs={24} md={24} lg={8}>
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-primary form-btn' type='submit' >Submit</button>
                </div>
                </Col>
            </Row>
        </Form>
    </Layout>
  );
};

export default ApplyDoctor
