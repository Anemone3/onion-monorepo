import { Breadcrumbs } from "@/shared/components/Breadcrumb";

import { Button } from "@/components/ui/button";
import { CartItem } from "./components/CartItem";

const CartPage = () => {
  return (
    <>
      <Breadcrumbs
        title="Cart"
        location="Cart"
        reference="Ecommerce"
        className="bg-slate-100"
      />
      <section className="container mx-auto my-16 flex px-40 lg:gap-40 2xl:gap-64">
        <div className="w-[628px] max-w-full">
          <div className="space-y-4 divide-y divide-gray-200">
            <h3 className="text-xl font-semibold">Your cart</h3>
            <div></div>
          </div>
          <div className="flex flex-col gap-10 py-12">
            <CartItem />
            <CartItem />
          </div>
        </div>
        <div className="w-[341px] flex-1 border border-gray-300 px-6 py-8">
          <h3>Order Summary</h3>
          <div className="divide-y">
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd className="font-medium text-gray-900">$90.00</dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-gray-600">Shipping:</dt>
                <dd className="font-medium text-gray-900">Free</dd>
              </div>

              <div className="flex justify-between pb-6">
                <dt className="text-gray-600">Tax:</dt>
                <dd className="font-medium text-gray-900">$3.00</dd>
              </div>
            </dl>
            <div className="flex justify-between pt-6">
              <dt className="text-gray-600">Total</dt>
              <dd className="font-medium text-gray-900">$100.00</dd>
            </div>
          </div>
          <Button className="my-8 h-11 w-full">Checkout</Button>
          <p className="text-center underline">Continue Shopping</p>
        </div>
      </section>
    </>
  );
};

export default CartPage;
