import React from "react";
import { Pizza } from "../types";
import SpecialOfferCSS from './specialOffer.module.css'
import withAddToCart, { AddToCartProps, WithAddToCartProps } from "./AddToCart";

interface Props{
    pizza: Pizza
}

const SpecialOffer: React.FC<Props> = ({pizza}) => {

    
  return (
    <div className={SpecialOfferCSS.container}>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <WithAddToCartProps>
        {({addToCart})=><button type="button" onClick={()=>addToCart(pizza)}>
        Add to Cart
      </button>}
      </WithAddToCartProps>
      
    </div>
  );
};

export default SpecialOffer;
