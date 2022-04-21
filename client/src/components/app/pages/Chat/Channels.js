import React from "react";
import Channel from "./Channel";

const Channels = ({ channels }) => {
  return (
    <div className="chat-cont-left">
      <div className="chat-header">
        <span>Chats</span>
        <a href="javascript:void(0)" className="chat-compose">
          <i className="material-icons">control_point</i>
        </a>
      </div>
      <form className="chat-search">
        <div className="input-group">
          <div className="input-group-prepend">
            <i className="fas fa-search"></i>
          </div>
          <input type="text" className="form-control" placeholder="Search" />
        </div>
      </form>
      <div className="chat-users-list">
        <div className="chat-scroll">
          {channels.map((user) => {
            return <Channel key={user._id} user={user} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Channels;
