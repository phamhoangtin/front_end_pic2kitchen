import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
import Axios from 'axios';
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6Im5vdCBsb2dpbiIsIklEIjotMX0.gQ_c05DxXLKvioGWwKjjp6KOuvzTOrKhE-v3eYeUX5U"
function Dishes() {
    const LIST_LENGHT = 8
    const [List, setList] = useState({
        recommendation: [],
        trending: [],
        history: []
    });
    if (localStorage.getItem('userInfo') !== null) {
        token = localStorage.getItem('token')
    }
    useEffect(() => {
        const delay = ms => new Promise(res => setTimeout(res, ms));

        Axios.get(
            "https://www.apipic2kitchen.ga/get_food/get_random_12_recipes/",
            { withCredentials: false }
        ).then(async res => {
            res.data.data.map((dish) => {
                dish.img = dish.img.replace('555x240', '360x225')
            })
            console.log(res)

            setList((prevState) => ({
                ...prevState,
                recommendation: res.data.data
            }))
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
            setList((prevState) => ({
                ...prevState,
                trending: res.data.data
            }))
        }).catch(async error => {
            console.log(error)

        })

        Axios.post("https://www.apipic2kitchen.ga/user/get_user_history/", {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function (res) {
            console.log(res);
            res.data.data.map((dish) => {
                dish.img = dish.img.replace('555x240', '360x225')
            })

            setList((prevState) => ({
                ...prevState,
                history: res.data.data
            }))
        }).catch(function (error) {
            console.log(error.response)
        })
        // save response to variable
      
    }, [])
    return (
        <Container fluid className="col-12 " >
            <Row>
                <div className="col-sm-12 col-md-3 pl-4">
                    <h4>Recommended</h4>
                </div>
                <div className="col-12 ">

                    <ListOfDishes list={List.recommendation.slice(0, LIST_LENGHT)} pre_id="Re" />
                    <Row className="justify-content-center">
                        <a href={"/recommendation"} className="navlink">
                            See more
                    </a>
                    </Row>

                </div>

            </Row>
            <Row>
                <div className="col-sm-12 col-md-3 pl-4">
                    <h4>Trending</h4>
                </div>
                <div className="col-12">
                    <ListOfDishes list={List.trending.slice(0, LIST_LENGHT)} pre_id="Tr" />
                    <Row className="justify-content-center">
                        <a href={"/trending"} className="navlink">
                            See more
                    </a>
                    </Row>
                </div>

            </Row>
            <Row>
                <div className="col-sm-12 col-md-3 pl-4">
                    <h4>History</h4>
                </div>
                <div className="col-12">
                    <ListOfDishes list={List.history.slice(0, LIST_LENGHT).reverse()} pre_id="Hi" />
                    <Row className="justify-content-center">
                        <a href={"/history"} className="navlink">
                            See more
                    </a>
                    </Row>
                </div>
            </Row>
        </Container>
    )
}
export default Dishes;