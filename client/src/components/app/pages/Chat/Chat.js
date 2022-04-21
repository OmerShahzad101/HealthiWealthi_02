import React, { useEffect, useState } from "react";
import Channels from "./Channels";
import ChatRoom from "./ChatRoom";
import { getHttpRequest } from "../../../../axios";

const Chat = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data } = await getHttpRequest("/front/chat/list");
    setUsers(data.client);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="chat-page">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="chat-window">
                {/* <!-- Chat Left --> */}
                <Channels channels={users} />
                {/* <!-- /Chat Left --> */}

                {/* <!-- Chat Right --> */}
                <ChatRoom />
                {/* <!-- /Chat Right --> */}
              </div>
            </div>
          </div>
          {/* <!-- /Row --> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
