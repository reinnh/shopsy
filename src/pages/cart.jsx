import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);

  // Recalculate cart total
  const getSelectedItems = () =>
    items.filter((item) =>
      selectedItems.some(
        (sel) => sel.id === item.id && sel.selectedSize === item.selectedSize
      )
    );

  const selected = getSelectedItems();
  const subtotal = selected.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const delivery = selected.length ? 50 : 0;
  const discount=tax
  const total = subtotal + tax + delivery - discount;
  console.log(discount);
  

  // Toggle item selection
  const toggleSelect = (item) => {
    const exists = selectedItems.some(
      (sel) => sel.id === item.id && sel.selectedSize === item.selectedSize
    );
    if (exists) {
      setSelectedItems((prev) =>
        prev.filter(
          (sel) => !(sel.id === item.id && sel.selectedSize === item.selectedSize)
        )
      );
    } else {
      setSelectedItems((prev) => [...prev, { id: item.id, selectedSize: item.selectedSize }]);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("cartSelectedItems");
    if (stored) {
      setSelectedItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartSelectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  if (!items.length) {
    return <p className="text-center pt-20 text-lg">🛒 Your cart is empty.</p>;
  }

  return (
   <section className="flex items-center w-full justify-center">
     <div className="px-4 md:px-20 py-12 bg-background text-foreground max-w-4xl">
      <h2 className="text-2xl font-bold mb-6"> Cart Items({items.length})</h2>
      <div className="space-y-6">
        {items.map((item) => {
          const isSelected = selectedItems.some(
            (sel) => sel.id === item.id && sel.selectedSize === item.selectedSize
          );
          return (
            <div
              key={`${item.id}-${item.selectedSize}`}
              className="border p-4 rounded-xl flex  gap-4 items-center flex-col"
            >
              <div className="flex  w-full gap-x-5">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelect(item)}
                className="accent-primary w-5 h-5"
              />
              <img
                src={item.images[0].url}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className=" ">
                <h3 className="">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  Size: {item.selectedSize}
                </p>
            <div className="flex-row-reverse flex justify-between">
            <p className="text-primary font-bold ">Ksh {item.price}</p>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 rounded bg-muted"
                  onClick={() =>
                    updateQuantity(item.id, item.selectedSize, item.qty - 1)
                  }
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  className="px-2 rounded bg-muted"
                  onClick={() =>
                    updateQuantity(item.id, item.selectedSize, item.qty + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
              </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(item.id, item.selectedSize)}
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </Button>
            </div>
          );
        })}
      </div>

      <div className="mt-10 border-t pt-6 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Ksh {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (8%)</span>
          <span>Ksh {tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>Ksh {delivery.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>Ksh {discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total</span>
          <span>Ksh {total.toFixed(2)}</span>
        </div>
        <Button
          className="w-full mt-4 text-base rounded-xl"
          disabled={selected.length === 0}
          onClick={() => {
            alert("Ready to checkout selected items 💸");
          }}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
   </section>
  );
}
