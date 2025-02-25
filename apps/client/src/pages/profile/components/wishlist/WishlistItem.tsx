import { Button } from "@/components/ui/button";

export const WishlistItem = () => {
  return (
    <article className="flex w-full items-center justify-between py-8">
      <div className="flex gap-8">
        <div className="h-20 w-20">
          <img
            src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
            alt="product image"
            className="h-auto w-full"
          />
        </div>
        <div className="flex flex-col gap-[3px]">
          <h1 className="text-base font-bold">Raw Black T-Shirt Lineup</h1>
          <p className="pb-1 text-sm font-semibold text-gray-400">
            Added On: 27 July 2023
          </p>
          <span className="font-semibold cursor-pointer text-sm">Remove Item</span>
        </div>
      </div>
      <div className="mr-3 flex items-center gap-8">
        <p className="font-semibold">$75.00</p>
        <Button className="border border-gray-950 bg-white font-semibold text-gray-950 h-11 w-28 hover:text-white">
          Add to cart
        </Button>
      </div>
    </article>
  );
};
