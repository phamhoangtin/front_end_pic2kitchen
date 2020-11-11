import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ReactComponent as Logo } from './logo.svg';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
const BACKGROUND = 'img/background.jpg';
var contentStyle = {
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundImage: "url(" + BACKGROUND + ")",
    backgroundAttachment: "scroll",
}
var logoStyle = {
    position: "relative",
    width: "100%",
    height: "auto"
}

function Content() {
    const [file, setFile] = useState(null);
    useEffect(() => {
        console.log(file)
    }, [file])
    const handleSubmit = (event) => {
        event.preventDefault()
        var formData = new FormData();
        formData.append("image", file);
        axios.post("http://127.0.0.1:5000/image", file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (res) {
            console.log(res);
        }).catch(function (error) {
            console.log(error);
        });
    }
    const handleChange = (event) => {
        setFile(event.target.files[0])
    }
    return (
            <Container fluid className="col-12" style={contentStyle}>
                <Row className="justify-content-center " >
                    <div className="col-3" style={{ paddingTop: "23%", paddingLeft: "40px" }}>
                        <Logo style={logoStyle} />
                    </div>
                </Row>
                <Row className="justify-content-center">
                    <div className="col-4" style={{paddingBottom:"19%"}}>
                        <Form onSubmit={handleSubmit} redirect="/">
                            <Row className="justify-content-center">
                                <div className="custom-file m-4">
                                    <input type="file" name="file" className="custom-file-input" id="customFile" onChange={handleChange} />
                                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                </div>
                                <button type="submit" className="button-upload">
                                    <span>
                                        Upload
                                </span>
                                </button>
                            </Row>
                        </Form>
                    </div>
                </Row>
            </Container>
    );
}

export default Content;