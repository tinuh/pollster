import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "./lib/theme";
import { AuthProvider } from './lib/auth';

// Components
import Navbar from './components/navbar';
import Footer from './components/footer';

// Pages
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Logout from "./pages/logout";
import Create from "./pages/create";
import NotFound from "./components/NotFound";

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <AuthProvider>
        <Router>
          <Box minH="100vh">
            <Navbar/>
            <Switch>
              <Route exact path = "/" component = {Dashboard}/>
              <Route path = "/login" component = {Login}/>
              <Route path = "/register" component = {Register}/>
              <Route path = "/logout" component = {Logout}/>
              <Route path = "/create" component = {Create}/>
              <Route component = {NotFound}/>
            </Switch>
          </Box>
          <Footer/>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;