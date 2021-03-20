import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./lib/theme";

import Dashboard from "./pages/dashboard";

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <div className="App">
        <Router>
          <Switch>
            <Route path = "/" component = {Dashboard}></Route>
          </Switch>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;