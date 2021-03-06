import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {postHttpRequest} from "../../../../axios";
import image from '../../../../assets/img/defaultImg.jpg';
import {setChatWindow} from "../../../../store/slices/chat/chatSlice";
import imagePath from "../../../../utils/url/imagePath";

const Channel = ({user}) => {

    const dispatch = useDispatch()

    const {userid} = useSelector((state) => state.auth.user)

    const handleClick = async (id, name , fileName) => {
        const {data} = await postHttpRequest('/front/chat/create', {senderId: userid, recieverId:id})
        dispatch(setChatWindow({id, name, fileName , conversationId:data.conversationId, messages: data.chatMessages}))
    }

    return (
        <a onClick={() => handleClick(user._id, user.username , user.fileName)} href="javascript:void(0);" className="media">
            <div className="media-img-wrap">
                <div className="avatar avatar-away">
                { user.fileName?.length > 20 ? 
                    <img src={user.fileName} className="avatar-img rounded-circle" alt="User"/> : 
                    <img src={imagePath(user.fileName)} className="avatar-img rounded-circle" alt="User" />
                }
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