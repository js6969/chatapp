import { 
    Box, 
    Button, 
    Tooltip , 
    Text, 
    Menu, 
    MenuButton, 
    MenuItem , 
    MenuList, 
    MenuDivider ,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Input,
    useToast,
    Spinner
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import React from "react";
import { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import  { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import axios from 'axios';
import { getSender } from "../../config/ChatLogics";
import NotificationBadge , { Effect } from "react-notification-badge"; 


const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const { user , setSelectedChat , chats , setChats , notification , setNotification } = ChatState();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    }
    
    const toast = useToast();

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please enter email",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
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

            const { data } = await axios.get(`/api/user?search=${search}`, config);

            setSearchResult(data);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to load search result",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        };
    };

    const accessChat = async(userId) => {
        try {
            setLoadingChat(true);

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post('/api/chat', { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
            
        } catch (error) {
            toast({
                title: "Error fetching the chats",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.500"
                width="100%"
                padding="5px 10px 5px 10px"
                borderWidth="5px"              
            >
                <Tooltip label="Search users to chat" 
                hasArrow 
                placement="bottom-end">
                    <Button variant="ghost" onClick={onOpen}> 
                        <i className="fas fa-search"></i>
                        <Text display={{base: "none", md: "flex"}} px="4">
                            Search Users
                        </Text>
                    </Button>
                </Tooltip>

                <Text fontSize="2xl" fontFamily="Work sans" color="black">
                    ConvoHub
                </Text>
                <div>
                    <Menu>
                        <MenuButton p="1">
                            <NotificationBadge 
                                count={notification.length}
                                effect={Effect.SCALE}
                            />
                            <BellIcon color="black" fontSize={"2xl"} m="1"/>
                        </MenuButton>
                        <MenuList pl={"2"} color={"black"}>
                            {!notification.length && "No new messages"}
                            {notification.map((notif) => (
                                <MenuItem 
                                    key={notif._id}
                                    onClick={() => {
                                        setSelectedChat(notif.chat);
                                        setNotification(notification.filter((n) => n !== notif));
                                    }} 
                                >
                                    {notif.chat.isGroupChat
                                        ? `New message in ${notif.chat.chatName}`
                                        : `New message from ${getSender(user, notif.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton 
                            as={Button}
                            // rightIcon={<ChevronDownIcon/>}
                            bg="gray.500"
                        >
                            <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic}
                            bg="gray.900"/>
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem color="black">My Profile</MenuItem>{" "}
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler} color={"black"}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={"1px"}  bgColor={"gray.700"}>
                        Search users
                    </DrawerHeader>

                    <DrawerBody bgColor={"gray.500"}>
                        <Box display={"flex"} pb={2} >
                            <Input
                                bgColor={"white"}
                                placeholder="Search user by name or email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                color="black"
                            />
                            <Button onClick={handleSearch} bgColor={"gray.600"}>Go</Button>
                        </Box>

                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map(user => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={()=>accessChat(user._id)}
                                />
                            ))
                        )}
                        {loadingChat && <Spinner ml="auto" display={"flex"} />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default SideDrawer;