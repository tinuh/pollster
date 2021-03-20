import React from 'react';

import {
    Box,
    Heading,
} from "@chakra-ui/react";

import Poll from '../components/poll';

export default function Dashboard() {
    return (
        <>
            <Box ml="10%">
                <Heading as="h1" ml="46%">Map!</Heading>
                {/* PUT THE MAP IN THIS BOX */}
                <Box w="90%" h="50vw" borderWidth="1px" borderRadius="lg" overflow="hidden"></Box>
                <Heading mt="2vw" ml="2vw">Top rated polls near you: </Heading>
                <Box style={{"display":"inline-flex"}} mb="1vw" mt="1vw">
                    <Poll pollvoting={true} /> <Box ml="1vw"></Box> <Poll pollvoting={true} /> <Box ml="1vw"></Box> <Poll pollvoting={true} /> <Box ml="1vw"></Box> <Poll pollvoting={true} />
                </Box>
                <Box style={{"display":"inline-flex"}} mb="5vw">
                    <Poll pollvoting={true} /> <Box ml="1vw"></Box> <Poll pollvoting={true} /> <Box ml="1vw"></Box> <Poll pollvoting={true} /> <Box ml="1vw"></Box> <Poll pollvoting={true} />
                </Box>
            </Box>
        </>
    )
}
