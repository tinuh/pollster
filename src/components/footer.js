import React from 'react';

import {
  Box,
  Flex,
  Stack,
  Text,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

import Link from './link';
import ColorModeToggle from './colormodetoggle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function FooterComponent() {
  return (
    <Flex p={4}  as="footer"
      justify="space-between" direction={{ base: "column", md: "row" }}
      bg="brand.800" color="white"
    >
      <Flex align="center" direction={{ base: "column", md: "row" }}>
        <Text m={2} color="gray.400">&copy; 2021 Pollster</Text>
        <Stack m={2} spacing={3} direction="row" align="center">
          <Link href="/contact">Contact us</Link>
          <Link href="/reportissue">Report issue</Link>
        </Stack>
      </Flex>
      <Stack m={2} spacing={4} direction="row" justify="center" align="center">
        <ColorModeToggle color={useColorModeValue("brand.700", "white")}/>
        <Link href="https://github.com/tinuh/pollster" tooltip="View on GitHub">
          <FontAwesomeIcon icon={faGithub}/>
        </Link>
      </Stack>
    </Flex>
  )
}