import {useState,useEffect} from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/hero/Hero";
import AOS from "aos";
import "aos/dist/aos.css";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import ProductGrid from "../components/womens/tops";
import ProductGridShorts from "@/components/womens/shorts";
import BestProduct from "@/components/advertise/topproduct";

const HomePage = () => {
  const [orderPopup, setOrderPopup] = useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 0,
    });
    AOS.refresh();
  }, []);

  return (
    <>

      <div className="bg-white dark:bg-gray-900 dark:text-white duration-50">
        <Navbar handleOrderPopup={handleOrderPopup} />
        <Hero  />
        <BestProduct/>
        <Banner />
        <ProductGrid/>
        <ProductGridShorts/>
        <Footer />
      </div>
    </>
    );
};

export default HomePage;
