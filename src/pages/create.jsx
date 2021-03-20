import React, {useState} from 'react'
import {FormControl, FormLabel, Input, Textarea, Container, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {Heading, Box} from "@chakra-ui/react";
import {addDoc} from "../lib/db";
import { store } from 'react-notifications-component';
import firebase from 'firebase/app';
import { Checkbox } from "@chakra-ui/react";

export default function Create() {
    let [form, setForm] = useState({
        name: "",
        description: "",
        question: "",
    })
    let [loading, setLoading] = useState(false);
    let [answers, setAnswers] = useState([]);
    let [multiple, setMultiple] = useState(false);


    let handleChange = (e, param) => {
        if (param==="name") {
            setForm({name: e.target.value, description: form.description, question: form.question});
        }
        else if (param === "description"){
            setForm({name: form.name, description: e.target.value, question: form.question})
        }
        else {
            setForm({name: form.name, description: form.description, question: e.target.value});
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

    let submit = async() =>{
        setLoading(true);
        let values = form;
        values.choices = [...answers];
        values.selectMultiple = multiple;
        values.type = "multpleChoice";

        if (navigator.geolocation) { //check if geolocation is available
            await navigator.geolocation.getCurrentPosition(function(pos){
                values.location = new firebase.firestore.GeoPoint(pos.coords.latitude, pos.coords.longitude);
                
                try{
                    console.log(values);
                    addDoc('polls', values);
        
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
        
                    setForm({name: "", description: "", question: ""});
                    setAnswers([]);
                    //console.log(values);
        
                    setLoading(false);
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
        
            })
        }
    }

    return (
        <Box textAlign="center">
            <Container>
                <Heading as="h1">Create Poll</Heading><br/>

                <FormControl id="name" isRequired>
                    <FormLabel>Poll Name</FormLabel>
                    <Input value = {form.name} onChange={(e) => handleChange(e, "name")} placeholder="Poll name" />
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
                            <FormLabel><FontAwesomeIcon style = {{display:"inline", textAlign: "right", padding: "none"}} className = "deleteIcon" onClick = {() => removeChoice(index)} icon={faTimes}/> &nbsp; {"Choice " + (index + 1)}</FormLabel>
                            
                            
                            <Input value = {answer} onChange={(e) => handleQuestion(e, index)} placeholder={"Choice " + (index + 1)} />
                        </FormControl>
                        <br/>
                    </>
                )}
                

                <Checkbox value = {multiple} onChange = {() => setMultiple(!multiple)}>Choose Multiple?</Checkbox><br/><br/>

                <Button colorScheme="green"  onClick = {addChoice} disabled = {loading}>Add Choice</Button> &nbsp;
                <Button colorScheme="blue" onClick = {submit} disabled = {loading}>Submit</Button><br/><br/>
            </Container>

        </Box>
    )
}
