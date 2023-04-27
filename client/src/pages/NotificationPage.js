import React from 'react';
import Layout from './../components/Layout';
import { Tabs, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { Cursor } from 'mongoose';
import { Navigate } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


function NotificationPage() {
    const {user} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch =  useDispatch();
    const handleMarkAllRead = async() =>{
        try{
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/get-all-notification',{userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message);
            }else{
                message.error(res.data.message);
            }
        }catch(error){
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        }
    };
    const handleDeleteAllRead = () =>{};
  return (
    <Layout>
      <h4 className='m-3 text-center'>Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="unRead" key={0}>
            <div className="d-flex justify-content-end">
                <h4 className='p-2' onClick={handleMarkAllRead}>
                    Mark All Read
                </h4>
            </div>

            {/* <p>`${user.notification}`</p> */}
            {/* {console.log(user.notification)}; */}
            {/* {user?.notification.map((notificationMsg) => {
                <div className='card' onClick={notificationMsg.onClickPath}>
                    <div className='card-text'>
                    console.log("inside notification");
                        {notificationMsg.message};
                    </div>
                </div>
            })}; */}
            <div className='card' >
                <div className='card-text' style={{Cursor:"pointer"}}>
                Hello World    
                </div>
            </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
            <div className="d-flex justify-content-end">
                <h4 className='p-2' onClick={handleDeleteAllRead}>
                    Delete All Read
                </h4>
            </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )
}


export default NotificationPage;
