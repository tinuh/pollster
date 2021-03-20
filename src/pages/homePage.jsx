import React from 'react';
import { Container, Text } from "@chakra-ui/react";

export default function homePage(){
    return (
        <>
            <Container>
                <img src='/hompagesvg/pwa.svg' alt="map" /> <Text>Pollster is PWA optimized, so you can download it and run it as if it were a native app!</Text>
            </Container>
        </>
    )
}