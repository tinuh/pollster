import React from 'react';
import { Map, Marker } from 'pigeon-maps'

import {
    Box, 
    Heading,
    SimpleGrid,
    Container,
} from "@chakra-ui/react";

import Poll from '../components/poll';
import Pollpopup from '../components/pollPopup';

/* const containerStyle = {
    width: '100%',
    height: '50vw'
}; */

/* const center = {
    lat: -3.745,
    lng: -38.523
}; */

export default function Discover(){
    
    const [showPopup, setShowPopup] = React.useState(false);
    const markers = [{"coords":[50.879, 4.6997], "pollInfo":{"title":"Example poll", "body":""}}]
    const getProvider = (x, y, z) => `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;

    return (
        <Box align="center">
            <Heading>Map!</Heading>
            {showPopup && <Pollpopup set={setShowPopup} />}
            <Box w="90%" h="50vw" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Map defaultCenter={[50.879, 4.6997]} defaultZoom={12} width="100%" height="100%" provider={getProvider}>
                    {
                        markers.map(marker => <Marker anchor={marker.coords} payload={marker.pollInfo} width={50} height={50} onClick={({ event, anchor, payload }) => setShowPopup(true)} />)
                    }
                    
                </Map>
            </Box>

            <Container maxW="container.lg" mt={12}>
                <Heading>Top rated polls near you: </Heading>
                <SimpleGrid p={8} columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                    <Poll pollvoting={true}/>
                    <Poll pollvoting={true}/>
                    <Poll pollvoting={true}/>
                    <Poll pollvoting={true}/>
                    <Poll pollvoting={true}/>
                    <Poll pollvoting={true}/>
                    <Poll pollvoting={true}/>
                    <Poll pollvoting={true}/>
                    <Poll pollvoting={true}/>
                    <Poll pollvoting={true}/>
                    <Poll pollvoting={true}/>
                </SimpleGrid>
            </Container>
        </Box>
    )
}