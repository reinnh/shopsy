import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const { items, removeFromCart } = useCart();
  const { addOrder } = useOrders();
  const [marked, setMarked] = useState({});
  const [success, setSuccess] = useState(false);

  const handleMarkToggle = (id, selectedSize) => {
    const key = `${id}-${selectedSize}`;
    setMarked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckout = () => {
    const selectedItems = items.filter((item) => marked[`${item.id}-${item.selectedSize}`]);

    if (selectedItems.length === 0) return;

    // Add to orders
    addOrder(selectedItems);

    // Remove from cart
    selectedItems.forEach((item) => removeFromCart(item.id, item.selectedSize));

    // Reset UI
    setMarked({});
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <section className="min-h-screen py-10 px-4 md:px-16 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground">No items in cart.</p>
      ) : (
        <div className="space-y-8">
          {items.map((item) => {
            const key = `${item.id}-${item.selectedSize}`;
            const isMarked = marked[key];

            return (
              <div
                key={key}
                className={`flex items-center gap-6 p-4 rounded-xl border shadow-sm transition ${
                  isMarked ? "border-green-500 bg-green-50" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!isMarked}
                  onChange={() => handleMarkToggle(item.id, item.selectedSize)}
                  className="scale-125 accent-primary"
                />
                <img src={item.images[0].url} alt={item.name} className="w-24 h-24 rounded object-cover" />
                <div className="flex-1">
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <p className="text-sm text-muted-foreground">Size: {item.selectedSize}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                </div>
                <div className="font-semibold">Ksh {(item.price * item.qty).toFixed(2)}</div>
              </div>
            );
          })}
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-10 text-right">
          <Button onClick={handleCheckout} disabled={Object.values(marked).every((v) => !v)}>
            Complete Order
          </Button>
        </div>
      )}

      {success && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> Order placed successfully!
        </div>
      )}
    </section>
  );
}
