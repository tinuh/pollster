import React, {useState} from 'react'
import {FormControl, FormLabel, Input, Textarea, Container, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {Heading, Box} from "@chakra-ui/react";

export default function Create() {
    let [form, setForm] = useState({
        firstName: "",
        description: "",
        question: "",
    })
    let [loading, setLoading] = useState(false);
    let [answers, setAnswers] = useState([]);


    let handleChange = (e, param) => {
        if (param==="firstName") {
            setForm({firstName: e.target.value, description: form.description, question: form.question});
        }
        else if (param === "description"){
            setForm({firstName: form.firstName, description: e.target.value, question: form.question})
        }
        else {
            setForm({firstName: form.firstName, description: form.description, question: e.target.value});
        }
    }
    
    let handleQuestion = (e, num) => {
        let mutable = [...answers];
        mutable[num] = e.target.value;
        setAnswers(mutable);
    }

    let removeChoice = (num) => {
        let mutable = [...answers];
        console.log(num);
        mutable.splice(num, 1);
        setAnswers(mutable);
    }

    let addChoice = () => {
        setAnswers([...answers, ""]);
    }

    let submit = () => {
        setLoading(true);
        //let values = form;
        setForm({firstName: "", description: "", question: ""});

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
                <FormControl id="question" isRequired>
                    <FormLabel>Question</FormLabel>
                    <Input value = {form.question} onChange={(e) => handleChange(e, "question")} placeholder="First name" />
                </FormControl><br/>

                {answers.map((answer, index) =>
                    <>
                        <FormControl id={"Choice " + (index + 1)} isRequired><FontAwesomeIcon onClick = {() => removeChoice(index)} icon={faTimes}/>
                            <FormLabel>{"Choice " + (index + 1)}</FormLabel>
                            <Input value = {answer} onChange={(e) => handleQuestion(e, index)} placeholder={"Choice " + (index + 1)} />
                        </FormControl>
                        <br/>
                    </>
                )}
                <Button colorScheme="red" size = "sm" onClick = {addChoice} disabled = {loading}>Add Choice</Button><br/><br/><br/>

                <Button colorScheme="blue" onClick = {submit} disabled = {loading}>Submit</Button><br/><br/>
            </Container>

        </Box>
    )
}
