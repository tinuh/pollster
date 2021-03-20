import React from 'react';

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export default function Pollpopup(props){

    const [ open, setOpen ] = React.useState(true);

    return (
        <Modal isOpen={open} onClose={()=>setOpen(false)}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{/*props.data.pollname*/}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {/*props.data.form*/}
                Body
            </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={()=>setOpen(false)}>
                        Submit
                    </Button>
                    <Button variant="ghost">Open in new page</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}