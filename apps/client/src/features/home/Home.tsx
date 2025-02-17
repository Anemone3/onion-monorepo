import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import hero from "../../assets/hero-banner.png";
import { Container } from "@/shared/components/Container";
import { useNavigate } from "react-router-dom";
export const Home = () => {


  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-hidden border border-slate-700 bg-gray-100">
      <Container>
        <div className="grid h-[440px] grid-cols-2">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Fresh Arrivals Online
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Discover Our Newest Collection Today.
            </p>
            <Button onClick={()=> navigate('collection')} className="mt-12 h-11 bg-black px-7 text-white hover:bg-gray-800">
              View Collection <ArrowRight />
            </Button>
          </div>
          <div className="relative">
            <div className="absolute bottom-0 right-20 h-80 w-80 rounded-[50%] bg-gray-200"></div>
            <img
              src={hero}
              alt="baner"
              className="absolute bottom-0 right-20 z-40 h-96"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
