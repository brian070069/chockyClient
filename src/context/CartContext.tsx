import { createContext, useReducer } from "react";

export const CartContext = createContext({});

export const initialState = {
  toolsInCart: [],
  subTotals: 0,
};

export const ACTION = {
  //   update
  GETTOOLSINCART: "GETTOOLSINCART",
  ADDTOOLSTOCART: "ADDTOOLSTOCART",
  UPDATESUBTOTALS: "UPDATESUBTOTALS",
  DELETEFROMCART: "DELETEFROMCART",
  RESTORE: "RESTORE",
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION.ADDTOOLSTOCART:
      const currentSubTotal = state.toolsInCart.reduce(
        (total: any, item: any) => total + item.subtotal,
        0
      );

      const updatedToolsInCart1 = [...state.toolsInCart, action.payload];

      const updatedSubTotal1 = currentSubTotal + action.price;

      return {
        ...state,
        toolsInCart: updatedToolsInCart1,
        subTotals: updatedSubTotal1, // Update the subTotal property
      };

    case ACTION.GETTOOLSINCART:
      const subTotals2 = state.toolsInCart.reduce(
        (total: any, item: any) => +total + +item.subtotal,
        0
      );
      return {
        ...state,
        toolsInCart: action.payload,
        subTotals: subTotals2,
      };
    case ACTION.UPDATESUBTOTALS:
      const updatedToolsInCart = state.toolsInCart.map((item: any) => {
        if (item.tool === action.id) {
          return {
            ...item,
            quantity: action.quantity,
            subtotal: action.subtotal,
          };
        }
        return item;
      });

      const updatedSubTotal = updatedToolsInCart.reduce(
        (total: any, item: any) => +total + +item.subtotal,
        0
      );

      return {
        ...state,
        toolsInCart: updatedToolsInCart,
        subTotals: updatedSubTotal, // Update the subTotal property
      };

    case ACTION.DELETEFROMCART:
      const updatedToolsInCart4 = state.toolsInCart.filter(
        (item: any) => item.cart_item_id !== action.cartItemId
      );

      const updatedSubTotal4 = updatedToolsInCart4.reduce(
        (total: any, item: any) => +total + +item.subtotal,
        0
      );

      return {
        ...state,
        toolsInCart: updatedToolsInCart4,
        subTotals: updatedSubTotal4,
      };

    case ACTION.RESTORE:
      return {
        toolsInCart: [],
        subTotals: 0,
      };

    default:
      return state;
  }
};

const CartContextProvider = ({ children }: any) => {
  return (
    <CartContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
