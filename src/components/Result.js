import React, { useState, useEffect } from 'react'
import { Container, Row, Button } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
import Axios from 'axios';
import {useParams} from 'react-router-dom';
const LIST_LENGHT = 8;

function Result() {
    const {id, image} = useParams();
    let imageURL = "https://www.apipic2kitchen.ga/media/not_login/predict/" + image + ".jpg"
    const [List, setList] = useState([])
    
    if (localStorage.getItem('userInfo') !== null)
        imageURL = "https://www.apipic2kitchen.ga/media/login/predict/" + id + "/" + image + ".jpg"
    const [Detail, setDetail] = useState({
        img: "",
        name: "",
        components: []
    })
    const recommendedPredict = ['Thịt bò', 'Thịt heo', 'Thị gà']
    const handleSubmit = (event) =>{
        event.preventDefault()
        let recommendedChoose = []
        let getCheckedBoxes = document.querySelectorAll('input[type=checkbox]:checked')
        for (var i = 0; i < getCheckedBoxes.length; i++) {
            recommendedChoose.push(getCheckedBoxes[i].value)
          }
        console.log(recommendedChoose)
    }
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
            <Row>
                <div className="col-12">
                    <h2>Result</h2>
                </div>
            </Row>
            <Row className="my-3 justify-content-around">
                <div className="col-6">
                    <img style={{ position: "relative", height: "auto", width: "100%" }} src={imageURL} alt="main" />
                </div>
                <div className="col-4">
                    <h4 className="my-4">These ingredients may have appear in the picture</h4>
                <form onSubmit={handleSubmit}>
                {recommendedPredict.map(ingredient =>
                        <div class="form-check">
                        <label style={{fontSize:"large"}}class="form-check-label">
                          <input type="checkbox" id={"check-" + recommendedPredict.indexOf({ingredient})}class="form-check-input" value={ingredient}/>
                          {ingredient}
                        </label>
                      </div>
                    )}
                    <Button className="my-5" variant="primary"  type="submit">
                        Confirm
                    </Button>
                </form>
                    
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