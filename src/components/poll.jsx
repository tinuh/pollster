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
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" width="300px">
            <Grid
                h="200px"
                templateRows="repeat(3, .3fr)"
                templateColumns="repeat(5, .1fr)"
                gap={4}
                >    
                <GridItem rowSpan={2} colSpan={1}>
                    <ChevronUpIcon /> <Text>5{/*props.upvotes*/}</Text> <ChevronDownIcon />
                </GridItem>
                <GridItem colSpan={4}>
                    <Heading as="h6" size="md"> Poll title {/*props.pollName*/} </Heading>
                </GridItem>
                <GridItem colSpan={4}>
                    <Text> Basic poll description {/*props.pollDescription*/} </Text>
                </GridItem>
                <GridItem colSpan={5}>
                    <Button colorScheme="blue" onClick={()=>setShowModal(true)} isFullWidth={true}>Open Poll</Button>
                </GridItem>
            </Grid>
            {showModal && <Pollpopup data={props.popupInfo} set={setShowModal} />}
        </Box>
    )
}