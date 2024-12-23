import { Box, Button, Tooltip , Text, Menu, MenuButton, MenuItem , MenuList, MenuDivider } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import  { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, serSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const { user } = ChatState();

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip label="Search users to chat" 
                hasArrow 
                placement="bottom-end">
                    <Button variant="ghost"> 
                        <i class="fas fa-search"></i>
                        <Text  display={{base: "none", md: "flex"}} px="4">
                            Search User
                        </Text>
                    </Button>
                </Tooltip>

                <Text fontSize="2xl" fontFamily="Work sans" color="black">
                    ConvoHub
                </Text>
                <div>
                    <Menu>
                        <MenuButton p="1">
                            <BellIcon color="black" fontSize={"2xl"} m="1"/>
                            {/* <i class="fas fa-bell"></i> */}
                        </MenuButton>
                        {/* <MenuList>

                        </MenuList> */}
                    </Menu>
                    <Menu>
                        <MenuButton 
                            as={Button}
                            rightIcon={<ChevronDownIcon/>}
                        >
                            <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic}/>
                        </MenuButton>
                        <MenuList>
                            <ProfileModal>
                                <MenuItem color="black">My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider/>
                            <MenuItem color={"black"}>Logout</MenuItem>
                        </MenuList>
                    </Menu>

                </div>
            </Box>
        </>
    )

}

export default SideDrawer;