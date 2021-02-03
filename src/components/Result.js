import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
import Axios from 'axios';
import {useParams} from 'react-router-dom';
const LIST_LENGHT = 5;
function Result() {
    const {image} = useParams();
    const [List, setList] = useState([])
        const [Detail, setDetail] = useState({
            img: "",
            name: "",
            components: []
        })
    useEffect(() => {
        
        Axios.get(
            "https://www.apipic2kitchen.ga/get_food/get_random_12_recipes/",
            { withCredentials:false}
            ).then(async res => {
                console.log(res)
                res.data.data.map((dish)=>{
                    dish.img = dish.img.replace('555x240', '360x225')
                })
                setDetail(res.data.data[0])
                setList(res.data.data)
                
            }).catch(async error => {
                console.log(error)
                
            })
    }, [])
    return (
        <Container fluid className="col-12" >
            <Row className="my-3 justify-content-start">
                <div className="col-6">
                    <img style={{ position: "relative", height: "auto", width: "100%" }} src={"https://www.apipic2kitchen.ga/media/not_login/predict/"+ image +".jpg"} alt="main" />
                </div>
               
            </Row>
            <Row className="justify-content-start">
                <div className="col-6">
                    <table className="ingredient-table">
                        <tr>
                            <th>Thành phần</th>
                        </tr>
                        {Detail.components.slice(0, LIST_LENGHT).map(ingredient =>
                            <tr>
                                <td> {ingredient.name} </td>
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