import { Button } from "@/components/ui/button";
import emtyIcon from "../../../assets/empty.svg";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmptyProps {
  context: string;
}

export const EmptyList = ({ context = "Order history" }: EmptyProps) => {

  const navigate = useNavigate();

  return (
    <div className="absolute left-72 top-[135px] flex flex-col items-center justify-center gap-6 sm:left-48">
      <img className="h-16 w-16" src={emtyIcon} alt="empty state logo" />
      <p className="w-full text-sm text-gray-400">
        Your {context} is waiting to be filled.
      </p>
      <Button onClick={()=> navigate('/collection')}>
        Start Shopping <ArrowRight />
      </Button>
    </div>
  );
};
