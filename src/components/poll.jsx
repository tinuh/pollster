import React from 'react';

export default function Poll(props){

    return (
        <Box>
            <Box>
                <ChevronUpIcon /> {props.upvotes} <ChevronDownIcon />
            </Box>
            <Heading> {props.pollName} </Heading>
            <Text> {props.pollDescription} </Text>
        </Box>
    )
}