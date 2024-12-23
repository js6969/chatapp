import { IconButton, ModalOverlay, useDisclosure , Modal , ModalBody , ModalContent , ModalHeader , ModalCloseButton , ModalFooter , Button , Image , Text} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import React from "react";

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton
                    display={{ base: "flex" }}
                    icon={<ViewIcon color="black"/>}
                    onClick={onOpen}
                    color={"black"}
                />
            )}

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                    <ModalContent color={"black"} h="410px">
                        <ModalHeader
                            fontSize={"40px"}
                            fontFamily={"Work sans"}
                            display={"flex"}
                            justifyContent={"center"}
                        >
                            {user.name}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody
                            display={"flex"}
                            flexDir={"column"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            
                        >
                            <Image
                                borderRadius="full"
                                boxSize="150px"
                                src={user.pic}
                                alt={user.name}
                            />
                            <Text
                                fontFamily="Work sans"
                                fontSize={{ base: "20px", md: "25px" }}  
                                >
                                    Email: {user.email}
                            </Text>
                        </ModalBody>
                        
                        <ModalFooter>
                            <Button colorScheme="blue" mr="3" onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </>
    );

}

export default ProfileModal;