import { BtnToogleQuantity } from "@/shared/components/BtnToogleQuantity";
import { X } from "lucide-react";
import { useState } from "react";

export const CartItem = () => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <article className="flex w-full items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="h-20 w-20">
          <img
            src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
            alt="product image"
            className="h-auto w-full"
          />
        </div>
        <div>
          <h2>Raw Black T-Shirt Lineup</h2>
          <div>
            <span>Color: Cyan</span>
            <span>Size: M</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="mr-4">${(75.00 * quantity).toFixed(2)}</span>
        <BtnToogleQuantity
          onIncrement={() => setQuantity((p) => p + 1)}
          onDecrement={()=> setQuantity((p) => p > 1 ? p - 1 : p)}
          size="32"
          quantity={quantity}
        />
        <button className="flex h-12 w-12 items-center justify-center bg-gray-100 text-gray-500">
          <X />
        </button>
      </div>
    </article>
  );
};
