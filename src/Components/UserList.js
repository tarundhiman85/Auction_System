import React, {Component} from "react";
import {Button, ButtonGroup, Card, Table} from "react-bootstrap";
import axios from "axios";
class UserList extends Component{

    constructor(props) {
        super(props);
        this.state={
            Users:[]
        };
    }
    componentDidMount() {
     this.findAllUsers();
    }
    findAllUsers() {
        axios.get("http://localhost:8080/api")
            .then(response => {
                this.setState({Users: response.data})
                //     console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render(){
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <h3>User List</h3>
                </Card.Header>
                <Card.Body>
                    <Table>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>User id</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.Users.length > 0 ? (
                                this.state.Users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>
                                                <ButtonGroup>
                                                    <Button variant="primary">Edit</Button>
                                                    <Button variant="danger">Delete</Button>
                                                </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3}>No users</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Table>
                </Card.Body>
            </Card>
        )
    }
}
export default UserList;