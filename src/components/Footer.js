import React from 'react'
import { Row, Container, Nav } from 'react-bootstrap'
function Footer() {
    return (
        <footer className = "mt-5">
            <div className="footer-top">
                <Container>
                    <Row >
                        <div className="col-sm-12 col-md-4" >
                            <img
                                src="/img/logo_mini.svg"
                                width="70"
                                height="70"
                                className="d-inline-block align-top"
                                alt="logo"
                            />
                            <p>
                                This is a text which should be in a bottom of the page and wrapped correctly
                        </p>
                        </div>
                        <div className="col-sm-12 col-md-4" >
                            <h3>Contact us</h3>
                            <p><i className="fas fa-map-marker-alt"></i>227 Nguyễn Văn Cừ street, District 5, Ho Chi Minh city</p>
                            <p><i className="fas fa-phone"></i> Phone: +84 793860036</p>
                            <p><i className="fas fa-envelope"></i> Email: <a href="mailto:hello@domain.com">nhluan.12tin@gmail.com</a></p>
                            
                        </div>
                        <div className="col-sm-12 col-md-4 footer-social" >
                            <h3>Follow us</h3>
                            <p>
                                <a href="https://www.facebook.com/us.vnuhcm"><i className="fab fa-facebook"></i></a>
                                <a href="/"><i className="fab fa-twitter"></i></a>
                                <a href="/"><i className="fab fa-google-plus-g"></i></a>
                                <a href="/"><i className="fab fa-instagram"></i></a>
                                <a href="/"><i className="fab fa-pinterest"></i></a>
                            </p>
                        </div>

                    </Row>
                </Container>

            </div>
            <div className="footer-bottom">
                <Container>
                    <Row >
                        <div className="col-md-5 text-center footer-copy">
                        <p>
                            Copyright © 2021
                        </p>
                        </div>
                        <div className="col-md-7 footer-menu">
                        <Nav className="navbar navbar-light navbar-expand-md">
							    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
							        <span className="navbar-toggler-icon"></span>
							    </button>
							    <div className="collapse navbar-collapse " id="navbarNav">
							        <ul className="navbar-nav ml-auto">
							            <li className="nav-item">
							                <a className="nav-link scroll-link" href="#" style={{color:"#aaa"}}>Top</a>
							            </li>
							        </ul>
							    </div>
							</Nav>
                        </div>
                    </Row>
                </Container>
            </div>


        </footer>


    )
}
export default Footer
