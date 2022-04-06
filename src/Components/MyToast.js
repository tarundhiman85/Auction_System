import {Component} from "react";
import {Toast} from "react-bootstrap";

export default class MyToast extends Component{
    render() {
        //we want the toast to come to the top right corner of the screen
        const toastCss={
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: "1",
            boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        return (
            <div style={this.props.children.show ? toastCss: null}>
                <Toast className={"border bg-success bg-success text-white"} show={this.props.children.show}>
                    <Toast.Header className={"bg-success text-white"} closeButton={false}>
                        <strong className="mr-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {this.props.children.message}
                    </Toast.Body>
                </Toast>
            </div>
        );
    }
}