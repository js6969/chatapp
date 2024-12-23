import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
    return (
        <Stack>
            <Skeleton colorScheme="blue"/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
        </Stack>
    )
};

export default ChatLoading;