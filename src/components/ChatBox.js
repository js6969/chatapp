import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
import "./styles.css";

const ChatBox = ({ fetchAgain , setFetchAgain }) => {
    const { selectedChat } = ChatState();

    return (
        <Box
            display={{ base: selectedChat ? "flex" : "none", md: "flex"}}
            alignItems={"center"}
            flexDir="column"
            padding={"3"}
            bgColor="gray"
            width={{ base: "100%", md: "68%" }}
            borderRadius={"lg"}
            borderWidth={"1px"}
            color={"black"}
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    );
};

export default ChatBox;