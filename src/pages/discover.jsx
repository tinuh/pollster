import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

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
                <LoadScript
                    googleMapsApiKey="AIzaSyA7igErPwTsDQt3kXKO-e2k8PNWDVvoRaA"
                >
                    <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    >
                    { /* Child components, such as markers, info windows, etc. */ }
                    <></>
                    </GoogleMap>
                </LoadScript>
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