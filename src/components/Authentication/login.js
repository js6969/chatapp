import React, {useState} from "react";
import { Input, FormControl, FormLabel, VStack, InputGroup, InputRightElement, Button } from '@chakra-ui/react';

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleClick = () => setShow(!show);

    const submitHandler = () => {};

    return (
        <VStack spacing={"5px"}>
            <FormControl id='email' isRequired>
                <FormLabel color={"blue.900"}>
                    Email
                </FormLabel>
                <Input
                placeHolder = "Enter your email"
                onChange={(e)=>setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id='password' isRequired color={"blue.900"}>
                <FormLabel>
                    Password
                </FormLabel>
                <InputGroup>
                    <Input
                    type={show ? "text" : "password"}
                    placeHolder = "Enter your password"
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button   
                width="100%"
                style={{marginTop: 15}}
                onClick={submitHandler}
            >
                <text>
                    Login
                </text>
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
    )
}

export default Login;