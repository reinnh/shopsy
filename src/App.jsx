import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home"
import { createContext } from "react";
import ProductDetail from "./pages/productdetail";
import { CartProvider } from "./context/cartcontext";
import CartPage from "./pages/cart";
import { OrdersProvider } from './context/ordercontext'
import { useState } from "react";
import { womens } from "./constants/women-tops";
import { womenShorts } from "./constants/women-shorts";
import SearchResults from "./pages/serachresults";
export const AppContext =createContext();

 function  App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const allProducts = [...womens, ...womenShorts];

  const handleSearch = (term) => {
    const lower = term.toLowerCase();
    const results = allProducts.filter((p) =>
      p.name.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.categories?.some((cat) => cat.toLowerCase().includes(lower))
    );
    setSearchTerm(term);
    setSearchResults(results);
  };

  return (
    <AppContext.Provider value={{ searchTerm, searchResults, handleSearch }}>
      <CartProvider>
        <OrdersProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
        </OrdersProvider>
      </CartProvider>
    </AppContext.Provider>
  );
}

export default App;


