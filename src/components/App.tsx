import React, { useEffect } from "react";
import pizzas from "../data/pizzas.json";
import Pizza from "./Pizza";
import AppCSS from './App.module.css'
import PizzaSVG from '../svg/pizza.svg';
import Cart from './Cart'
import AppStateProvider from "./AppState";
import SpecialOffer from "./SpecialOffer";

const App = () => {
  const specialOfferList=pizzas.find(pizza=>pizza.specialOffer)
  useEffect(()=>{
    const listener=()=>{
      alert("Hello")
    };
    document.addEventListener('mousedown',listener);

    return ()=>{
      document.removeEventListener('mousedown',listener);
    }
  },[])

  return (
    <AppStateProvider>
    <div className={AppCSS.container}>
        <div className={AppCSS.header}>
        <PizzaSVG width={120} height={120}/>
        <div className={AppCSS.siteTitle}>Delicious Pizza</div>
        <Cart/>
        </div>
        {specialOfferList?<SpecialOffer pizza={specialOfferList}/>:null}
      <ul className={AppCSS.pizzaList}>
        {pizzas.map((pizza) => (
          <Pizza key={pizza.id} pizza={pizza} />
        ))}
      </ul>
    </div>
    </AppStateProvider>
  );
};

export default App;
