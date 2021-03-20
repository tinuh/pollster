import { Button, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'
import { PasswordField } from './PasswordField'

export const RegisterForm = (props) => {
  return (
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input value={props.email} onChange={e => props.setEmail(e.target.value)} name="email" type="email" autoComplete="email" required />
        </FormControl>
        <PasswordField password = {props.password} setPassword = {props.setPassword} />
        {props.message !== '' && <Text color="red">{props.message}</Text>}
        <PasswordField label="Confirm Password" password = {props.password2} setPassword = {props.setPassword2} />
        {props.message !== '' && <Text color="red">{props.message}</Text>}
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md" onClick = {props.signUp}>
          Register
        </Button>
      </Stack>

  )
}