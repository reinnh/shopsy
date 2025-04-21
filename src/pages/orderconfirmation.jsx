import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Navigate back to home after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="px-4 py-12 bg-background text-foreground text-center">
      <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
      <p>Your order will be processed shortly. Thank you for shopping with us!</p>
    </section>
  );
}
