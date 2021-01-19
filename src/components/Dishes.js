import React, {useState,  useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
import Axios from 'axios';
function Dishes() {
    const [seeMore, setSeeMore] = useState(false)
    const [List, setList] = useState({
        recommendation: [],
        trending: [],
        history: []
    });
    // const List = {
    //     recommendation:
    //         [{title: "Chè đậu xanh 1",
    //           thumbnail: "https://cdn.24h.com.vn/upload/2-2020/images/2020-05-22/1590108337-939327e48478e46fac8a710f9ee5fd1e.jpg"
    //          },
    //          {title: "Chè đậu xanh 2",
    //           thumbnail: "https://cdn.24h.com.vn/upload/2-2020/images/2020-05-22/1590108337-939327e48478e46fac8a710f9ee5fd1e.jpg"
    //          },
    //          {title: "Chè đậu xanh 3",
    //           thumbnail: "https://cdn.24h.com.vn/upload/2-2020/images/2020-05-22/1590108337-939327e48478e46fac8a710f9ee5fd1e.jpg"
    //          },
    //          {title: "Chè đậu xanh 4",
    //           thumbnail: "https://cdn.24h.com.vn/upload/2-2020/images/2020-05-22/1590108337-939327e48478e46fac8a710f9ee5fd1e.jpg"
    //          },
    //          {title: "Chè đậu xanh 5",
    //           thumbnail: "https://cdn.24h.com.vn/upload/2-2020/images/2020-05-22/1590108337-939327e48478e46fac8a710f9ee5fd1e.jpg"
    //          },
    //          {title: "Chè đậu xanh 6",
    //           thumbnail: "https://cdn.24h.com.vn/upload/2-2020/images/2020-05-22/1590108337-939327e48478e46fac8a710f9ee5fd1e.jpg"
    //          },
    //          {title: "Chè đậu xanh 7",
    //           thumbnail: "https://cdn.24h.com.vn/upload/2-2020/images/2020-05-22/1590108337-939327e48478e46fac8a710f9ee5fd1e.jpg"
    //          }
    //         ]
    // }
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
       
            Axios.get(
                "https://www.apipic2kitchen.ga/get_food/get_random_12_recipes/",
                { withCredentials:false}
                ).then(async res => {
                    console.log(res)
                    res.data.data.map((dish)=>{
                        dish.img = dish.img.replace('555x240', '360x225')
                    })
                    setList((prevState) => ({
                        ...prevState,
                        trending: res.data.data}))
                    console.log(List.trending)
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
                        setList((prevState) => ({
                            ...prevState,
                            history: res.data.data}))
                        console.log(List.history)
                        
                    }).catch(async error => {
                        console.log(error)
                        
                    })
                 
        // save response to variable
    }, [])
    const handleMore = () =>{
        setSeeMore(!seeMore)
        console.log(seeMore)
    }
    return (
        <Container fluid className="col-12 " >
            <Row>
                <div className="col-sm-12 col-md-3 pl-4">
                    <h4>Recommended</h4>
                </div>
                <div className="col-12 ">
                    
                    <ListOfDishes list={List.recommendation} pre_id="Re"/>
                </div>
                {/* <button className="navlink" style={{marginLeft:"80%"}} onClick={handleMore}>
                    See more
                </button> */}
            </Row>
            <Row>
                <div className="col-sm-12 col-md-3 pl-4">
                    <h4>Trending</h4>
                </div>
                <div className="col-12">
                    <ListOfDishes list={List.trending} pre_id="Tr"/> 
                </div>
            </Row>
            <Row>
                <div className="col-sm-12 col-md-3 pl-4">
                    <h4>History</h4>
                </div>
                <div className="col-12">
                    <ListOfDishes list={List.history} pre_id="Hi"/> 
                </div>
            </Row>
        </Container>
    )
}
export default Dishes;