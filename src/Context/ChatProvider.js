import React, { createContext , useContext, useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(() => 
        JSON.parse(localStorage.getItem("userInfo"))
    );
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState();
    const [notification, setNotification] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    return (
        <ChatContext.Provider 
            value={{ 
                user, 
                setUser , 
                selectedChat, 
                setSelectedChat, 
                chats, 
                setChats,
                notification,
                setNotification,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
