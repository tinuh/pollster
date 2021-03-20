import React from 'react';
import { Box } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react"

import Pollpopup from './pollPopup';

export default function Poll(props){

    const [showModal, setShowModal] = React.useState(false);

    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" w="32vw" h="17vw">
            <Grid
                w="500px"
                h="190px"
                templateRows="repeat(3, .3fr)"
                templateColumns="repeat(5, .1fr)"
                gap={4}
                ml="2px"
                mr={0}
                mb={0}
                >    
                <GridItem rowSpan={2} colSpan={1} ml="2vw" mt="1vw">
                    <ChevronUpIcon /> <Text>5{/*props.upvotes*/}</Text> <ChevronDownIcon />
                </GridItem>
                <GridItem colSpan={4} mt="2vw">
                    <Heading as="h6" size="md"> Poll title {/*props.pollName*/} </Heading>
                </GridItem>
                <GridItem colSpan={4} mt="-2vw" size="xs">
                    <Text> Basic poll description {/*props.pollDescription*/} </Text>
                </GridItem>
                <GridItem colSpan={5} ml="1vw" mt="-3vw">
                    <Button colorScheme="blue" onClick={()=>setShowModal(true)} isFullWidth={true}>Open Poll</Button>
                </GridItem>
            </Grid>
            {showModal && <Pollpopup data={props.popupInfo} set={setShowModal} />}
        </Box>
    )
}