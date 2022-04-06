import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";



class NavigationBar extends React.Component{
    render(){
        return(
            <div className="container">
                <Link className="navbar-brand" to={'/'}>Home</Link>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link to={'/AddUser'} className="nav-link">AddUser</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/UserList'} className="nav-link">UserList</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NavigationBar;