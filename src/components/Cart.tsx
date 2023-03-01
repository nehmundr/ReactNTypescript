import React, { createRef } from "react";
import CartCSS from "./Cart.module.css";
import { FiShoppingCart } from "react-icons/fi";
import { AppStateContext } from "./AppState";

interface Props {}

interface State {
  isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
  #containerRef:React.RefObject<HTMLDivElement>
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.#containerRef=createRef();
  }

  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if ((e.target as HTMLElement).nodeName === "SPAN") {
    }
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  handleOutsideClick=(e:MouseEvent)=>{
    if(this.#containerRef.current && !this.#containerRef.current.contains(e.target as Node)){
      this.setState({isOpen:false});
    }
      
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick)
  }

  componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleOutsideClick)
  }

  render(): React.ReactNode {
    return (
      <AppStateContext.Consumer>
        {(state) => {
            const itemQuantity=state.cart.items.reduce((sum,item)=>sum+item.quantity,0);
          return (
            <div className={CartCSS.container} ref={this.#containerRef}>
              <button
                type="button"
                className={CartCSS.button}
                onClick={this.handleClick}
              >
                <FiShoppingCart />
                <span>{itemQuantity} pizza(s)</span>
              </button>
              <div
                className={CartCSS.cartDropDown}
                style={{ display: this.state.isOpen ? "block" : "none" }}
              >
                <ul>
                  {state.cart.items.map(item=><li key={item.id}>{item.name} &times; {item.quantity}</li>)}
                </ul>
              </div>
            </div>
          );
        }}
      </AppStateContext.Consumer>
    );
  }
}

export default Cart;
