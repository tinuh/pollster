import React from 'react';
import { Box } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react";
import Poll from "../components/poll";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

export default function Profile(props){

    const [edit, setEdit] = React.useState(false);
    const [displayName, setDisplayName] = React.useState('example'); //get from firebase
    const [desc, setDesc] = React.useState("Example description... blah blah");
    const [showIconModal, setShowIconModal] = React.useState(false);
    const [pfpLink, setPfpLink] = React.useState('');
    const toast = useToast()

    function saveData(){
        setEdit(false);
    }

    function savePfpLink(){
        setShowIconModal(false); // and save it to firebase
    }

    function handleDispChange(e){
        if (e.target.value.length < 18){
            setDisplayName(e.target.value);
        }
        else{
            toast({
                title: "Display name can only be 12 characters long",
                status: "error",
                isClosable: true,
              })
        }
    }

    function handleDescChange(e){
        setDesc(e.target.value);
    }

    return (
        <Box mt="2vw">

            <Modal isOpen={showIconModal} onClose={()=>setShowIconModal(false)}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{/*props.data.pollname*/}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/*props.data.form*/}
                    <Input placeholder="link to profile pic" value={pfpLink} onChange={(e)=>setPfpLink(e.target.value)} />
                </ModalBody>
    
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={savePfpLink}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Heading ml="34%">Your Profile</Heading>
            <Grid
                borderWidth="1px" borderRadius="lg" overflow="hidden"
                templateRows="repeat(3, 10fr)"
                templateColumns="repeat(5, 20fr)"
                gap={1}
                h="15vw"
                w="37vw"
                m="auto"
                mt="1vw"
            >
                <GridItem rowSpan={2} colSpan={2}>
                    <Avatar size="2xl" src="" mt="2vw" ml="4vw" onClick={()=>setShowIconModal(true)} />
                </GridItem>
                <GridItem rowSpan={1} colSpan={3} mt="2vw">
                    <div style={{"display":"inline-flex"}}>
                        <Text>Display&nbsp;name: </Text><Textarea value={displayName} ml="2vw" rows="1" disabled={!edit} onChange={(e)=>handleDispChange(e)} />
                    </div>
                </GridItem>
                <GridItem rowSpan={1} colSpan={3}>
                    <div style={{"display":"inline-flex"}}>
                        <Text> Description: </Text><Textarea ml="2.8vw" value={desc} rows="3" disabled={!edit} onChange={(e)=>handleDescChange(e)} />
                    </div>
                </GridItem>
                <GridItem colSpan={1}>
                    <Button colorScheme="blue" ml="4vw" mt="1vw" onClick={()=>setEdit(true)}>Edit</Button>
                </GridItem>
                <GridItem colSpan={3}></GridItem>
                <GridItem colSpan={1}>
                    <Button colorScheme="blue" mt="1vw"  onClick={saveData}>Save</Button>
                </GridItem>
            </Grid>
            <Text ml="32%" mt="2vw"><b>Your polls:</b></Text>
            <Box ml="31vw" mt=".5vw" w="37vw" style={{"overflowX":"scroll", "whiteSpace": "nowrap", "display":"inline-flex"}}>
                <Poll /><Box ml="1vw"></Box><Poll /><Box ml="1vw"></Box><Poll />
            </Box>
        </Box>
    )
}