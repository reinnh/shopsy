import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./cartdrower";

export default function FloatingCart() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <div
        className="fixed bottom-4 right-4 md:hidden z-50"
        onClick={() => setOpen(true)}
      >
        <div className="relative bg-primary p-4 rounded-full shadow-lg cursor-pointer">
          <ShoppingCart className="text-white w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </div>

      {open && <CartDrawer onClose={() => setOpen(false)} />}
    </>
  );
}
