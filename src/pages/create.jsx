import React, {useState} from 'react'
import {FormControl, FormLabel, Input, Textarea, Container, Button } from "@chakra-ui/react";
//import { faPooStorm } from '@fortawesome/free-solid-svg-icons';
import {Heading, Box} from "@chakra-ui/react";

export default function Create() {
    let [form, setForm] = useState({
        firstName: "",
        description: ""
    })
    let [loading, setLoading] = useState(false);

    let handleChange = (e, param) => {
        param === "firstName" ? setForm({firstName: e.target.value, description: form.description}) : setForm({firstName: form.firstName, description: e.target.value})
    }

    let submit = () => {
        setLoading(true);
        //let values = form;
        setForm({firstName: "", description: ""});

        //Put firebase API Call
    }

    return (
        <Box textAlign="center">
            <Container>
                <Heading as="h1">Create Poll</Heading><br/>

                <FormControl id="first-name" isRequired>
                    <FormLabel>Poll Name</FormLabel>
                    <Input value = {form.firstName} onChange={(e) => handleChange(e, "firstName")} placeholder="First name" />
                </FormControl><br/>
                <FormControl id="description" isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        value={form.description}
                        onChange={(e) => handleChange(e, "description")}
                        placeholder="Enter your description here"
                        size="sm"
                    />
                </FormControl><br/>

                <Button colorScheme="blue" onClick = {submit} disabled = {loading}>Submit</Button><br/><br/>
            </Container>

        </Box>
    )
}
