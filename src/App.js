import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useAuth } from './lib/auth';
import { Box } from "@chakra-ui/react";
import "./styles/App.css";
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
import Profile from "./pages/profilePage";
import NotFound from "./pages/notFound";
import ReportIssue from "./pages/reportIssue";
import Contact from "./pages/contact";
import PollResults from './pages/pollResults';
import Discover from './pages/discover';
import Homepage from './pages/homePage';

function App() {
  const { user, loadingUser } = useAuth();

  return (
        <Router>
          <Box minH="100vh">
            <Navbar/>
            <Switch>
              
              <Route exact path = "/" component = {user?Dashboard:Homepage}/>
              <Route path = "/discover" component = {Discover}/>
              <Route path = "/create" component = {Create}/>
              <Route exact path = "/profile" component = {Profile}/>
              <Route path = "/contact" component = {Contact}/>
              <Route path = "/reportissue" component = {ReportIssue}/>

              {/* AUTH */}
              <Route path = "/login" component = {Login}/>
              <Route path = "/register" component = {Register}/>
              <Route path = "/logout" component = {Logout}/>

              {/* Change to /dynamic by a poll id */}
              <Route path = "/pollresults" component = {PollResults}/>

              {/* NOT FOUND */}
              <Route component = {NotFound}/>
              
            </Switch>
          </Box>
          <Footer/>
        </Router>
  );
}

export default App;