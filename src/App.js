import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


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
import { useAuth } from './lib/auth';
import {Box} from "@chakra-ui/react";

function App() {
  const { user, loadingUser } = useAuth();

  return (
        <Router>
          <Box minH="100vh">
            <Navbar/>
            <Switch>
              
              //Put Unrestricted Routes Here
              <Route exact path = "/" component = {Dashboard}/>
              <Route path = "/login" component = {Login}/>
              <Route path = "/register" component = {Register}/>
              <Route path = "/logout" component = {Logout}/>

              {(user && !loadingUser) &&
                //Put restricted Routes Here
                <Route path = "/create" component = {Create}/>
              }

              <Route component = {NotFound}/>
            </Switch>
          </Box>
          <Footer/>
        </Router>
  );
}

export default App;