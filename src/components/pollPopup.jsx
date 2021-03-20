import React from 'react';

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export default function Pollpopup(props){

    const [ open, setOpen ] = React.useState(true);
    const canViewPollResults = true; //get from db somehow

    function handleClose(){
        props.set(false);
        setOpen(false);
    }

    return (
        <Modal isOpen={open} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{/*props.data.pollname*/}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {/*props.data.form*/}
                Body
            </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleClose}>
                        Submit
                    </Button>
                    { canViewPollResults && <Button colorScheme="red" mr={3} onClick={handleClose}>
                        View Poll results
                    </Button>}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}