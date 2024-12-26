import { createContext , useContext, useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(() => 
        JSON.parse(localStorage.getItem("userInfo"))
    );
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [notification, setNotification] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) setUser(userInfo);

        // if (!userInfo) {
        //     navigate("/");
        // }
    }, [navigate]);
    
    // if (!user) return null;

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
