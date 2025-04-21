import { womens } from "../../constants/women-tops.js";
import { womenShorts } from "../../constants/women-shorts.js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const bestProducts = [...womens.slice(0, 3), ...womenShorts.slice(1, 4)];

export default function BestProductGrid() {
  return (
    <section className="px-4 py-10 md:px-12 lg:px-20 bg-background text-foreground">
      <h2 className="text-3xl font-bold mb-8 text-center">🔥 Top Picks for You</h2>
      <div className="grid grid-cols-3  md:grid-cols-3 gap-2 md:gap-6">
        {bestProducts.map((product, idx) => (
          <Link
          to={`/product/${product.id}`}
            key={product.id}
          
          >
            <Card className="rounded-3xl overflow-hidden border border-muted-foreground/20 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-md bg-muted/40 dark:bg-muted/60">
              <div className="relative group">
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full  md:h-64  object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute md:top-3 top-1 left-1 md:left-3 bg-pink-600 text-white md:text-xs md:px-2 md:py-1 text-[7px] px-1 rounded-full shadow-md">
                  New Drop
                </Badge>
              </div>
              <CardContent className="md:p-5   flex flex-col items-start m-0 p-2">
                <h3 className=" font-semibold line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground  line-clamp-1 hidden md:block ">
                  {product.description}
                </p>
                <Button className="hidden md:block w-full rounded-xl text-sm">Add to Cart</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
