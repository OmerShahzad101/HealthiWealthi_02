import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setChatWindow} from "../../../../store/slices/chat/chatSlice";
import image from '../../../../assets/img/defaultImg.jpg';
import {postHttpRequest} from "../../../../axios";

const Channel = ({user}) => {

    const dispatch = useDispatch()

    const {recieverId} = useSelector((state) => state.chat)
    const {userid} = useSelector((state) => state.auth.user)

    const handleClick = async (id, name) => {
        const {data} = await postHttpRequest('/front/chat/create', {senderId: userid, recieverId:id})
        dispatch(setChatWindow({id, name, conversationId:data.conversationId, messages: data.chatMessages}))
        console.log(data, 'conversation response')
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