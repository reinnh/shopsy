import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { womens } from "@/constants/women-tops";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { womenShorts } from "@/constants/women-shorts";

export default function ProductDetail() {
  const { id } = useParams();

  const navigate = useNavigate();
  const { addToCart, items: cartItems } = useCart();
  
  let product;
  if(id.includes('short')) {
    product= womenShorts.find((item) => item.id === id);
  }
  else{
    product=womens.find((item)=>item.id===id);
  }
  const [selectedSize, setSelectedSize] = useState(null);
  const [showModal, setShowModal] = useState(false);

  if (!product) return <p className="text-center pt-20">Product not found.</p>;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({ ...product, selectedSize });
    setShowModal(true);
    setTimeout(() => setShowModal(false), 900);
  };

  return (
    <section className="min-h-screen bg-background text-foreground relative">
      {/* Store Name Header */}
      <header className="fixed top-0 inset-x-0 bg-background border-b z-40 py-4 px-6 text-xl font-bold text-center">
        Maggie's Thrift Store
      </header>

      <div className="pt-24 pb-32 px-4 md:px-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-full rounded-xl object-cover max-h-[500px]"
        />

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-muted-foreground mb-4">{product.description}</p>
          <p className="text-muted-foreground mb-4">Material: {product.fabric.material}</p>
          <p className="text-muted-foreground mb-4">Care: {product.fabric.care}</p>

          {/* Size Selector */}
          <div className="mb-4">
            <p className="mb-1 font-medium">Choose Size:</p>
            <div className="flex gap-2 flex-wrap">
              {product.variants.map((v,i) => (
                <button
                  key={v.sku}
                  className={`border px-4 py-1 rounded-full text-lg transition ${
                    selectedSize === v.size
                      ? "bg-primary text-background"
                      : "hover:bg-muted"
                  } ${!selectedSize && i===1? setSelectedSize('M') :''}
                  `}
                  onClick={() => setSelectedSize(v.size)}
                >
                  {v.size}
                </button>
              ))}
            </div>
              <div className=" font-bold  py-4">Selected Size: {selectedSize}</div>
          </div>

          {/* Price */}
          <div className="text-xl font-bold text-primary mb-2">
            Ksh {product.price}
          </div>

          <div className="text-sm text-muted-foreground mb-6">
            Ships from {product.shipping.shippingFrom}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-background border-t p-4 md:px-16 md:py-6 flex justify-between gap-2 md:gap-4  flex-row">
        <Button
          variant="outline"
          className="flex-1 rounded-xl"
          onClick={() => console.log("Open chat")}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat
        </Button>

        <Button
          className="flex-1 rounded-xl"
          onClick={handleAddToCart}
          disabled={!selectedSize}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>

        <Button
          variant="ghost"
          className="relative"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart className="w-5 h-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-primary text-white w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.reduce((sum, item) => sum + item.qty, 0)}
            </span>
          )}
        </Button>
      </div>

      {/* Modal - Add to Cart Success */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-28 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-xl shadow-lg z-[60]"
          >
            added
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
