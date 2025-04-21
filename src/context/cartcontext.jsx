import { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

// Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const exists = state.items.find(item => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize);
      if (exists) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && item.selectedSize === action.payload.selectedSize
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(item => !(item.id === action.payload.id && item.selectedSize === action.payload.selectedSize)),
      };

    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && item.selectedSize === action.payload.selectedSize
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };

    default:
      return state;
  }
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = product => dispatch({ type: "ADD_TO_CART", payload: product });
  const removeFromCart = (id, selectedSize) => dispatch({ type: "REMOVE_FROM_CART", payload: { id, selectedSize } });
  const  updateQuantity = (id, selectedSize, qty) => dispatch({ type: "UPDATE_QTY", payload: { id, selectedSize, qty } });

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems: state.items.reduce((sum, item) => sum + item.qty, 0),
    subtotal: state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
  };

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.items));
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
