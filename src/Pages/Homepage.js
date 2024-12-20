import React from "react";
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentication/login"
import SignUp from "../components/Authentication/signUp";

const Homepage = () => {
    return (
        <Container maxW="xl" centerContent>
            <Box
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
                p={3}
                bg={"gray.500"}
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="4xl" fontFamily="Work Sans" color="white">
                    Bak-Bak
                </Text>
            </Box>
            <Box
                w="100%"
                padding={4}
                bg={"gray.500"}
                borderRadius={"lg"}
                borderWidth={"1px"}
                color="black"
            >
                <Tabs variant='soft-rounded'>
                    <TabList mb="1em">
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login/>
                        </TabPanel>
                        <TabPanel>
                            <SignUp/>
                        </TabPanel>
                    </TabPanels>
                    </Tabs>
            </Box>

        </Container>
    )
}

export default Homepage