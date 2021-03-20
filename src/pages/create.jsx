import React, {useState, useRef} from 'react'
import {FormControl, FormLabel, Input} from "@chakra-ui/react";

export default function Create() {
    return (
        <div>
            <FormControl id="first-name" isRequired>
                <FormLabel>Poll Name</FormLabel>
                <Input placeholder="First name" />
            </FormControl>
        </div>
    )
}
