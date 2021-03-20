import React from 'react';
import { Link } from 'react-router-dom';
import publicIp from 'public-ip';

import initFirebase from '../lib/firebase';
import { addSubDoc } from '../lib/db';

import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    FormControl, 
    HStack, 
    Radio, 
    RadioGroup, 
    Checkbox, 
    CheckboxGroup, 
    Button,
    Input,
} from "@chakra-ui/react";

export default function PollPopup(props){
    initFirebase();

    const [ open, setOpen ] = React.useState(true);
    const canViewPollResults = true; // always visible for now
    const [formOptions, setForm] = React.useState(props.data.choices?.map(choice=>({'name':choice, 'selected':false})));
    const [inputValue, setInputValue] = React.useState("");
    const checkboxes = props.data.selectMultiple;
    const type = props.data.type;

    function handleClose(){
        props.set(false);
        setOpen(false);
    }

    function handleClick(e){
        if (type === 'multipleChoice' && checkboxes) {
            const changedOption = formOptions.filter(option=>option.name===e.target.value)[0]
            setForm(formOptions.map(option=>({"name":option.name, "selected":option.name===changedOption.name?!changedOption.selected:option.selected})))
        } else if (type === 'multipleChoice' && !checkboxes) {
            setForm(formOptions.map(option=>({"name":option.name, "selected":option.name===e.target.value?true:false}))) //make them all unclicked
        }
    }

    async function handleSubmit(){
        handleClose();
        //Send the form options state here, has which options the user picked
        const answer = type === 'multipleChoice' ? formOptions.map(answer => answer.selected) : inputValue;
        const ip = await publicIp.v4({
            fallbackUrls: ['https://ifconfig.co/ip']
        });
        await addSubDoc('polls', props.data.id, 'responses', {
            ip: ip,
            answer
        });
    }


    return (
        <Modal isOpen={open} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{props.data.question}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {/*props.data.form*/}
                <FormControl as="fieldset">
                    {type === 'multipleChoice' ?
                        checkboxes ? 
                            /* CHECKBOX */
                            <CheckboxGroup>
                                <HStack spacing="24px">
                                    {formOptions.map(option=><Checkbox value={option.name} isChecked={option.selected} onChange={(e)=>handleClick(e)}>{option.name}</Checkbox>)}
                                </HStack>
                            </CheckboxGroup >
                        :
                        /* RADIO GROUP */
                        <RadioGroup>
                            <HStack spacing="24px">
                                {formOptions.map(option=><Radio value={option.name} isChecked={option.selected} onChange={(e)=>handleClick(e)}>{option.name}</Radio>)}
                            </HStack>
                        </RadioGroup>
                    :
                        /* INPUT */
                        <Input value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                    }
                    
                </FormControl>
            </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Submit
                    </Button>
                    { canViewPollResults && <Link to={`poll/${props.data.id}`} ><Button colorScheme="red" mr={3} onClick={handleClose}>
                        View Poll results
                    </Button></Link>}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}