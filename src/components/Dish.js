import React, {useState,  useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
import Axios from 'axios';
import { findAllByDisplayValue } from '@testing-library/react';
function Dish() {
    const LIST_LENGHT=8
    const [Detail, setDetail] = useState({
        img:"",
        name:"",
        components:[]
    })
    const [List, setList] = useState([])
    useEffect(() => {
        Axios.get(
            "https://www.apipic2kitchen.ga/get_food/get_random_12_recipes/",
            { withCredentials:false}
            ).then(async res => {
                res.data.data.map((dish)=>{
                    dish.img = dish.img.replace('555x240', '')
                })
                console.log(res)
                setDetail(res.data.data[0])
                setList(res.data.data)
            }).catch(async error => {
                console.log(error)
                
            })
    }, [])
    return (
        <Container fluid className="col-12" >
            <Row className="my-3 justify-content-center">
                <div className="col-5">
                    <img style={{position: "relative", height: "auto", width: "100%" }} src={Detail.img} alt="main"/>
                </div>
                <div className="col-6">
                    <h2 style={{ textAlign: "center", font: "navFont", fontWeight: "bold" }}>{Detail.name}</h2>
                    <table className="ingredient-table">
                        <tr>
                            <th>Thành phần</th>
                            <th>Lượng</th>
                        </tr>
                        {Detail.components.map(ingredient => 
                            <tr>
                                <td> {ingredient.name} </td>
                                <td dangerouslySetInnerHTML={{__html: ingredient.quantity + ' ' + ingredient.unit}}/>
                            </tr>
                        )}
                    </table>
                        
                </div>
            </Row>
            <Row>
                <div className="col-sm-12 col-md-3 pl-4">
                    <h4>See other dishes</h4>
                </div>
            </Row>
            <Row>
                <div className="col-12">
                    <ListOfDishes list={List.slice(0,  LIST_LENGHT)} /> 
                </div>
            </Row>
        </Container>
    )
}
export default Dish;