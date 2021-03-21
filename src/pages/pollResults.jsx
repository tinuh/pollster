import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import { 
    Box, 
    useToast,
    Heading,
    Text,
    Container,
    Stack,
    Center,
} from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import { getDoc, getUserFromRef, getSubCol } from '../lib/db';
import { Link } from 'react-router-dom';
import { Map, Marker } from 'pigeon-maps';

export default function PollResults(){
    const { id } = useParams();
    const toast = useToast();
    const pollHasVotes = false;
    const [poll, setPoll] = React.useState(false);
    const [user, setUser] = React.useState(false);
    const [responses, setResponses] = React.useState([]);
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
        <Container maxW="container.sm">
            <Heading as="h1" m={12} align="center">Poll Info</Heading>
            <Stack direction="column" spacing={8} mb={8}>
                <Box p={4} borderWidth="1px" borderRadius="lg" lineHeight={2}>
                    <Text>Name: {poll.name}</Text> 
                    <Text>Author: <Link to={"/profile/" + user.id}>{user.displayName}</Link></Text>
                    <Text>Description: {poll.description}</Text> 
                    <Text>Responses: {responses.length} </Text> 
                    {pollHasVotes && <Text>Poll votes: {2}</Text>}
                </Box>
                <Box p={8} borderWidth="1px" borderRadius="lg">
                    <Heading as="h2" size="md" mb={4} align="center">Responses</Heading>
                    <Box>
                        {poll.type === 'multipleChoice' ?
                            <Doughnut
                                data={{
                                    labels: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                                    datasets: [{data:[1,2,3], backgroundColor: ['red', 'blue', 'orange']}]
                                }}
                                options={{ maintainAspectRatio: false }}
                            />
                        :
                            <Stack direction="column" spacing={2} maxH="100vh" overflow="auto">
                                {responses.map(res =>
                                    <Box m={1} py={4} px={6} borderWidth="1px" borderRadius="lg">
                                        {res.answer}
                                    </Box>
                                )}
                            </Stack>
                        }
                    </Box>
                </Box>
                <Box borderWidth="1px" borderRadius="lg" h="40vh">
                    <Map defaultCenter={[poll.location._lat, poll.location._long]} defaultZoom={12} width="100%" height="100%" provider={getProvider}>
                        <Marker anchor={[poll.location._lat, poll.location._long]}  width={50} height={50} />
                    </Map>
                </Box>
            </Stack>
        </Container>
    ) : (
        <Container maxW="container.sm" p={8}>
            <Center>
                <Text>Loading...</Text>
            </Center>
        </Container>
  ))
}
