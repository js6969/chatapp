import React , { useEffect } from "react";
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentication/login"
import SignUp from "../components/Authentication/signUp";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        
        if (user) navigate("/chats");      
    }, [navigate]);

    return (
        <Container maxW="xl" centerContent>
            <Box
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
                padding={3}
                background={"gray.500"}
                width="100%"
                margin="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="4xl" fontFamily="Work Sans" color="white">
                    ConvoHub
                </Text>
            </Box>
            <Box
                width="100%"
                padding={4}
                bg={"gray.500"}
                borderRadius={"lg"}
                borderWidth={"1px"}
                color="black"
            >
                <Tabs isFitted variant="soft-rounded">
                    <TabList mb="1em">
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <SignUp />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
}

export default Homepage;