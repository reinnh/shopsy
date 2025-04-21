import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartDrawer({ onClose }) {
  const { items, removeFromCart } = useCart();

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-end md:hidden">
      <div className="w-80 bg-background h-full p-4 shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Your cart is empty</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.qty}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
