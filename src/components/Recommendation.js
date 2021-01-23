import React, {useState,  useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
import Axios from 'axios';

function Recommendation(){
    const LIST_LENGHT = 12
    const [List, setList] = useState({
        recommendation: []
    })
    useEffect(() => {
        const delay = ms => new Promise(res => setTimeout(res, ms));
       
        Axios.get(
            "https://www.apipic2kitchen.ga/get_food/get_random_12_recipes/",
            { withCredentials:false}
            ).then(async res => {
                res.data.data.map((dish)=>{
                    dish.img = dish.img.replace('555x240', '360x225')
                })
                console.log(res)
               
                setList((prevState) => ({
                    ...prevState,
                    recommendation: res.data.data}))
            }).catch(async error => {
                console.log(error)
                
            })
        }, [])
        return (
            <Container fluid className="col-12" >
                <Row>
                    <div className="col-sm-12 col-md-3 pl-4">
                        <h4>Recommended</h4>
                    </div>
                    <div className="col-12">                     
                        <ListOfDishes list={List.recommendation.slice(0,  LIST_LENGHT)} pre_id="Re"/>
                    </div>
                    {/* <button className="navlink" style={{marginLeft:"80%"}} onClick={handleMore}>
                        See more
                    </button> */}
                </Row>
        </Container>
        )
}
export default Recommendation