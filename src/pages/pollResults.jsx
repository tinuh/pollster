import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import { Box, useToast } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import { getDoc, getUserFromRef, getSubDoc, getSubCol } from '../lib/db';
import {Link} from 'react-router-dom';
import { Map, Marker } from 'pigeon-maps';

export default function PollResults(){
    const { id } = useParams();
    const toast = useToast();
    const pollHasVotes = true;
    const [poll, setPoll] = React.useState(false);
    const [user, setUser] = React.useState(false);
    const [responses, setResponses] = React.useState(false);
    const getProvider = (x, y, z) => `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;

    React.useEffect(() => {
        async function getInfo(){
            try{
                const pollData = await getDoc('polls', id);
                const userData = await getUserFromRef(pollData.author);
                setPoll(pollData);
                setUser(userData);
            }
            catch {
                await toast({
                    title: "Error",
                    description: "Poll does not exist!",
                    status: "error",
                    isClosable: true
                });
            }

            try{
                const responsesData = await getSubCol("polls", id, "responses");
                setResponses(responsesData);
            }
            catch{

            }
            
        }
        getInfo();
    }, [id, toast])

    return(user ? (
        <>  
            <Heading align = "center" >Poll results</Heading>
            <Text ml="35vw" mt="1vw">Poll info:</Text>
            <Box ml="35vw" borderWidth="1px" borderRadius="lg" className="chart-container" style={{"position": "relative", "height":(pollHasVotes?"13vw":"11vw"), "width":"30vw"}}>
                <Text ml="2vw" mt="1vw">Name: {poll.name}</Text> 
                <Text ml="2vw" mt="1vw">Author: <Link to = {"/profile/" + user.id}>{user.displayName}</Link> </Text>
                <Text ml="2vw" mt="1vw">Description: {poll.description}</Text> 
                <Text ml="2vw" mt="1vw">Responses: {responses ? responses.length : 0} </Text> 
                {/* {pollHasVotes && <Box><Text ml="2vw" mt="1vw">Poll votes: {2} </Text></Box> } */}
            </Box>
            <Text ml="35vw" mt="1vw">Responses:</Text>
            <Box ml="35vw" borderWidth="1px" borderRadius="lg" className="chart-container" style={{"position": "relative", "height":"30vh", "width":"30vw", "paddingTop":".5vw", "paddingBottom":"1vw"}}>
                <Doughnut
                    data={{
                        labels: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                        datasets: [{data:[1,2,3], backgroundColor: ['red', 'blue', 'orange']}]
                    }}
                    options={{ maintainAspectRatio: false }}
                />
            </Box>
            <Text ml="35vw" mt="1vw">Location:</Text>
            <Box ml="35vw" mb="5vw" borderWidth="1px" borderRadius="lg" className="chart-container" style={{"position": "relative", "height":"30vh", "width":"30vw"}}>
                <Map defaultCenter={[poll.location._lat, poll.location._long]} defaultZoom={12} width="100%" height="100%" provider={getProvider}>
                    <Marker anchor={[poll.location._lat, poll.location._long]}  width={50} height={50} />
                </Map>
            </Box>
        </>
    ) : (<Heading align = "center">Loading...</Heading>))
}
