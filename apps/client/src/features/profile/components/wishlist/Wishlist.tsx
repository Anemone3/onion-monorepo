import { EmptyList } from "../EmptyList";
import { WishlistItem } from "./WishlistItem";

export const Wishlist = () => {
  return (
    <>
      {/* <h2 className="text-base font-semibold">Wishlist</h2>
      <div className="flex flex-col divide-y divide-gray-200">
        <WishlistItem/>
        <WishlistItem/>
        <WishlistItem/> 
      </div> */}
        <EmptyList context="Wish List"/>
    </>
  );
};
