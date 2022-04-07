import React, {Component} from "react";
import {Button, Card, Form} from "react-bootstrap";
import axios from "axios";
import MyToast from "./MyToast";
class User extends Component{
    //props are single value object that are passed to react components
    //state is a mutable object that can be changed

    constructor(props) {
        super(props);
        //react component has a build in state object where you store property values
        //when state object changes the component renders
        this.state =this.initialState;
        this.state.show = false;
        this.nameChangeF= this.nameChangeF.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.nameChangeL= this.nameChangeL.bind(this);
        this.nameChangeP = this.nameChangeP.bind(this);
        this.nameChangeCP = this.nameChangeCP.bind(this);
        this.submitUser = this.submitUser.bind(this);

    }
    initialState = {
        id:"",
        email: "",
        password: "",
        firstName:"",
        lastName:"",
        confirmPassword:""
    };
    componentDidMount() {
        //getting the id from the url
        const userId = +this.props.match.params.id;
        if(userId) {
          //if id is present then we are editing the user
            this.findUserById(userId);
        }
    }
    findUserById = (userId) =>{
        axios.get("http://localhost:8080/api/"+userId)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    password: response.data.password,
                    confirmPassword: response.data.confirmPassword
                });
            }).catch(error => {
            console.log(error);
        });
    }
    updateUser = (e) =>{
        e.preventDefault()
        const user = {
            id: this.state.id,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        axios.put("http://localhost:8080/api/edit/"+this.state.id, user)
            .then(response => {
                this.setState(this.initialState);
                this.props.history.push("/UserList");
            }).catch(error => {
            console.log(error);
        });
    }

    resetUser = () => {
        this.setState(this.initialState);
    };

    submitUser(event){
        event.preventDefault();
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        console.log(user);
        axios.post("http://localhost:8080/api/save", user)
            .then(response => {
                console.log(response);
                this.setState({show: true});
                setTimeout(() => {
                    this.setState({show: false});
                }, 1500);
            })
            .catch(error => {
                this.setState({show: false});
                alert(error);
            });
        this.resetUser();
    }
    emailChange(event){
        this.setState({email: event.target.value});
    }
    nameChangeF(event){
        this.setState({firstName: event.target.value});
    }
    nameChangeL(event){
        this.setState({lastName: event.target.value});
    }
    nameChangeP(event){
        this.setState({password: event.target.value});
    }
    nameChangeCP(event){
        this.setState({confirmPassword: event.target.value});
    }

    userList = () =>{
        return this.props.history.push('/UserList');
    }

    render(){
        // const {email, password, firstName, lastName, confirmPassword} = this.state;
        return(
            <div>

                <div style={{"display":this.state.show?"block":"none"}}>
                    <MyToast children={ {show:this.state.show, message:"User created successfully",type:"success"} }/>
                </div>

            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <h3>Add User</h3>
                </Card.Header>
                    <Form onReset={this.resetUser} onSubmit={this.state.id ? this.updateUser: this.submitUser} id={"AddUserId"}>
                        <Card.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control autoComplete="off" name="email" className={"bg-dark text-white"} type="email" placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.emailChange} required
                            />
                        </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control autoComplete="off" name="firstName" className={"bg-dark text-white"} type="text" placeholder="Enter First Name"
                                          value={this.state.firstName} onChange={this.nameChangeF} required
                            />
                        </Form.Group>

                        <Form.Group className= "mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control autoComplete="off"  name="lastName" className={"bg-dark text-white"} type="text" placeholder="Enter Last Name"
                            value={this.state.lastName} onChange={this.nameChangeL} required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control autoComplete="off" name="password" className={"bg-dark text-white"} type="password" placeholder="Password"
                            value={this.state.password} onChange={this.nameChangeP} required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control autoComplete="off" name="confirmPassword" className={"bg-dark text-white"} type="password" placeholder="Confirm Password"
                            value={this.state.confirmPassword} onChange={this.nameChangeCP} required
                            />
                        </Form.Group>

                    <Card.Footer>
                        <Button variant="info" type="reset">
                            Reset
                        </Button>{"  "}
                        <Button variant="info" type="button" onClick={this.userList.bind()}>
                            UserList
                        </Button>{"   "}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Card.Footer>
                </Card.Body>
            </Form>
            </Card>
            </div>
        )
    }

}
export default User;