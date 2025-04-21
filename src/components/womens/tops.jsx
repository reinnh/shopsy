import { Link } from "react-router-dom";
import { womens } from "../../constants/women-tops";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function ProductGrid() {
  return (
    <section className="relative px-4 py-8 md:px-12 lg:px-20 bg-background text-foreground">
      <h2 className="text-3xl font-bold mb-8 text-center">Latest Arrivals</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {womens.map((product, index) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className={`block hover:scale-[1.02] transition-transform md:m-0 ${index%2===0? '-mt-7':''}`}
          >
            <Card className="rounded-2xl overflow-hidden shadow-md bg-muted/50 dark:bg-muted/70">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full  object-cover hover:scale-105 transition-transform duration-300"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary font-bold text-lg">
                    Ksh {product.price}
                  </span>
                  <span className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-yellow-400 mr-1" /> {index%3>0 ? 4.5 :3.8}
                  </span>
                </div>
                <Button className="w-full text-sm rounded-xl">View</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
