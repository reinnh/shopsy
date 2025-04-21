import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrdersContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { items, removeFromCart } = useCart();
  const { addOrder } = useOrders();
  const [selectedItems, setSelectedItems] = useState(items); // All items in cart initially
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleOrder = () => {
    if (selectedItems.length === 0 || !address) return;

    // Add order to orders context
    addOrder({
      items: selectedItems,
      address,
      total: selectedItems.reduce((acc, item) => acc + item.price * item.qty, 0),
      date: new Date().toISOString(),
    });

    // Remove items from cart after order is placed
    selectedItems.forEach((item) =>
      removeFromCart(item.id, item.selectedSize)
    );

    // Navigate to order confirmation page
    navigate("/order-confirmation");
  };

  return (
    <section className="px-4 md:px-20 py-12 bg-background text-foreground">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* Shipping Address */}
      <div className="mb-6">
        <label htmlFor="address" className="block font-medium mb-2">
          Shipping Address
        </label>
        <textarea
          id="address"
          className="w-full border rounded-xl p-4"
          placeholder="Enter your shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Cart items preview */}
      <div className="space-y-6">
        {selectedItems.map((item) => (
          <div
            key={`${item.id}-${item.selectedSize}`}
            className="border p-4 rounded-xl flex gap-4 items-center"
          >
            <img
              src={item.images[0].url}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">
                Size: {item.selectedSize}
              </p>
              <p className="text-primary font-bold">Ksh {item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <span>{item.qty}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(item.id, item.selectedSize)}
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-10 border-t pt-6 space-y-2">
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total</span>
          <span>
            Ksh{" "}
            {selectedItems.reduce(
              (acc, item) => acc + item.price * item.qty,
              0
            ).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Proceed Button */}
      <Button
        className="w-full mt-4 text-base rounded-xl"
        disabled={selectedItems.length === 0 || !address}
        onClick={handleOrder}
      >
        Confirm Order
      </Button>
    </section>
  );
}
