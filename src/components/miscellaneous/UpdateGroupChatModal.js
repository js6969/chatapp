import { useState } from "react";
import { IconButton , Button, useToast, FormControl , Input, Spinner } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box
} from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import axios from 'axios';
import UserListItem from "../UserAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain , setFetchAgain , fetchMessages }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [groupChatName, setGroupChatName] = useState();
    const [renameloading, setRenameloading] = useState(false);

    const toast = useToast();

    const { selectedChat , setSelectedChat , user } = ChatState();

    const handleRemove = async(user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
            toast({
                title: "Only Admins can remove members",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return;
        }

         try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put('/api/chat/groupremove', {
                    chatId: selectedChat._id,
                    userId: user1._id,
                },
                config
            );

            user1._id === user._id ? setSelectedChat("") : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setRenameloading(false);
        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
        setGroupChatName("");
    };

    const handleAddUser = async(user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: "User already in group",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only Admins can add members",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put('/api/chat/groupadd', {
                    chatId: selectedChat._id,
                    userId: user1._id,
                },
                config
            );

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameloading(false);
        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
        setGroupChatName("");
    };

    const handleRename = async() => {
        if (!groupChatName) return;

        try {
            setRenameloading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put(`/api/chat/rename`, {
                chatId: selectedChat._id,
                chatName: groupChatName,
                },
                config
            );

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameloading(false);
        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setRenameloading(false);
        }

        setGroupChatName("");
    };

    const handleSearch = async(query) => {
        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);
            // console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured",
                description: "Failed to load search results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            setLoading(false);
        }
    };

    return (
        <>  
            
            <IconButton display={{base: "flex"}} icon={<ViewIcon />} onClick={onOpen} bgColor="gray.600"/>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                        textColor={"blackAlpha.900"}
                        bgColor={"gray.600"}
                    >
                        {selectedChat.chatName}
                    </ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    bgColor={"gray.500"}
                >
                    <Box 
                        width="100%"
                        display="flex"
                        flexWrap="wrap"
                        pb="3"
                        
                    >
                        {selectedChat.users.map((u) => {
                            <UserBadgeItem 
                                key={u._id}
                                user={u}
                                admin={selectedChat.groupAdmin}
                                handleFunction={() => handleRemove(u)}
                            />
                        })}
                    </Box>

                    <Box>
                        <FormControl display="flex">
                            <Input
                            placeholder="Chat Name"
                            mb={"3"}
                            value={groupChatName}
                            onChange={(e) => setGroupChatName(e.target.value)} 
                            bgColor={"white"}
                            />
                            <Button
                            variant="solid"
                            colorScheme="teal"
                            ml={1}
                            isLoading={renameloading}
                            onClick={handleRename} 
                            bgColor={"blue.600"}>
                                Update
                            </Button>

                        </FormControl>

                        <FormControl>
                            <Input
                                placeholder="Add user to group"
                                mb="1"
                                onChange={(e) => handleSearch(e.target.value)}
                                bgColor={"white"}
                            />
                        </FormControl>

                        {loading ? (
                            <Spinner size="lg" />
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleAddUser(user)}
                                />
                            ))
                        )}
                    </Box>
                </ModalBody>

                <ModalFooter bgColor={"gray.500"}>
                    <Button colorScheme="red" onClick={() => handleRemove(user)} bgColor={"red.600"}>
                        Leave Group
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default UpdateGroupChatModal;