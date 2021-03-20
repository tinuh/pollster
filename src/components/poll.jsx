import React from 'react';
import { Box } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react"

import Pollpopup from './pollPopup';

export default function Poll(props){

    const [showModal, setShowModal] = React.useState(false);
    const [votes, setVotes] = React.useState(5); //replce with prop
    const [hasVoted, setVoted] = React.useState('');

    function upVote(){
        if (hasVoted==='down'){
            setVotes(votes+2);
            setVoted('up');
        }
        else if (hasVoted===''){
            setVotes(votes+1);
            setVoted('up');
        }
        else{
            setVotes(votes-1);
            setVoted('')
        }
    }

    function downVote(){
        if (hasVoted==='up'){
            setVotes(votes-2);
            setVoted('down');
        }
        else if (hasVoted===''){
            setVotes(votes-1);
            setVoted('down');
        }
        else{
            setVotes(votes+1);
            setVoted('')
        }
    }

    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" w="17vw" h="10vw">
            <Grid
                w="27vw"
                h="190px"
                templateRows="repeat(3, .3fr)"
                templateColumns="repeat(5, .1fr)"
                gap={4}
                ml="2px"
                mr={0}
                mb={0}
                >    
                <GridItem rowSpan={2} colSpan={1} ml="2vw" mt=".7vw">
                    <ChevronUpIcon onClick={upVote} color={hasVoted==="up" && "green"} /> <Text>{votes}{/*props.upvotes*/}</Text> <ChevronDownIcon onClick={downVote} color={hasVoted==="down" && "red"} />
                </GridItem>
                <GridItem colSpan={4} mt="1.1vw">
                    <Heading as="h6" size="md"> Poll title {/*props.pollName*/} </Heading>
                </GridItem>
                <GridItem colSpan={4} mt="-.4vw" size="xs">
                    <Text> Basic poll description {/*props.pollDescription*/} </Text>
                </GridItem>
                <GridItem colSpan={5} ml="1.2vw" mt="1vw">
                    <Button colorScheme="blue" onClick={()=>setShowModal(true)} isFullWidth={true}>Open Poll</Button>
                </GridItem>
            </Grid>
            {showModal && <Pollpopup data={props.popupInfo} set={setShowModal} />}
        </Box>
    )
}