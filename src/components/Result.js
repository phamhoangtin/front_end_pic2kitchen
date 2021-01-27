import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
import Axios from 'axios';
function Result() {
    const [List, setList] = useState([])
    return (
        <Container fluid className="col-12" >
            <Row className="my-3 justify-content-start">
                <div className="col-6">
                    <img style={{ position: "relative", height: "auto", width: "100%" }} src={Detail.img} alt="main" />
                </div>
               
            </Row>
            <Row className="justify-content-start">
                <div className="col-6">
                    <table className="ingredient-table">
                        <tr>
                            <th>Thành phần</th>
                            <th>Lượng</th>
                        </tr>
                        {Detail.components.map(ingredient =>
                            <tr>
                                <td> {ingredient.name} </td>
                                <td dangerouslySetInnerHTML={{ __html: ingredient.quantity + ' ' + ingredient.unit }} />
                            </tr>
                        )}
                    </table>
                </div>

            </Row>
            <Row>
                <div className="mt-5 col-sm-12 col-md-3 pl-4">
                    <h4>See other dishes</h4>
                </div>
            </Row>
            <Row>
                <div className="col-12">
                    <ListOfDishes list={List.slice(0, LIST_LENGHT)} />
                </div>
            </Row>
        </Container>
    )
}
export default Result;