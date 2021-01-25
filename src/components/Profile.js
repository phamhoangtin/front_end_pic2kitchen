import Axios from 'axios';
import React, {useState,  useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';

function profile(){
    return (
        <Container fluid className="col-12" >
           <Row className="my-3 justify-content-center">
               <div className="col-3">
                    <img style={{width: "100%"}}src="https://www.premierchoicegroup.com/wp-content/uploads/place-holder-avatar.jpg"/>
               </div>
               <div className="col-7">
                    <h2>
                        name
                    </h2>
               </div>
            </Row>                
        </Container>
    )
}
export default profile;