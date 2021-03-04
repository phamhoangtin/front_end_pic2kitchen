import React, {useState,  useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
import Axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6Im5vdCBsb2dpbiIsIklEIjotMX0.gQ_c05DxXLKvioGWwKjjp6KOuvzTOrKhE-v3eYeUX5U"
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function Search(){
    const LIST_LENGHT = 12
    const [List, setList] = useState({
        SearchResult: []
    })
    let query = useQuery()
    let predict = query.get("key")
    let option = query.get("option")
    if (localStorage.getItem('userInfo') !== null) {
        token = localStorage.getItem('token')
    }
    useEffect(() => {
        Axios.post(
            "https://www.apipic2kitchen.ga/get_food/search/",{
                "key_word":decodeURIComponent(predict)
            },
            { withCredentials: false }
        ).then(async res => {
            console.log(res)
            res.data.data.map((dish) => {
                dish.img = dish.img.replace('555x240', '360x225')
            })
            setList((prevState) => ({
                ...prevState,
                SearchResult: res.data.data
            }))
        }).catch(async error => {
            console.log(error)

        })
        }, [])
        return (
            <Container fluid className="col-12" >
                <Row>
                    <div className="col-sm-12 col-md-5 pl-4">
                        <h4>Search by {option =="1" ? "name" : "ingredient"} result for '{decodeURIComponent(predict)}'</h4>
                    </div>
                    <div className="col-12">                     
                        <ListOfDishes list={List.SearchResult.slice(0,  LIST_LENGHT)} pre_id="Re"/>
                    </div>
                    {/* <button className="navlink" style={{marginLeft:"80%"}} onClick={handleMore}>
                        See more
                    </button> */}
                </Row>
        </Container>
        )
}
export default Search