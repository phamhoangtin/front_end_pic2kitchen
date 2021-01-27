import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ReactComponent as Logo } from './logo.svg';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
const BACKGROUND = 'img/background.jpg';
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6Im5vdCBsb2dpbiIsIklEIjotMX0.gQ_c05DxXLKvioGWwKjjp6KOuvzTOrKhE-v3eYeUX5U"
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
    if (localStorage.getItem('token') !== null){
        token = localStorage.getItem('token')
       }
    const [file, setFile] = useState(null);
    const [result, setResult] = useState({});
    useEffect(() => {
        console.log(file)
    }, [file])
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(token);
        var formData = new FormData();
        formData.append("Image", file);
        axios.post("https://www.apipic2kitchen.ga/image/predict/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            } 
        }).then(function (res) {
            console.log(res);
            setResult(res.data);
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
                    <div className="col-3" style={{ paddingTop: "23%", paddingLeft: "5%" }}>
                        <Logo style={logoStyle} />
                    </div>
                </Row>
                <Row className="justify-content-center">
                    <div className="col-2 col-sm-4 " style={{paddingBottom:"19%"}}>
                        <Form onSubmit={handleSubmit}>
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
                <Row className="justify-content-center">
                    <div className = "col-4">
                        <img style={{ position: "relative", height: "auto", width: "100%" }} src={result.link_img_detect} alt="" />
                    </div> 
                </Row>
            </Container>
    );
}

export default Content;