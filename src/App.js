import logo from './logo.svg';
import './App.css';
import NavigationBar from "./Components/NavigationBar";
import {Button, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import Welcome from "./Components/Welcome";
import React from "react";
import Footer from "./Components/Footer";
import UserList from "./Components/UserList";
import User from "./Components/User";
import {BrowserRouter , Route, Link, Switch} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavigationBar/>
                <div className="container">
                    <div className="auth-wrapper">
                        <Switch>
                            <Route exact path="/" component={Welcome}/>
                            <Route exact path="/AddUser" component={User}/>
                            <Route exact path="/edit/:id" component={User}/>
                            <Route exact path="/UserList" component={UserList}/>
                        </Switch>
                        {/*<Home/>*/}
                    </div>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;