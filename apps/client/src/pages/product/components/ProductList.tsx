import { ProductResponse } from "@/models/product-interface";
import { LazyLoadImage } from "react-lazy-load-image-component";
interface ProductListProps {
  products: ProductResponse[] | undefined;
}

export const ProductList = ({ products }: ProductListProps) => {
  console.log(products);

  return (
    <div>
      Product List
      {products &&
        products.map((product) => (
          <ProductCardItem key={product.id} product={product} />
        ))}
    </div>
  );
};

const ProductCardItem = ({ product }: { product: ProductResponse }) => {
  return (
    <div>
      Product Item
      {product.name}
      <LazyLoadImage src={product.image} effect="opacity" className="w-full h-auto" />
    </div>
  );
};
