import { IconButton, ModalOverlay, useDisclosure , Modal , ModalBody , ModalContent , ModalHeader , ModalCloseButton , ModalFooter , Button , Image , Text} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

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

            <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay/>
                    <ModalContent color="black" height="410px">
                        <ModalHeader
                            fontSize="40px"
                            fontFamily="Work sans"
                            display="flex"
                            justifyContent="center"
                        >
                            {user.name}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody
                            display="flex"
                            flexDir="column"
                            alignItems="center"
                            justifyContent="space-between"       
                        >
                            <Image
                                borderRadius="full"
                                boxSize="150px"
                                src={user.pic}
                                alt={user.name}
                            />
                            <Text
                                fontFamily="Work sans"
                                fontSize={{ base: "28px", md: "30px" }}  
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