import React, { useRef, useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdVideoCall } from "react-icons/md";
import { useSelector } from "react-redux";
import image from "../../../../assets/img/defaultImg.jpg";
import { postHttpRequest } from "../../../../axios";

const ChatRoom = () => {
  const { recieverName, messages, conversationId } = useSelector(
    (state) => state.chat
  );
  const { userid } = useSelector((state) => state.auth.user);
  const writeMessage = useRef();

  const [typedMessage, setTypedMessage] = useState("");

  const handleChange = (event) => {
    setTypedMessage(event.target.value);
  };

  const sendMessage = async () => {
    writeMessage.current.value = "";
    const response = await postHttpRequest("/front/chat/sendMessage", {
      message: typedMessage,
      senderId: userid,
      conversationId,
    });
    console.log(response, "respnse from backend of send message");
  };

  return (
    <div className="chat-cont-right">
      <div className="chat-header">
        <a
          id="back_user_list"
          href="javascript:void(0)"
          className="back-user-list"
        >
          <i className="material-icons"></i>
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
            <div className="user-name">{recieverName ?? "nill"}</div>
            <div className="user-status">online</div>
          </div>
        </div>
        <div className="chat-options">
          <a
            href="javascript:void(0)"
            data-toggle="modal"
            data-target="#voice_call"
          >
            <FiPhoneCall size={22}/>
          </a>
          <a
            href="javascript:void(0)"
            data-toggle="modal"
            data-target="#video_call"
          >
            <MdVideoCall size={22}/>
          </a>
          <a href="javascript:void(0)">
            <i className="material-icons"></i>
          </a>
        </div>
      </div>

      <div className="chat-body">
        <div className="chat-scroll">
          <ul className="list-unstyled">
            {messages.length >= 1 &&
              messages.map((message) => {
                if (message.senderId == userid) {
                  return (
                    <li className="media sent">
                      <div className="media-body">
                        <div className="msg-box">
                          <div>
                            <p>{message.message}</p>
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
                  );
                }
                return (
                  <li className="media received">
                    <div className="media-body">
                      <div className="msg-box">
                        <div>
                          <p>{message.message}</p>
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
                );
              })}
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
            ref={writeMessage}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button
              onClick={() => sendMessage()}
              type="button"
              className="btn msg-send-btn"
            >
              <i className="fab fa-telegram-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
