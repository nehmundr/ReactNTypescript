import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface AppStateValue {
  cart: {
    items: CartItem[];
  };
}

const defaultStateValue: AppStateValue = {
  cart: {
    items: [],
  },
};

interface Action<T> {
  type: T;
}

interface AddToCartAction extends Action<"ADD_TO_CART"> {
  payload: {
    item: Omit<CartItem,'quantity'>;
  };
}

interface InitializeCartAction extends Action<"INITIALIZE_CART"> {
  payload:{
    cart: AppStateValue['cart']
  }
}

const reducer = (state: AppStateValue, action: AddToCartAction | InitializeCartAction) => {
  if (action.type === "ADD_TO_CART") {
    const pizza = action.payload.item;
    const itemExists = state.cart.items.find((item) => item.id === pizza.id);
    return {
      ...state,
      cart: {
        ...state.cart,
        items: itemExists
          ? [
              ...state.cart.items.map((item) => {
                if (item.id === pizza.id) {
                  item.quantity += 1;
                }
                return item;
              }),
            ]
          : [...state.cart.items, { ...pizza, quantity: 1 }],
      },
    };
  }

  else if(action.type === "INITIALIZE_CART"){
    return {...state, cart: action.payload.cart}
  }
  return state;
};

export const AppStateContext = createContext(defaultStateValue);
export const AppDispatchContext = createContext<React.Dispatch<AddToCartAction> | undefined>(undefined);

export const useDispatch = () => {
  const dispatch = useContext(AppDispatchContext);
  if (!dispatch) {
    throw new Error(
      "useDispatch was called outside of the AppSetStateContext provider"
    );
  }
  return dispatch;
};
const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultStateValue);

 

  useEffect(()=>{
    const cart=window.localStorage.getItem('cart');
    if (cart){
      dispatch({
        type: "INITIALIZE_CART",
        payload:{
          cart:JSON.parse(cart)
        }
      })
    }
  },[])

  useEffect(()=>{
    window.localStorage.setItem('cart', JSON.stringify(state.cart))
  },[state.cart])
  
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
