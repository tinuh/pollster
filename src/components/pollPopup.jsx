import React from 'react';

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,} from "@chakra-ui/react"

export default function Pollpopup(props){

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{props.data.pollname}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {props.data.form}
            </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Submit
                    </Button>
                    <Button variant="ghost">Open in new page</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}