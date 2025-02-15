import { Minus, Plus } from "lucide-react";

interface BtnToogleProps {
    size: string;
    quantity: number;
    onIncrement: () => void;
    onDecrement:() => void;
}

export const BtnToogleQuantity = ({size,quantity,onDecrement,onIncrement}:BtnToogleProps) => {
  return (
    <div className={`flex h-12 w-${size}  items-center justify-between border border-gray-400`}>
      <button onClick={onDecrement} className="h-full p-3 text-gray-400 active:bg-gray-300 active:text-gray-800">
        <Minus className="h-4 w-4" />
      </button>
      <span className="mx-auto">{quantity}</span>
      <button onClick={onIncrement} className="h-full p-3 text-gray-400 active:bg-gray-300 active:text-gray-800">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};
