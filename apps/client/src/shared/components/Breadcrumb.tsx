import { Link } from "react-router-dom";
import { Container } from "./Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadCrumbProps {
  title?: string;
  reference?: string;
  location: string;
  className?: string;
}

export const Breadcrumbs = ({
  location,
  reference = "Ecommerce",
  title = "",
  className = "bg-slate-100  py-10",
}: BreadCrumbProps) => {
  return (
    <div className={`${className}`}>
      <Container>
        <h2 className="pb-2 text-2xl font-bold">{title}</h2>
        <Breadcrumb className="flex items-center gap-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-gray-500" asChild>
                <Link to="/">{reference}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="font-semibold text-slate-950" asChild>
                <Link to="/">{location}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
          {/* <ChevronRight className="mt-auto h-5 w-5 text-gray-500" /> */}
        </Breadcrumb>
      </Container>
    </div>
  );
};
