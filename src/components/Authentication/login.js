import React, { useState } from "react";
import { Input, FormControl, FormLabel, VStack, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const { setUser } = ChatState();

    const handleClick = () => setShow(!show);

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
              "https://chatapp-5u1r.onrender.com/api/user/login",
              { email, password },
              config
            );

            toast({
                title: "Login successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
        } catch (error) {
            toast({
                title: "Error occurred",
                description: error.response ? error.response.data.message : "An unknown error occurred",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };

    // const handleGuestLogin = () => {
    //     const guestLogin = {
    //         email: "guest@example.com",
    //         password: "123456"
    //     };
    //     setEmail(guestLogin.email);
    //     setPassword(guestLogin.password);
    // };

    return (
        <VStack spacing={"10px"}>
            <FormControl id="email" isRequired>
                <FormLabel color={"blue.900"}>
                    Email Address
                </FormLabel>
                <Input
                    placeholder="Enter your email address"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id="password" isRequired >
                <FormLabel color={"blue.900"}>
                    Password
                </FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem" >
                        <Button height="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>

            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={() => {
                    setEmail("guest@example.com");
                    setPassword("123456");
                }}
            >
                Continue as guest
            </Button>
        </VStack>
    );
};

export default Login;
