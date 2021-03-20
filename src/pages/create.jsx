import React, {useState} from 'react'
import {FormControl, FormLabel, Input, Textarea, Container, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {Heading, Box} from "@chakra-ui/react";
import {addDoc} from "../lib/db";
import { store } from 'react-notifications-component';

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

    async function submit(){
        setLoading(true);
        let values = form;
        values.choices = [...answers];

        if (navigator.geolocation) { //check if geolocation is available
            navigator.geolocation.getCurrentPosition(function(pos){
                values.position = [pos.coords.latitude, pos.coords.longitude];
                
            }, 
            function(error){
                setLoading(false);
                store.addNotification({
                    title: "Error",
                    message: "Location Access Unavalible or Denied!",
                    type: "danger",
                    insert: "bottom",
                    isMobile: true,
                    container: "top-right",
                    animationIn: ["animated", "flipInX"],
                    animationOut: ["animated", "flipOutX"],
                    dismiss: {
                    duration: 5000,
                    onScreen: true,
                    showIcon: true
                    },
                });
        
            });
        }

        setForm({firstName: "", description: "", question: ""});
        setAnswers([]);
        console.log(values);
        //firebase API Call
        try{
            await addDoc('polls', values);

            store.addNotification({
                title: "Success",
                message: "Poll Successfully Created!",
                type: "success",
                insert: "bottom",
                isMobile: true,
                container: "top-right",
                animationIn: ["animated", "flipInX"],
                animationOut: ["animated", "flipOutX"],
                dismiss: {
                duration: 5000,
                onScreen: true,
                showIcon: true
                },
            });
        }
        catch (error){
            store.addNotification({
                title: "Error",
                message: "Firebase API Error! Data not submitted",
                type: "danger",
                insert: "bottom",
                isMobile: true,
                container: "top-right",
                animationIn: ["animated", "flipInX"],
                animationOut: ["animated", "flipOutX"],
                dismiss: {
                duration: 5000,
                onScreen: true,
                showIcon: true
                },
            });
        }

    }

    return (
        <Box textAlign="center">
            <Container>
                <Heading as="h1">Create Poll</Heading><br/>

                <FormControl id="Pollname" isRequired>
                    <FormLabel>Poll Name</FormLabel>
                    <Input value = {form.firstName} onChange={(e) => handleChange(e, "firstName")} placeholder="Poll name" />
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
                    <Input value = {form.question} onChange={(e) => handleChange(e, "question")} placeholder="Question" />
                </FormControl><br/>

                {answers.map((answer, index) =>
                    <>
                        <FormControl id={"Choice " + (index + 1)} isRequired>
                            <FormLabel>{"Choice " + (index + 1)}</FormLabel><FontAwesomeIcon style = {{display:"inline", textAlign: "right", padding: "none"}} className = "deleteIcon" onClick = {() => removeChoice(index)} icon={faTimes}/>
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
