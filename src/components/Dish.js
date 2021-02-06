import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
import Axios from 'axios';
import { useParams } from 'react-router-dom';
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6Im5vdCBsb2dpbiIsIklEIjotMX0.gQ_c05DxXLKvioGWwKjjp6KOuvzTOrKhE-v3eYeUX5U"
function Dish() {
    const { topic, id } = useParams();
    const LIST_LENGHT = 8
    const [Detail, setDetail] = useState({
        img: "",
        name: "",
        components: [],
        cook_steps: []
    })
    if (localStorage.getItem('token') !== null) {
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
            {
                headers: {
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
            { withCredentials: false }
        ).then(async res => {
            console.log(res)
            res.data.data.map((dish) => {
                dish.img = dish.img.replace('555x240', '360x225')
            })
            setList(res.data.data)

        }).catch(async error => {
            console.log(error)

        })
    }, [])
    return (
        <Container fluid className="col-12" >
            <Row className="my-2 justify-content-center">
                <div className="col-lg-5 col-md-6 col-sm 7 col-12">
                    <h2 style={{ textAlign: "center", font: "navFont", fontWeight: "bold" }}>{Detail.name}</h2>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-5 col-8" style={{ opacity: "0.7" }}>
                    <Row>
                        <div className="col-6">
                            <a className="fa fa-clock-o">{' ' + Detail.time + ' phút'}</a>
                        </div>
                        <div className="col-6">
                            <p>{"Độ khó: " + Detail.level}</p>
                        </div>
                    </Row>
                </div>
            </Row>
            <Row className="my-3 justify-content-center">
                <div className="col-8">
                    <img style={{ position: "relative", height: "auto", width: "100%" }} src={Detail.img} alt="main" />
                </div>

            </Row>
            <Row className="my-3 justify-content-center">
                <div className="col-8">
                    <p dangerouslySetInnerHTML={{ __html: "Miêu tả: " + Detail.des }} />
                </div>

            </Row>
            <Row className="justify-content-center">
                <div className="col-8">
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
            <Row className="my-5 justify-content-center">
                <div className="col-8">
                    {Detail.cook_steps.map(cook_step =>
                        <div className = "my-3">
                            <h5>
                                {"Bước " + cook_step.step}
                            </h5>
                            <p>{cook_step.des}</p>
                            {cook_step.pictures.map(pic =>
                            <img style={{width:"30%"}} src={pic} alt={"step " + cook_step.step}/>
                                )}
                            
                        </div>

                    )}
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