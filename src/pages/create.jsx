import React, {useState, useRef} from 'react'
import {FormControl, FormLabel, Input, Textarea, Container, Button, ButtonGroup } from "@chakra-ui/react";
import { faPooStorm } from '@fortawesome/free-solid-svg-icons';

export default function Create() {
    let [form, setForm] = React.useState({
        firstName: "",
        description: ""
    })

    let handleChange = (e, param) => {
        param === "firstName" ? setForm({firstName: e.target.value, description: form.description}) : setForm({firstName: form.firstName, description: e.target.value})
    }

    return (
        <div>
            <Container>
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

                <center><Button colorScheme="blue">Submit</Button></center><br/><br/>
            </Container>

        </div>
    )
}
