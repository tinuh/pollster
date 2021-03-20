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
import { getCol } from '../lib/db.js';
import initFirebase from '../lib/firebase';

/* const containerStyle = {
    width: '100%',
    height: '50vw'
}; */

/* const center = {
    lat: -3.745,
    lng: -38.523
}; */

export default function Discover(){
    initFirebase();
    let loading = true;
    let markers = null;

    React.useEffect(async()=>{
        markers = await getCol("polls");
        loading=false;
    })

    const [post, setPost] = React.useState(null);
    const [showPopup, setShowPopup] = React.useState(false);
    const getProvider = (x, y, z) => `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;

    function handleClick(payload){
        setPost(payload);
        setShowPopup(true);
    }

    if (!loading){
        return (
            <Box align="center">
                <Heading>Map!</Heading>
                {showPopup && <Pollpopup set={setShowPopup} data={post} />}
                <Box w="90%" h="50vw" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Map defaultCenter={[39.0458, 76.6413]} defaultZoom={12} width="100%" height="100%" provider={getProvider}>
                        {
                            markers.map(marker => <Marker anchor={[marker.location.lat, marker.location.long]} payload={marker} width={50} height={50} onClick={({ payload }) => handleClick(payload)} />)
                        }
                        
                    </Map>
                </Box>

                <Container maxW="container.lg" mt={12}>
                    <Heading>Top rated polls near you: </Heading>
                    <SimpleGrid p={8} columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                        <Poll pollvoting={true} name="test" description="test description"/>
                        <Poll pollvoting={true} name="test" description="test description"/>
                        <Poll pollvoting={true} name="test" description="test description"/>
                        <Poll pollvoting={true} name="test" description="test description"/>
                        <Poll pollvoting={true} name="test" description="test description"/>
                        <Poll pollvoting={true} name="test" description="test description"/>
                        <Poll pollvoting={true} name="test" description="test description"/>
                        <Poll pollvoting={true} name="test" description="test description"/>
                        <Poll pollvoting={true} name="test" description="test description"/>
                        <Poll pollvoting={true} name="test" description="test description"/>
                    </SimpleGrid>
                </Container>
            </Box>
        )
    }
    else{
        return(
            <></>
        )
    }
}