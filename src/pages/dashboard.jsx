import React from 'react';

import {
    Box,
    Heading,
} from "@chakra-ui/react";

import Poll from '../components/poll';

export default function Dashboard() {
    return (
        <>
            <Box align="center">
                <Heading as="h1">Pollster</Heading>
                <Poll pollvoting={true} />
            </Box>
        </>
    )
}
