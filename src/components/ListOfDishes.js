import React, {useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
let startIndex = 0;
export default function ListOfDishes(prop) {
    const [styleX, setStyleX] = useState({visibility: "hidden", transform:""});
    useEffect(() => {
        var i = 0;     
        for (i = 0; i < prop.list.length; i++){
            document.getElementById(prop.pre_id + 'item-' + i).style.visibility="hidden";
        }
        for (i = startIndex; i < startIndex + 5; i++){
            console.log('index i: ', i)
            document.getElementById(prop.pre_id + 'item-' + i).style.visibility="";
        }
    }, [styleX, prop.list.length, prop.pre_id])
    const handleLeft = () => {
        console.log(startIndex);
        var col12 = document.getElementById('re-list').getBoundingClientRect().width;
        startIndex = startIndex - 1;
        if (startIndex < 0 ) startIndex+=1;
        setStyleX({transform:"translateX("+ -col12/5.0 * startIndex +"px)"})
    }
    const handleRight = () => {
        console.log(startIndex);
        var col12 = document.getElementById('re-list').getBoundingClientRect().width;
        startIndex = startIndex + 1; 
        if (startIndex > prop.list.length - 5) startIndex-=1;
        setStyleX({transform:"translateX("+ -col12 / 5.0 * startIndex +"px)"})
    }
    return (
        <Row className="list" id="re-list">
            <div className="list-btn-box" style={{ paddingTop:"6%",position:"absolute"}}>
                <button className="list-btn" onClick={handleLeft}>
                    <span className="fas fa-chevron-left">
                    </span>
                </button>
            </div>
            <div className="list-btn-box" style={{paddingLeft:"95.5%", paddingTop:"6%", position:"absolute" }}>
                <button className="list-btn" onClick={handleRight}>
                    <span className="fas fa-chevron-right">
                    </span>
                </button>
            </div>
            {prop.list.map((ingredient) => (
                <a href="/dish/1" className="list-item" 
                    id={prop.pre_id + "item-" + prop.list.indexOf(ingredient)} style={styleX}>
                    <img className="card-img-top" src={ingredient.thumbnail}
                        alt={ingredient.title} />
                    <p className="list-text">{ingredient.title}</p>
                </a>
            ))}      
        </Row>
    )
}
