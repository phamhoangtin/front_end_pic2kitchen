import Axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
function Register(props) {
    const [form, setForm] = useState({
        email: "",
        password:""
    });
    const handleChange = (event) =>{
        setForm({[event.target.type]: event.target.value})
    }
    const handleClose = () => {
        props.changeRegisState(false)
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        console.log(form)
        Axios.post(
            "http:localost:3000/login",
            form,
            { withCredentials:true}
            ).then(res => {
                console.log('res ' + res)
            }).catch(error => {
                console.log(error)
            })
    }

        // const handleShow = () =>   this.props.changeLoginState.bind(this, false)
        //console.log('state' + this.props.changeLoginState)
    let loginForm = (
        <>
            <Modal show={props.isRegis} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleChange} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange}type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary"  type="submit">
                        Log in
                    </Button>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={this.props.changeLoginState.bind(this, false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.changeLoginState.bind(this, false)}>
                        Login
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    )

    if (props.isRegis === false) {
        loginForm = null
    }
    return (
        <div>
            {loginForm}
        </div>
    )
}

export default Register
