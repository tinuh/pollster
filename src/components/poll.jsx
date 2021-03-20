import React from 'react';
import { Box } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import Pollpopup from './pollPopup';

export default function Poll(props){

    const [showModal, setShowModal] = React.useState(false);

    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box>
                <ChevronUpIcon /> <Text>5{/*props.upvotes*/}</Text> <ChevronDownIcon />
            </Box>
            <Heading> {props.pollName} </Heading>
            <Text> {props.pollDescription} </Text>
            <Button variant="ghost" onClick={()=>setShowModal(true)}>Open Poll</Button>
            {showModal && <Pollpopup data={props.popupInfo} set={setShowModal} />}
        </Box>
    )
}