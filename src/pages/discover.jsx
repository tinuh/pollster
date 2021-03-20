import React from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps'

import {Box, Heading} from "@chakra-ui/react";

import Poll from '../components/poll';

const containerStyle = {
    width: '100%',
    height: '50vw'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

export default function Discover(){
    
    return (
        <Box ml="10%">
            <Heading as="h1" ml="46%">Map!</Heading>

            <Box w="90%" h="50vw" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Map defaultCenter={[50.879, 4.6997]} defaultZoom={12} width="100%" height="100%">
                    <Marker anchor={[50.874, 4.6947]} payload={1} onClick={({ event, anchor, payload }) => {}} />
                </Map>
            </Box>
            <Heading mt="2vw" ml="2vw">Top rated polls near you: </Heading>
            <Box style={{"display":"inline-flex"}} mb="1vw" mt="1vw">
                <Poll pollvoting={true} /> <Box ml="1vw"></Box> <Poll pollvoting={true} /> <Box ml="1vw"></Box> <Poll pollvoting={true} /> <Box ml="1vw"></Box> <Poll pollvoting={true} />
            </Box>
            <Box style={{"display":"inline-flex"}} mb="5vw">
                <Poll pollvoting={true} /> <Box ml="1vw"></Box> <Poll pollvoting={true} /> <Box ml="1vw"></Box> <Poll pollvoting={true} /> <Box ml="1vw"></Box> <Poll pollvoting={true} />
            </Box>
        </Box>
    )
}