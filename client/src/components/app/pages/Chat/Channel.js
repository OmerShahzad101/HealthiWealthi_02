import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setChatWindow} from "../../../../store/slices/chat/chatSlice";
import image from '../../../../assets/img/defaultImg.jpg';

const Channel = ({user}) => {
    let {senderId} = useSelector((state) => state.chat)
    const dispatch = useDispatch()

    const handleClick = (id, name) => {
        dispatch(setChatWindow({id, name}))
    }

    return (
        <a onClick={() => handleClick(user._id, user.username)} href="javascript:void(0);" className="media">
            <div className="media-img-wrap">
                <div className="avatar avatar-away">
                    <img
                        src={image}
                        alt="User Image"
                        className="avatar-img rounded-circle"
                    />
                </div>
            </div>
            <div className="media-body">
                <div>
                    <div className="user-name">{user.username} </div>
                    <div className="user-last-chat">
                        Give me a full explanation about our project
                    </div>
                </div>
                <div>
                    <div className="last-chat-time block">7:30 PM</div>
                    <div className="badge badge-success badge-pill">
                        3
                    </div>
                </div>
            </div>
        </a>
    )
}

export default Channel;