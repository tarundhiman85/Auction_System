import React from "react";
import {Col, Container, Navbar} from "react-bootstrap";

class Footer extends React.Component {
    render() {
        let fullYear = new Date().getFullYear();
        return (
            <Navbar bg="dark" variant="dark" fixed="bottom">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>{fullYear}, All Right Reserved</div>
                    </Col>
                </Container>
            </Navbar>
        );
    }
}
export default Footer;