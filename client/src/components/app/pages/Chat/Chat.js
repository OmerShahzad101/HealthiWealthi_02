import React, {useEffect, useState} from "react";
import Channels from "./Channels";
import ChatRoom from "./ChatRoom";
import {getHttpRequest} from "../../../../axios";

const Chat = () => {

    const [users, setUsers] = useState([
        {id: 1, name: 'ahmed'},
        {id: 2, name: 'rehan'},
        {id: 3, name: 'umair'},
    ])

    const fetchUsers = async () => {
        const resp = await getHttpRequest('/front/chat/get')
        console.log(resp, 'these are channels')
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className="chat-page">

            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="chat-window">
                                {/* <!-- Chat Left --> */}
                                <Channels channels = {users} />
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