import React from 'react';
import { Container, Text, Button, Heading } from "@chakra-ui/react";
import { DownloadIcon } from '@chakra-ui/icons';

export default function homePage(){
    return (
        <>
            <Heading>POLLSTER</Heading>
            <Text>A polling app with unlimited potential</Text>
            <Container align="center" display="inline-flex">
                <img src='/hompagesvg/options.svg' alt="options" w="20%" h="20%" /> <Text ml="1vw" align="left">The community can pick and choose which polls are most important for them, this can allow the community to prioritze the most urget polls that could potentially cause drastic reforms. </Text>
            </Container>
            <Container align="center" display="inline-flex">
                <Text ml="1vw" align="left">Easily find polls near you. You can answer polls related to problems that are arising in your community that can help better the enviornment, aid in the growth of local startups, allow you to share your ideas with your local government, and so much more! </Text> <img src='/hompagesvg/map.svg' alt="map" w="20%" h="20%" /> 
            </Container>
            <Container align="center" display="inline-flex">
                <img src='/hompagesvg/pwa.svg' alt="pwa" w="20%" h="20%" /> <Text ml="1vw" align="left">Pollster is PWA optimized, so you can download it and run it as if it were a native app!</Text>
            </Container>
            <Text> Download (or use the web version) Pollster today and create and answer polls to help your community </Text>
            <Button colorScheme="twitter" leftIcon={<DownloadIcon />}> DOWNLOAD </Button>
        </>
    )
}