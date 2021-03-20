import React from 'react';

import initFirebase from '../lib/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from '../lib/auth';
import {LoginForm} from "../components/loginForm";
import {DividerWithText} from '../components/dividerWithText';
//import {PasswordField} from "../components/PasswordField";
import { FaGoogle } from 'react-icons/fa';

import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  useColorModeValue as mode,
  VisuallyHidden,
} from '@chakra-ui/react';
import Link from '../components/link';

export default function LoginPage() {
  initFirebase();
  const { user, loadingUser } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (user && !loadingUser) window.location.href = '/';
  }, [user, loadingUser]);

  async function signIn() {
    await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = '/';
    })
    .catch(function(err) {
      setMessage(err.message);
    });
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithRedirect(provider)
    .then(() => {
      // TODO: add user doc
      window.location.href = '/';
    })
    .catch(function(err) {
      setMessage(err.message);
    });;
  }

  if (!loadingUser && !user) return (
    <Container maxW="container.sm" p={8}>
      {/* <Box as='form' onSubmit={e => e.preventDefault()} autoComplete="off">
        <Stack spacing={4} justify="center">
          <Heading as="h2" size="xl">Login</Heading>
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
          <Input  value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder="Password"/>
          {message !== '' && <Text color="red">{message}</Text>}
          <Button colorScheme="blue" onClick={signIn} type="submit">Submit</Button>

          <Text align="center">Don't have an account? <Link href="/register" color="brand.500">Register</Link></Text>

          <Stack direction="row" spacing={2} justify="center" py={2}>
            <Center>or</Center>
            <Button colorScheme="gray" onClick={signInWithGoogle}>Sign in with Google</Button>
          </Stack>
        </Stack>
      </Box> */}

      <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
      <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
        <Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
          Log in to your account
        </Heading>
        <Text mt="4" align="center" maxW="md" fontWeight="medium">
          <span>Don&apos;t have an account?</span>
          <Box
            as="a"
            marginStart="1"
            href="#"
            color={mode('blue.600', 'blue.200')}
            _hover={{ color: 'blue.600' }}
            display={{ base: 'block', sm: 'revert' }}
          >
            <Link href="/register" color="brand.500">Register</Link>
          </Box>
        </Text>
      </Box>
      <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
        <Box
          bg={mode('white', 'gray.700')}
          py="8"
          px={{ base: '4', md: '10' }}
          shadow="base"
          rounded={{ sm: 'lg' }}
        >
          <LoginForm signInMethod = {signIn} email = {email} setEmail = {setEmail} signIn = {signIn} message = {message} password = {password} setPassword = {setPassword}/>
          <DividerWithText mt="6">or continue with</DividerWithText>
          <SimpleGrid mt="6" columns={1} spacing="3">
            <Button onClick={signInWithGoogle} color="currentColor" variant="outline">
              <VisuallyHidden>Login with Google</VisuallyHidden>
              <FaGoogle/>
            </Button>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
    </Container>
  );
  
  // Prevents flashing page when logged in
  return (<></>); // TODO: add loading page
}