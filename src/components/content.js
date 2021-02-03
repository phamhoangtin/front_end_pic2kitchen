import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ReactComponent as Logo } from './logo.svg';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6Im5vdCBsb2dpbiIsIklEIjotMX0.gQ_c05DxXLKvioGWwKjjp6KOuvzTOrKhE-v3eYeUX5U"
var logoStyle = {
    position: "relative",
    width: "100%",
    height:"100%"
}

function Content() {
    if (localStorage.getItem('token') !== null) {
        token = localStorage.getItem('token')
    }    
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [fileText, setFileText] = useState("Choose file")
    const [upLoad, setUpLoad] = useState(( 
    <button type="submit" className="button-upload">
        <span>
            Upload
        </span>
    </button>))
    useEffect(() => {
        console.log(file)
    }, [file])
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(token);
        
        if (file === null) {
            setFileText("Please choose an image before submit!")
        }
        else {
            var formData = new FormData();
            formData.append("Image", file);
            setUpLoad((<div class="spinner-grow text-danger" role="status">
            <span class="sr-only">Loading...</span>
          </div>))
            axios.post("https://www.apipic2kitchen.ga/image/predict/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            }).then(function (res) {
                console.log(res);
                setResult(res.data);
                window.location.href = "/result/"+res.data.link_img_detect.substring(54,71)
            }).catch(function (error) {
                console.log(error);
                setUpLoad(( 
                    <button type="submit" className="button-upload">
                        <span>
                            Upload
                        </span>
                    </button>))
                setFileText("There are an error, please try again")
            });
        }
        
    }
    const handleChange = (event) => {
        setFile(event.target.files[0])
        setFileText(event.target.files[0].name)
    }
    let content = (
        <div>
            <Row className="justify-content-center">
                <div className="col-lg-3 col-md-4 col-5 logo">
                    <Logo style={logoStyle} />
                </div>
            </Row>
            <Row className="justify-content-center">
                <div className="col-lg-4 col-md-3 col-2 " style={{ paddingBottom: "19%" }}>
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-center">
                            <div className="custom-file m-4">
                                <input type="file" name="file" accept="image/*" className="custom-file-input" id="customFile" onChange={handleChange} />
                                <label className="custom-file-label" htmlFor="customFile">{fileText}</label>
                            </div>
                           {upLoad}
                        </Row>
                    </Form>
                </div>
            </Row>
        </div>)
    return (
        <Container fluid className="col-12 content-style">
            {content}
        </Container>
    );
}

export default Content;