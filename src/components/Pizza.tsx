import React  from "react";
import PizzaCSS from './Pizza.module.css';
import { useDispatch } from "./AppState";
import { Pizza } from "../types";
import withAddToCart, {AddToCartProps} from "./AddToCart";

interface Props extends AddToCartProps{
pizza: Pizza
}
const PizzaItem:React.FC<Props>=({pizza, addToCart})=>{

    const addToCartHandler=()=>{
        addToCart(pizza)
    }
    return<li className={PizzaCSS.container}>
        <h2>{pizza.name}</h2>
        <p>{pizza.description}</p>
        <p>{pizza.price}</p>
        <button type="button" onClick={addToCartHandler}>Add to Cart</button>
    </li>
};

export default withAddToCart(PizzaItem);