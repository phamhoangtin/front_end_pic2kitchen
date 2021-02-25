import React, {useState,  useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
import Axios from 'axios';
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6Im5vdCBsb2dpbiIsIklEIjotMX0.gQ_c05DxXLKvioGWwKjjp6KOuvzTOrKhE-v3eYeUX5U"
function History(){
    const LIST_LENGHT = 12
    const [List, setList] = useState({
        History: []
    })
    if (localStorage.getItem('userInfo') !== null) {
        token = localStorage.getItem('token')
    }
    useEffect(() => {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        Axios.post("https://www.apipic2kitchen.ga/user/get_user_history/", {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function (res) {
            console.log(res);
            res.data.data.map((dish)=>{
                dish.img = dish.img.replace('555x240', '360x225')
            })

            setList((prevState) => ({
                ...prevState,
                History: res.data.data}))
        }).catch(function (error) {
            console.log(error.response)
        })
        }, [])
        return (
            <Container fluid className="col-12" >
                <Row>
                    <div className="col-sm-12 col-md-3 pl-4">
                        <h4>History</h4>
                    </div>
                    <div className="col-12">                     
                        <ListOfDishes list={List.History.slice(0,  LIST_LENGHT).reverse()} pre_id="Re"/>
                    </div>
                    {/* <button className="navlink" style={{marginLeft:"80%"}} onClick={handleMore}>
                        See more
                    </button> */}
                </Row>
        </Container>
        )
}
export default History