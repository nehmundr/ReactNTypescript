import React from "react";
import { CartItem, useDispatch } from "./AppState";

export interface AddToCartProps {
  addToCart: (pizza: Omit<CartItem, "quantity">) => void;
}

function withAddToCart<OriginalProps extends AddToCartProps>(
  ChildComponent: React.ComponentType<OriginalProps>
) {
  const AddToCartHOC = (props: Omit<OriginalProps, keyof AddToCartProps>) => {
    const dispatch = useDispatch();

    const addToCartHandler: AddToCartProps["addToCart"] = (pizza) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          item: pizza,
        },
      });
    };
    return (
      <ChildComponent
        {...(props as OriginalProps)}
        addToCart={addToCartHandler}
      />
    );
  };
  return AddToCartHOC;
}

export default withAddToCart;

export const WithAddToCartProps: React.FC<{children:(props:AddToCartProps)=>JSX.Element}> = ({ children }) => {
  const dispatch = useDispatch();

  const addToCart: AddToCartProps["addToCart"] = (pizza) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        item: pizza,
      },
    });
  };

  return children({addToCart})
};

//custom hook

export const useAddToCart=()=>{
    const dispatch = useDispatch();

  const addToCart: AddToCartProps["addToCart"] = (pizza) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        item: pizza,
      },
    });
  };
  return addToCart;
}
