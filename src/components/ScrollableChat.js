import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin , isSameUser } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import { Tooltip , Avatar } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {

    const { user } = ChatState();
    // console.log(user.name, user._id);

    // if (!user || !user._id) return null;
    return (
        <ScrollableFeed>
            {messages && messages.map((m,i) => (
                
                <div style={{ display: "flex" }} key={m._id}>
                    { (isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
                        <Tooltip label={m.sender?.name} placement="bottom-start" hasArrow>
                            <Avatar
                                mt="7px"
                                mr="1"
                                size="sm"
                                cursor="pointer"
                                name={m.sender?.name}
                                src={m.sender?.pic}
                            />
                        </Tooltip>
                    )}

                    <span
                        style={{
                            backgroundColor: `${
                            m.sender?._id === user._id ? "#339DFF" :  "#5CD47D"
                            // rgba(175, 225, 177, 0.92)
                            }`,
                        
                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                            marginLeft: isSameSenderMargin(messages,m,i,user._id),
                            marginTop: isSameUser(messages,m,i,user._id)?3:10,
                        }}
                    >
                        {m.content}
                    </span>
                </div>
            ))}
        </ScrollableFeed>
    );
};

export default ScrollableChat;

