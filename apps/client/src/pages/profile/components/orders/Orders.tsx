import { OrderItem } from "./OrderItem";

export const Orders = () => {
  return (
    <>
      <h2 className="text-base font-semibold">Orders</h2>
      <div className="flex flex-col divide-y divide-gray-200">
        <OrderItem />
        <OrderItem />
      </div>
    </>
  );
};
