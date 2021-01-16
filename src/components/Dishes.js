import React, {useState,  useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
import Axios from 'axios';
function Dishes() {
    const [List, setList] = useState({
        recommendation: [],
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
                console.log(res)
                setList({recommendation:res.data.data[0].recipes})
                console.log(List.recommendation)
              
                await delay(1000);
            }).catch(async error => {
                console.log(error)
                
                await delay(1000);
            })
        // save response to variable
    }, [])
    return (
        <Container fluid className="col-12" >
            <Row>
                <div className="col-sm-12 col-md-3 pl-4">
                    <h4>Recommended</h4>
                </div>
                <div className="col-12">
                    <ListOfDishes list={List.recommendation} pre_id="Re"/>
                </div>
            </Row>
            <Row>
                <div className="col-sm-12 col-md-3 pl-4">
                    <h4>Trending</h4>
                </div>
                <div className="col-12">
                    <ListOfDishes list={List.recommendation} pre_id="Tr"/> 
                </div>
            </Row>
            <Row>
                <div className="col-sm-12 col-md-3 pl-4">
                    <h4>History</h4>
                </div>
                <div className="col-12">
                    <ListOfDishes list={List.recommendation} pre_id="Hi"/> 
                </div>
            </Row>
        </Container>
    )
}
export default Dishes;