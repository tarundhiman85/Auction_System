import React, {Component} from "react";
import {Button, ButtonGroup, Card, Table} from "react-bootstrap";
import axios from "axios";
import MyToast from "./MyToast";
import {Link} from "react-router-dom";
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
    deleteUser = (userId) => {
        axios.delete("http://localhost:8080/api/"+userId)
            .then(response => {
                this.setState({show: true});
                setTimeout(() => {
                    this.setState({show: false});
                }, 1500);
                this.findAllUsers();
            })
            .catch(function (error) {
                this.setState({show: false});
                console.log(error);
            })
    }
    render(){
        return(
            <div>
            <div style={{"display":this.state.show?"block":"none"}}>
                <MyToast children={ {show:this.state.show, message:"User Deleted successfully",type:"danger"} }/>
            </div>
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
                                                    <Link to={'/edit/'+user.id} className="btn btn-sm btn-outline-primary">EditUser</Link>

                                                    <Button variant="danger" onClick={this.deleteUser.bind(this,user.id)}>Delete</Button>
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
            </div>
        )
    }
}
export default UserList;