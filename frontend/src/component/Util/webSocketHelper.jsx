import { io } from "socket.io-client";

import * as constant from './constant';


const socket = io(constant.BASE_URL);
socket.on('connect', ()=>console.log('ID',socket?.id));
socket.on('disconnect', (err)=>console.log('close due to ',err));
socket.on('connect_error', (err)=>{
    console.log('connection erorr',err)
})

export default socket;