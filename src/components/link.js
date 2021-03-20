import React from 'react';

import {
  Link as ChakraLink,
  Tooltip,
} from '@chakra-ui/react';

export default function Link(props) {
  const { children, tooltip, noUnderline, ...rest } = props;

  return (
    <>
      {tooltip ? 
        <Tooltip label={tooltip}>
          <ChakraLink style={ noUnderline ? { textDecoration: "none" } : {}} {...rest}>
            {children}
          </ChakraLink>
        </Tooltip> 
      : 
        <ChakraLink style={ noUnderline ? { textDecoration: "none" } : {}} {...rest}>
          {children}
        </ChakraLink>
      }
    </>
  )
}