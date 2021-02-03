import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
import Axios from 'axios';
import {useParams} from 'react-router-dom';
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6Im5vdCBsb2dpbiIsIklEIjotMX0.gQ_c05DxXLKvioGWwKjjp6KOuvzTOrKhE-v3eYeUX5U"
function Dish() {
    const {topic, id} = useParams();
    const LIST_LENGHT = 8
    const [Detail, setDetail] = useState({
        img: "",
        name: "",
        components: []
    })
    if (localStorage.getItem('token') !== null){
        token = localStorage.getItem('token')
       }
    const [List, setList] = useState([])
    useEffect(() => {
        Axios.post(
            "https://www.apipic2kitchen.ga/get_food/get_recipe_by_id/",
            {
                topic_id: topic,
                id_recipe: id
            },
            {headers: {
                'Authorization': `Bearer ${token}`
            } 
        }).then(async res => {
            res.data.img = res.data.img.replace('555x240', '')
            console.log(res)
            setDetail(res.data)
        }).catch(async error => {
            console.log(error)
        })
        Axios.get(
            "https://www.apipic2kitchen.ga/get_food/get_random_12_recipes/",
            { withCredentials:false}
            ).then(async res => {
                console.log(res)
                res.data.data.map((dish)=>{
                    dish.img = dish.img.replace('555x240', '360x225')
                })
                setList(res.data.data)
                
            }).catch(async error => {
                console.log(error)
                
            })
    }, [])
    return (
        <Container fluid className="col-12" >
            <Row className="my-3 justify-content-start">
                <div className="col-6">
                    <img style={{ position: "relative", height: "auto", width: "100%" }} src={Detail.img} alt="main" />
                </div>
                <div className="col-4">
                    <h2 style={{ textAlign: "center", font: "navFont", fontWeight: "bold" }}>{Detail.name}</h2>
                    <Row className="my-3 flex-column">
                        <div className="col-12">
                            <p dangerouslySetInnerHTML={{ __html:"Miêu tả: " + Detail.des}}/>
                        </div>
                        <div className="col-12">
                            <div className="col-4">
                                <p>{"Thời gian: " + Detail.time + " phút"}</p> 
                            </div>
                            <div className="col-4">
                                <p>{"Mức độ: " + Detail.level}</p> 
                            </div>
                        </div>
                        
                    </Row>
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
export default Dish;