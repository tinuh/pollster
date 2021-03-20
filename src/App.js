import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
//import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path = "/" component = {Dashboard}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;