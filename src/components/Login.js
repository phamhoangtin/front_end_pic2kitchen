import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import Axios from 'axios';
//import { Redirect } from 'react-router-dom';
function Login(props) {
    const [loginInfo, setForm] = useState({
        email: "",
        pass_word:""
    });
    const handleChange=(event) =>{
        event.persist()
        console.log(loginInfo)
        setForm((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value}))
    }
    const handleClose = () =>{
       props.changeLoginState(false)
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        const delay = ms => new Promise(res => setTimeout(res, ms));
        var loading = document.createElement("div")
        loading.className = "loader"

        document.getElementById("Modal footer").appendChild(loading)
        Axios.post(
            "https://www.apipic2kitchen.ga/user/login/",
            loginInfo,
            { withCredentials:false}
            ).then(async res => {
               
                console.log(res)
                document.getElementsByClassName('loader')[0].remove()
                document.getElementsByClassName('Status')[0].style.color="green"
                document.getElementsByClassName('Status')[0].innerText ="Log in successful!"
                await delay(1000);
                localStorage.setItem('userInfo', loginInfo.email)
                props.changeLoginState(false)
                console.log('alo'+document.getElementsByClassName('Status'))
                window.location.href = "/dishes";
            }).catch(async error => {
                console.log(error)
                document.getElementsByClassName('loader')[0].remove()
                document.getElementsByClassName('Status')[0].style.color="red"
                document.getElementsByClassName('Status')[0].innerText ="Can not log in, please check your infomations!"
                await delay(1000);
            })
    }

        // const handleShow = () =>   this.props.changeLoginState.bind(this, false)
        //console.log('state' + this.props.changeLoginState)
    let loginForm = (
            <Modal show={props.isLogin} onHide={handleClose} animation={true} >
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
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

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} name="pass_word" type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <div id="Modal footer" className="row" style={{justifyContent:"space-between"}}>
                    <Button style={{marginLeft:"14px"}} variant="primary"  type="submit">
                        Log in
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
    )
    return (
        <div>
            {loginForm}
        </div>
    )
}

export default Login
