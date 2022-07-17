import React from "react";
import './Ingredients.css'
import BreadTop from '../../../Assets/img/top.png'
import Salad from '../../../Assets/img/salad.png'
import Meat from '../../../Assets/img/meat.png'
import Cheese from '../../../Assets/img/cheese.png'
import BreadBottom from '../../../Assets/img/bottom.png'

const Ingredients = (props) =>{
    let ingredient = null;

    switch(props.type){

        case 'bread-bottom':
              ingredient = <div><img src={BreadBottom} alt="Bottom Bread"/></div>
              break;
        case 'bread-top':
               ingredient = <div><img src={BreadTop}    alt="Top Bread"/></div>
               break;
        case 'salad':
               ingredient = <div><img src={Salad} alt="Salad"/></div>
               break;
        case 'meat':
                ingredient = <div><img src={Meat} alt="Meat"/></div>
                break;
        case 'cheese':
                ingredient = <div><img src={Cheese} alt="Cheese"/></div>
                break;

        default:
                ingredient = null;
    }
    return(
        <div className="ingredient">
              {ingredient}
        </div>
    )
}
export default Ingredients;