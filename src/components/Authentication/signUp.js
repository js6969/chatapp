import React, {useState} from "react";
import { Input, FormControl, FormLabel, VStack, InputGroup, InputRightElement, Button } from '@chakra-ui/react';


const SignUp = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();

    const handleClick = () => setShow(!show);

    const postDetails = (pics) => {};

    const submitHandler = () => {};

    return (
        <VStack spacing={"5px"}>
            <FormControl id='first-name' isRequired>
                <FormLabel color={"blue.900"}>
                    Name
                </FormLabel>
                <Input
                placeHolder = "Enter your name"
                onChange={(e)=>setName(e.target.value)}
                />
            </FormControl>

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

            <FormControl id='confirmPassword' isRequired>
                <FormLabel color={"blue.900"}>
                    Confirm Password
                </FormLabel>
                <InputGroup>
                    <Input
                    type={show ? "text" : "password"}
                    placeHolder = "Confirm your password"
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='pic' isRequired color={"blue.900"}>
                <FormLabel>
                    Upload your picture
                </FormLabel>
                <Input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e)=>postDetails(e.target.files[0])}
                />
            </FormControl>

            <Button   
                width="100%"
                style={{marginTop: 15}}
                onClick={submitHandler}
            >
                <text>
                    Sign Up
                </text>
            </Button>

        </VStack>
    )
}

export default SignUp;