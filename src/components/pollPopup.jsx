import React from 'react';

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, HStack, Radio, RadioGroup, Checkbox, CheckboxGroup, Button} from "@chakra-ui/react";

export default function Pollpopup(props){

    const [ open, setOpen ] = React.useState(true);
    const canViewPollResults = true; //get from db somehow
    const [formOptions, setForm] = React.useState([{'name':'option1', 'selected':false}, {'name':'option2', 'selected':false}, {'name':'option3', 'selected':false}, {'name':'option4', 'selected':false}]);
    const checkboxes = true;

    function handleClose(){
        props.set(false);
        setOpen(false);
    }

    function handleClick(e){
        if (checkboxes){
            const changedOption = formOptions.filter(option=>option.name===e.target.value)[0]
            setForm(formOptions.map(option=>({"name":option.name, "selected":option.name==changedOption.name?!changedOption.selected:option.selected})))
        }
        else{
            setForm(formOptions.map(option=>({"name":option.name, "selected":option.name==e.target.value?true:false}))) //make them all unclicked
        }
    }

    function handleSubmit(){
        handleClose();
        //Send the form options state here, has which options the user picked
    }

    return (
        <Modal isOpen={open} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Example Form Name{/*props.data.pollname*/}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {/*props.data.form*/}
                <FormControl as="fieldset">
                    {!checkboxes?
                    <RadioGroup>
                        <HStack spacing="24px">
                            {formOptions.map(option=><Radio value={option.name} isChecked={option.selected} onChange={(e)=>handleClick(e)}>{option.name}</Radio>)}
                        </HStack>
                    </RadioGroup>
                    :
                    <CheckboxGroup>
                        <HStack spacing="24px">
                            {formOptions.map(option=><Checkbox value={option.name} isChecked={option.selected} onChange={(e)=>handleClick(e)}>{option.name}</Checkbox>)}
                        </HStack>
                    </CheckboxGroup >}
                    
                </FormControl>
            </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Submit
                    </Button>
                    { canViewPollResults && <Button colorScheme="red" mr={3} onClick={handleClose}>
                        View Poll results
                    </Button>}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}