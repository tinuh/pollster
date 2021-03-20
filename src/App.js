import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useAuth } from './lib/auth';
import { Box } from "@chakra-ui/react";
import "./styles/App.css";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.compat.css'

// Components
import Navbar from './components/navbar';
import Footer from './components/footer';

// Pages
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Logout from "./pages/logout";
import Create from "./pages/create";
import Profile from "./pages/profilepage";
import NotFound from "./components/NotFound";
import Contact from "./pages/contact";
import PollResults from './pages/pollresults';
import Discover from './pages/discover';

function App() {
  const { user, loadingUser } = useAuth();

  return (
        <Router>
          <Box minH="100vh">
            <Navbar/>
            <ReactNotification/>
            <Switch>
              
              {/* UNRESTRICTED ROUTES */}
              <Route exact path = "/" component = {Dashboard}/>
              <Route path = "/logout" component = {Logout}/>
              <Route path = "/contact" component = {Contact}/>
              <Route path = "/discover" component = {Discover}/>

              {/* Change to /dynamic by a poll id */}
              <Route path = "/pollresults" component = {PollResults}/>

              {/* RESTRICTED ROUTES */}
              {(user && !loadingUser) && (<Route path = "/create" component = {Create}/>)}
              {(user && !loadingUser) && (<Route path = "/profile" component = {Profile}/>)}
              {(!user && !loadingUser) && (<Route path = "/login" component = {Login}/>)}
              {(!user && !loadingUser) && (<Route path = "/register" component = {Register}/>)}

              {/* NOT FOUND */}
              <Route component = {NotFound}/>
              
            </Switch>
          </Box>
          <Footer/>
        </Router>
  );
}

export default App;