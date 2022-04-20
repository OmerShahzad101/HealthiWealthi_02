import React, {useState} from "react";
import {useSelector} from "react-redux";
import image from '../../../../assets/img/defaultImg.jpg';
import {postHttpRequest} from "../../../../axios";

const ChatRoom = () => {

    const {receiverName, messages} = useSelector((state) => state.chat)
    const {userid} = useSelector((state) => state.auth.user)

    const [typedMessage, setTypedMessage] = useState('')

    const handleChange = (event) => {
        setTypedMessage(event.target.value)
    }

    const sendMessage = async () => {
        const formData = new FormData();
        formData.append('message', typedMessage)
        formData.append('senderId', userid)
        formData.append('recieverId', userid)

        const response = await postHttpRequest('/front/chat/create', formData)
        console.log(response, 'respnse from backend')

    }

    return (
        <div className="chat-cont-right">
            <div className="chat-header">
                <a
                    id="back_user_list"
                    href="javascript:void(0)"
                    className="back-user-list"
                >
                    <i className="material-icons">chevron_left</i>
                </a>
                <div className="media">
                    <div className="media-img-wrap">
                        <div className="avatar avatar-online">
                            <img
                                src={image}
                                alt="User Image"
                                className="avatar-img rounded-circle"
                            />
                        </div>
                    </div>
                    <div className="media-body">
                        <div className="user-name">{receiverName ?? 'nill'}</div>
                        <div className="user-status">online</div>
                    </div>
                </div>
                <div className="chat-options">
                    <a
                        href="javascript:void(0)"
                        data-toggle="modal"
                        data-target="#voice_call"
                    >
                        <i className="material-icons">local_phone</i>
                    </a>
                    <a
                        href="javascript:void(0)"
                        data-toggle="modal"
                        data-target="#video_call"
                    >
                        <i className="material-icons">videocam</i>
                    </a>
                    <a href="javascript:void(0)">
                        <i className="material-icons">more_vert</i>
                    </a>
                </div>
            </div>

            <div className="chat-body">
                <div className="chat-scroll">
                    <ul className="list-unstyled">
                        <li className="media sent">
                            <div className="media-body">
                                <div className="msg-box">
                                    <div>
                                        <p>Hello. What can I do for you?</p>
                                        <ul className="chat-msg-info">
                                            <li>
                                                <div className="chat-time">
                                                    <span>8:30 AM</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="media received">
                            <div className="avatar">
                                <img
                                    src={image}
                                    alt="User Image"
                                    className="avatar-img rounded-circle"
                                />
                            </div>
                            <div className="media-body">
                                <div className="msg-box">
                                    <div>
                                        <p>I'm just looking around.</p>
                                        <p>
                                            Will you tell me something about yourself?
                                        </p>
                                        <ul className="chat-msg-info">
                                            <li>
                                                <div className="chat-time">
                                                    <span>8:35 AM</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="msg-box">
                                    <div>
                                        <p>Are you there? That time!</p>
                                        <ul className="chat-msg-info">
                                            <li>
                                                <div className="chat-time">
                                                    <span>8:40 AM</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="msg-box">
                                    <div>
                                        <div className="chat-msg-attachments">
                                            <div className="chat-attachment">
                                                <img
                                                    src={image}
                                                    alt="Attachment"
                                                />
                                                <div className="chat-attach-caption">
                                                    placeholder.jpg
                                                </div>
                                                <a
                                                    href="#"
                                                    className="chat-attach-download"
                                                >
                                                    <i className="fas fa-download"></i>
                                                </a>
                                            </div>
                                            <div className="chat-attachment">
                                                <img
                                                    src={image}
                                                    alt="Attachment"
                                                />
                                                <div className="chat-attach-caption">
                                                    placeholder.jpg
                                                </div>
                                                <a
                                                    href="#"
                                                    className="chat-attach-download"
                                                >
                                                    <i className="fas fa-download"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <ul className="chat-msg-info">
                                            <li>
                                                <div className="chat-time">
                                                    <span>8:41 AM</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="media sent">
                            <div className="media-body">
                                <div className="msg-box">
                                    <div>
                                        <p>Where?</p>
                                        <ul className="chat-msg-info">
                                            <li>
                                                <div className="chat-time">
                                                    <span>8:42 AM</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="msg-box">
                                    <div>
                                        <p>
                                            OK, my name is Limingqiang. I like singing,
                                            playing basketballand so on.
                                        </p>
                                        <ul className="chat-msg-info">
                                            <li>
                                                <div className="chat-time">
                                                    <span>8:42 AM</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="msg-box">
                                    <div>
                                        <div className="chat-msg-attachments">
                                            <div className="chat-attachment">
                                                <img
                                                    src={image}
                                                    alt="Attachment"
                                                />
                                                <div className="chat-attach-caption">
                                                    placeholder.jpg
                                                </div>
                                                <a
                                                    href="#"
                                                    className="chat-attach-download"
                                                >
                                                    <i className="fas fa-download"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <ul className="chat-msg-info">
                                            <li>
                                                <div className="chat-time">
                                                    <span>8:50 AM</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="media received">
                            <div className="avatar">
                                <img
                                    src={image}
                                    alt="User Image"
                                    className="avatar-img rounded-circle"
                                />
                            </div>
                            <div className="media-body">
                                <div className="msg-box">
                                    <div>
                                        <p>You wait for notice.</p>
                                        <p>Consectetuorem ipsum dolor sit?</p>
                                        <p>Ok?</p>
                                        <ul className="chat-msg-info">
                                            <li>
                                                <div className="chat-time">
                                                    <span>8:55 PM</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="chat-date">Today</li>
                        <li className="media received">
                            <div className="avatar">
                                <img
                                    src={image}
                                    alt="User Image"
                                    className="avatar-img rounded-circle"
                                />
                            </div>
                            <div className="media-body">
                                <div className="msg-box">
                                    <div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit,
                                        </p>
                                        <ul className="chat-msg-info">
                                            <li>
                                                <div className="chat-time">
                                                    <span>10:17 AM</span>
                                                </div>
                                            </li>
                                            <li>
                                                <a href="#">Edit</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="media sent">
                            <div className="media-body">
                                <div className="msg-box">
                                    <div>
                                        <p>Lorem ipsum dollar sit</p>
                                        <div className="chat-msg-actions dropdown">
                                            <a
                                                href="#"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="fe fe-elipsis-v"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="#">
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                        <ul className="chat-msg-info">
                                            <li>
                                                <div className="chat-time">
                                                    <span>10:19 AM</span>
                                                </div>
                                            </li>
                                            <li>
                                                <a href="#">Edit</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="media received">
                            <div className="avatar">
                                <img
                                    src={image}
                                    alt="User Image"
                                    className="avatar-img rounded-circle"
                                />
                            </div>
                            <div className="media-body">
                                <div className="msg-box">
                                    <div>
                                        <div className="msg-typing">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="chat-footer">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="btn-file btn">
                            <i className="fa fa-paperclip"></i>
                            <input type="file" />
                        </div>
                    </div>
                    <input
                        type="text"
                        className="input-msg-send form-control"
                        placeholder="Type something"
                        name="message"
                        onChange={handleChange}
                    />
                    <div className="input-group-append">
                        <button onClick={() => sendMessage()} type="button" className="btn msg-send-btn">
                            <i className="fab fa-telegram-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom;