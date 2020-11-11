import React from 'react'
import { Container, Row } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
function Dishes() {
    const List = {
        recommendation:
            [{title: "Chè đậu xanh 1",
              thumbnail: "https://cdn.24h.com.vn/upload/2-2020/images/2020-05-22/1590108337-939327e48478e46fac8a710f9ee5fd1e.jpg"
             },
             {title: "Chè đậu xanh 2",
              thumbnail: "https://cdn.24h.com.vn/upload/2-2020/images/2020-05-22/1590108337-939327e48478e46fac8a710f9ee5fd1e.jpg"
             },
             {title: "Chè đậu xanh 3",
              thumbnail: "https://cdn.24h.com.vn/upload/2-2020/images/2020-05-22/1590108337-939327e48478e46fac8a710f9ee5fd1e.jpg"
             },
             {title: "Chè đậu xanh 4",
              thumbnail: "https://cdn.24h.com.vn/upload/2-2020/images/2020-05-22/1590108337-939327e48478e46fac8a710f9ee5fd1e.jpg"
             },
             {title: "Chè đậu xanh 5",
              thumbnail: "https://cdn.24h.com.vn/upload/2-2020/images/2020-05-22/1590108337-939327e48478e46fac8a710f9ee5fd1e.jpg"
             },
             {title: "Chè đậu xanh 6",
              thumbnail: "https://cdn.24h.com.vn/upload/2-2020/images/2020-05-22/1590108337-939327e48478e46fac8a710f9ee5fd1e.jpg"
             },
             {title: "Chè đậu xanh 7",
              thumbnail: "https://cdn.24h.com.vn/upload/2-2020/images/2020-05-22/1590108337-939327e48478e46fac8a710f9ee5fd1e.jpg"
             }
            ]
    }
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