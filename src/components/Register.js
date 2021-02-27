import Axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
function Register(props) {
    const [registerInfo, setForm] = useState({
        email: "",
        pass_word:"",
        name:""
    });
    const handleChange = (event) =>{
        event.persist()
        if (event.target.name === "confirm_pass_word") 
            {
                let statusText = ""
                if (event.target.value !== registerInfo.pass_word)
                    {
                        statusText = "Confirm password not match!"
                        document.getElementsByClassName('Status')[0].style.color="red"
                        document.getElementsByClassName('Status')[0].innerText = statusText
                        document.getElementById("Sign Up").disabled = true
                    }
                else
                {
                    statusText = "Confirm password is match!"
                    document.getElementsByClassName('Status')[0].style.color="green"
                    document.getElementsByClassName('Status')[0].innerText = statusText
                    document.getElementById("Sign Up").disabled = false
                }
                    
            }
        console.log(registerInfo)
        setForm((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value}))
    }
    const handleClose = () => {
        props.changeRegisState(false)
    }
    const handleSubmit=(event)=>{
        let errorText = "This email are already registed"
        event.preventDefault()
        console.log(registerInfo)
        const delay = ms => new Promise(res => setTimeout(res, ms));
        var loading = document.createElement("div")
        loading.className = "loader"
        document.getElementById("Modal footer").appendChild(loading)
        Axios.post(
            "https://www.apipic2kitchen.ga/user/create/",
            registerInfo,
            { withCredentials:false}
            ).then(async res => {
               
                console.log(res)
                document.getElementsByClassName('loader')[0].remove()
                document.getElementsByClassName('Status')[0].style.color="green"
                document.getElementsByClassName('Status')[0].innerText ="Sign up successful!"
                await delay(1000);
                props.changeRegisState(false)
                //console.log('alo'+document.getElementsByClassName('Status'))
                window.location.href = "/";
            }).catch(async error => {
                console.log(error)
                document.getElementsByClassName('loader')[0].remove()
                document.getElementsByClassName('Status')[0].style.color="red"
                document.getElementsByClassName('Status')[0].innerText = errorText
                await delay(1000);
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
                        <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control onChange={handleChange} name="name" type="text" placeholder="Enter your fullname" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} name="pass_word" type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control onChange={handleChange} name="confirm_pass_word" type="password" placeholder="Password" />
                    </Form.Group>
                    <div id="Modal footer" className="row" style={{justifyContent:"space-between"}}>
                    <Button id = "Sign Up"style={{marginLeft:"14px"}} variant="primary"  type="submit">
                        Sign up
                    </Button>
                    <p className="Status" ></p>
                    </div>
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
