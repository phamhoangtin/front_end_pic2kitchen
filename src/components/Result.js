import React, { useState, useEffect } from 'react'
import { Container, Row, Button } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
import Axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
const LIST_LENGHT = 8;
const INGREDIENT_VIETNAMESE = {
    "Seafood": "Hải sản",
    "Oyster": "Hàu",
    "Crab": "Cua, ghẹ",
    "Salad": "Rau",
    "Squid": "Mực",
    "Shrimp": "Tôm, tép",
    "Lobster": "Tôm hùm",
    "Carrot": "Cà rốt",
    "Cabbage": "Bắp cải",
    "Pumpkin": "Bí đỏ",
    "Squash": "Bí",
    "Tomato": "Cà chua",
    "Potato": "Khoai",
    "Radish": "Củ",
    "Cucumber": "Dưa",
    "Mushroom": "Nấm",
    "Bread": "Bánh mì",
    "Egg": "Trứng",
    "Pork": "Thịt heo",
    "Beef": "Thịt bò",
    "Chicken": "Thịt gà",
    "Tuna": "Cá ngừ",
    "Salmon": "Cá hồi"
}
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}
function Result() {
    const { id, image } = useParams();
    let query = useQuery()
    let predict = query.get("predict")
    if (predict == null) predict = "[]"
    
    let imageURL = "https://www.apipic2kitchen.ga/media/not_login/predict/" + image
    // if (!imageExists(imageURL)) {
    //     imageURL =  "https://www.apipic2kitchen.ga/media/login/predict/" + id + "/" + image
    // }
    const [List, setList] = useState([])

    // if (localStorage.getItem('userInfo') !== null)
    //     imageURL = "https://www.apipic2kitchen.ga/media/login/predict/" + id + "/" + image
    const [Detail, setDetail] = useState({
        img: "",
        name: "",
        components: []
    })
    const [recommendedDishes, setRecommendedDishes] = useState([])
    const [recommendedPredict, setRecommendedPredict] = useState(JSON.parse(predict))
    const [recommendedOptional, setRecommendedOptional] = useState([])
    const handleClick = () => {
        setRecommendedOptional([...recommendedOptional, "Seafood"])
    }
    const handleRemove = (index) => {
        const list = [...recommendedOptional];
        console.log(index)
        list.splice(index, 1);
        setRecommendedOptional(list);
    }
    const handleChange = (event, index) => {
        event.persist()
        let List = [...recommendedOptional]
        List[index] = event.target.value
        setRecommendedOptional(List)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (localStorage.getItem('userInfo') == null) {
                document.getElementsByClassName('Status')[0].style.color = "red"
                document.getElementsByClassName('Status')[0].innerText = "Please login to get recommended dishes!"
                return ;
            }
        let recommendedChoose = []
        let getCheckedBoxes = document.querySelectorAll('input[type=checkbox]:checked')
        for (var i = 0; i < getCheckedBoxes.length; i++) {
            recommendedChoose.push(getCheckedBoxes[i].value)
        }
        recommendedChoose = recommendedChoose.concat(recommendedOptional)
        console.log(recommendedChoose)
        var loading = document.createElement("div")
        loading.className = "spinner-grow text-danger"

        document.getElementsByClassName("Status")[0].appendChild(loading)
        Axios.post(
            "https://www.apipic2kitchen.ga/get_food/get_recipe_recommends/",
            {
                "obj_detected": recommendedChoose
            }
            ,
            { withCredentials: false }
        ).then(async res => {
            console.log(res)
            document.getElementsByClassName('spinner-grow text-danger')[0].remove()
            document.getElementsByClassName('Status')[0].innerText = ""
            const tmp = res.data.data.map((dish) => {
                return (
                    Axios.post(
                        "https://www.apipic2kitchen.ga/get_food/get_recipe_by_id/",
                        {
                            topic_id: dish.topic,
                            id_recipe: dish.id_food
                        },
                    ).then((res) => {
                        res.data.img = res.data.img.replace('555x240', '360x225')
                        res.data.topic = dish.topic
                        return (res.data)
                    }).catch((error) => {
                        console.log(error)
                        throw error;
                    })
                )
            })
            Promise.all(tmp).then(result => {
                console.log(result)
                setRecommendedDishes(result)
            })
        }).catch(async error => {
            console.log(error)
            document.getElementsByClassName('Status')[0].style.color = "red"
            document.getElementsByClassName('Status')[0].innerText = "Please try again!"
        })
    }
    useEffect(() => {
        Axios.get(
            "https://www.apipic2kitchen.ga/get_food/get_random_12_recipes/",
            { withCredentials: false }
        ).then(async res => {
            console.log(res)
            res.data.data.map((dish) => {
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
                    <img style={{ position: "relative", height: "auto", width: "100%" }} src={imageURL} onerror={"this.src="+ "'https://www.apipic2kitchen.ga/media/login/predict/" + id + "/" + image +"'" } alt="main" />
                </div>
                <div className="col-4">
                    <h4 className="my-4">Please select the ingredient that may appear in the picture</h4>
                    <form onSubmit={handleSubmit} id="form-recommend">
                        {recommendedPredict.map(ingredient =>
                            <div class="form-check">
                                <label style={{ fontSize: "large" }} class="form-check-label">
                                    <input type="checkbox" id={"check-" + recommendedPredict.indexOf({ ingredient })} class="form-check-input" value={ingredient} defaultChecked="true"/>
                                    {INGREDIENT_VIETNAMESE[ingredient]}
                                </label>
                            </div>
                        )}

                        <div className="form-group col-12" id="more-recommend">
                            {recommendedOptional.map((x, i) =>
                                <Row>
                                    <div className="col-12">
                                        <label>Optional</label>
                                        <Row>
                                            <div className="col-10">
                                                <select className="form-control" onChange={event => handleChange(event, i)}>
                                                    {Object.keys(INGREDIENT_VIETNAMESE).map((key) =>
                                                        <option value={key} selected={key === x && "selected"} >{INGREDIENT_VIETNAMESE[key]}</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div className="col-2 m-0 p-0">
                                                {recommendedOptional.length !== 0 && <Button onClick={() => handleRemove(i)} className="btn btn-danger"><span className="fas fa-minus"></span></Button>}
                                            </div>
                                        </Row>

                                    </div>
                                </Row>
                            )}
                            <Button onClick={handleClick} className="btn btn-secondary py-1 my-2">
                                <span className="fas fa-plus"></span>
                            </Button>
                        </div>
                        <Button className="my-5" variant="primary" type="submit">
                            Confirm
                        </Button>
                        <p className="Status" ></p>
                    </form>

                </div>
            </Row>
            <Row id="Recommended-Dish">
                {recommendedDishes.length > 0 &&
                    <div className="mt-5 col-sm-12 col-md-3 pl-4">
                        <h4>Recommended Dishes</h4>
                    </div>
                }
            </Row>
            <Row>
                <div className="col-12">
                    <ListOfDishes list={recommendedDishes.slice(0, 4)} />
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