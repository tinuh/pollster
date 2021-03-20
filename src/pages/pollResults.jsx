import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import { Box } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import { getDoc } from '../lib/db';

export default function PollResults(){
    const { id } = useParams();
    const pollHasVotes = true;
    const [poll, setPoll] = React.useState(false);

    React.useEffect(() => {
        async function getInfo(){
            const pollData = await getDoc('polls', id);
            setPoll(pollData);
        }
        getInfo();
    }, [id])

    return(
        <>  
            <Heading align = "center" >Poll results</Heading>
            <Text ml="35vw" mt="1vw">Poll info:</Text>
            <Box ml="35vw" borderWidth="1px" borderRadius="lg" class="chart-container" style={{"position": "relative", "height":(pollHasVotes?"11vw":"9vw"), "width":"30vw"}}>
                <Text ml="2vw" mt="1vw">Poll name: {poll.name}</Text> 
                <Text ml="2vw" mt="1vw">Poll description: {poll.description}</Text> 
                <Text ml="2vw" mt="1vw">Poll responses: {5} </Text> 
                {pollHasVotes && <Box><Text ml="2vw" mt="1vw">Poll votes: {2} </Text></Box> }
            </Box>
            <Text ml="35vw" mt="1vw">Responses:</Text>
            <Box ml="35vw" borderWidth="1px" borderRadius="lg" class="chart-container" style={{"position": "relative", "height":"30vh", "width":"30vw", "paddingTop":".5vw", "paddingBottom":"1vw"}}>
                <Doughnut
                    data={{
                        labels: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                        datasets: [{data:[1,2,3], backgroundColor: ['red', 'blue', 'orange']}]
                    }}
                    options={{ maintainAspectRatio: false }}
                />
            </Box>
            <Text ml="35vw" mt="1vw">Location:</Text>
            <Box ml="35vw" mb="5vw" borderWidth="1px" borderRadius="lg" class="chart-container" style={{"position": "relative", "height":"30vh", "width":"30vw"}}>
                
            </Box>
        </>
    )
}
