import { useContext } from "react";
import { AppContext } from '../App'
import { Link } from "react-router-dom";

export default function SearchResults() {
  const { searchTerm, searchResults } = useContext(AppContext);
  console.log(searchResults);
  
  
  if(!searchResults || !searchTerm) {
    return(
        <p>No Match Found</p>
    )
  }

  return (
    <section className="p-4 md:p-8">
      <h2 className="text-xl font-bold mb-6">
        Results for: <span className="text-primary">"{searchTerm}"</span>
      </h2>
      {searchResults.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="bg-muted rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-sm font-bold text-primary">
                    Ksh {product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </section>
  );
}
