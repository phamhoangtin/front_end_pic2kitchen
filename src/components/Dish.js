import React from 'react'
import { Container, Row } from 'react-bootstrap';
import ListOfDishes from './ListOfDishes'
function Dish() {
    const detail = {
        title: "Gà phô mai",
        ingredients: ["Gà", "Phô mai", "Khoai tây"],
        recommandation:
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
            <Row className="my-3">
                <div className="col-6">
                    <img style={{position: "relative", height: "auto", width: "100%" }} src='https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg' alt="main"/>
                </div>
                <div className="col-6">
                    <h2 style={{ textAlign: "center", font: "navFont", fontWeight: "bold" }}>{detail.title}</h2>
                    <table className="ingredient-table">
                        <tr>
                            <th>Thành phần</th>
                        </tr>
                        {detail.ingredients.map(ingredient => 
                            <tr>
                                <td>  {ingredient} </td>
                            </tr>
                        )}
                    </table>
                        
                </div>
            </Row>
            <Row>
                <div className="col-sm-12 col-md-3 pl-4">
                    <h4>See other dishes</h4>
                </div>
            </Row>
            <Row>
                <div className="col-12">
                    <ListOfDishes list={detail.recommandation} /> 
                </div>
            </Row>
        </Container>
    )
}
export default Dish;