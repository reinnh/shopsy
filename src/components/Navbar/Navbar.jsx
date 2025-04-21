// ... all your imports remain the same

import { useState, useRef,useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import LightButton from "../../assets/website/light-mode-button.png";
import DarkButton from "../../assets/website/dark-mode-button.png";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/App";



const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { handleSearch } = useContext(AppContext);
  const [theme, setTheme] = useState("light");

  const onSearch = (e) => {
    e.preventDefault();
    handleSearch(query);
    navigate("/search");
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background text-foreground shadow-sm border-b border-border">
      <div className="container flex items-center justify-between h-16">
        {/* Logo & Store name */}
        <div className="flex items-center gap-2 font-bold text md:text-2xl">
          <img src={Logo} alt="Logo" className="w-10 " />
        </div>

        {/* Right-side (Search + Cart + Theme) */}
        <div className="flex items-center gap-4">
          {/* Search Bar (always visible, responsive sizing) */}
          <form onSubmit={onSearch} className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-gray-300 text-black w-[120px] sm:w-[160px] md:w-[240px] lg:w-[320px] transition-all md:h-10 px-4 text-sm"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1 text-muted-foreground"
            >
            </Button>
          </form>

          {/* Cart */}
          <Link
            to={"/cart"}
            className="relative text-xl p-2 rounded-full bg-primary text-white hover:opacity-90 transition"
          >
            <FaShoppingCart className="text-orange-400" />
          </Link>

          {/* Dark Mode Toggle */}
          <div className="relative w-12 h-12">
            <img
              src={LightButton}
              alt="Light Mode"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`absolute w-12 h-12 top-0 right-0 cursor-pointer transition-opacity duration-300 ${theme === "dark" ? "opacity-0" : "opacity-100"
                }`}
            />
            <img
              src={theme === "light" ? DarkButton : LightButton}
              alt="Dark Mode"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="absolute w-12 h-12 top-0 right-0 cursor-pointer transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
