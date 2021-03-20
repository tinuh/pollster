import React from 'react';

import initFirebase from '../lib/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from '../lib/auth';

import {
  Container,
  Box,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Center,
} from '@chakra-ui/react';
import Link from '../components/link';

export default function RegisterPage() {
  initFirebase();
  const { user, loadingUser } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (user && !loadingUser) window.location.href = '/dashboard';
  }, [user, loadingUser]);

  async function signUp() {
    if (password !== password2) return setMessage('Passwords don\'t match');
    await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function() {
      window.location.href = '/dashboard';
    })
    .catch(function(err) {
      setMessage(err.message);
    });
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  }

  return (
    <Container maxW="container.sm" p={8}>
      <Box as='form' onSubmit={e => e.preventDefault()} autoComplete="off">
        <Stack spacing={4}>
          <Heading as="h2" size="xl">Register</Heading>
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
          <Input  value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder="Password"/>
          <Input  value={password2} onChange={e => setPassword2(e.target.value)} type='password' placeholder="Confirm Password"/>
          {message !== '' ? <Text color="red">{message}</Text> : null}
          <Button colorScheme="blue" onClick={signUp} type="submit">Submit</Button>

          <Text align="center">Already have an account? <Link href="/login" color="brand.500">Login</Link></Text>

          <Stack direction="row" spacing={2} justify="center" py={2}>
            <Center>or</Center>
            <Button colorScheme="gray" onClick={signInWithGoogle}>Sign up with Google</Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}