import { Breadcrumbs } from "@/shared/components/Breadcrumb";
import boxSucess from "../../assets/sucess.svg";
import boxFailed from "../../assets/failed.svg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const AfterPayment = () => {
  const status = "success";

  const isSuccess = status === "success";

  const contextTitle: string = isSuccess ? "Successful Order" : "Failed Order";

  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col xl:min-h-[calc(100vh-77px)]">
      <Breadcrumbs
        title={contextTitle}
        className={isSuccess ? "bg-green-200" : "bg-red-100"}
        location={contextTitle}
      />
      <div className="flex flex-grow flex-col items-center justify-center text-center">
        <img src={isSuccess ? boxSucess : boxFailed} alt="status order" />
        {isSuccess ? (
          <div className="py-4">
            <h2 className="text-2xl font-bold tracking-wide">
              Thank you for shopping
            </h2>
            <p className="py-4 text-gray-500">
              Your order has been succesfully placed and is now <br />
              beign processed.
            </p>
            <Button className="mx-auto mt-9 h-11 w-48 font-semibold">
              Go to my account <ArrowRight />
            </Button>
          </div>
        ) : (
          <div className="py-4">
            <h2 className="text-2xl font-bold tracking-wide">
              Oops! There was an issue
            </h2>
            <p className="py-4 text-gray-500">
              Oops! There was a problem processing your order.
              <br />
              Please review the details and try again
            </p>
            <Button className="mx-auto mt-9 h-11 w-48 font-semibold">
              Reorder <ArrowRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
