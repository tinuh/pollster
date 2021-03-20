import React from 'react';

import {
    Box,
    Heading,
} from "@chakra-ui/react";

import Navbar from '../components/navbar';
import Poll from '../components/poll';

export default function Dashboard() {
    return (
        <>
            <Navbar/>
            <Box align="center">
                <Heading as="h1">Pollster</Heading>
                <Poll />
            </Box>
        </>
    )
}
