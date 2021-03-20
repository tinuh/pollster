import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./lib/theme";

//Components
import Dashboard from "./pages/dashboard";
import Create from "./pages/create";

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <div className="App">
        <Router>
          <Switch>
            <Route path = "/" component = {Dashboard}></Route>
            <Route path = "/create" component = {Create}></Route>
          </Switch>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;