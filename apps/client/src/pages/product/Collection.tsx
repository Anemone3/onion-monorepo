import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/api/product.api";
import { Breadcrumbs } from "@/shared/components/Breadcrumb";

import { Categories } from "./components/Categories";
import { ProductList } from "./components/ProductList";
import { Container } from "@/shared/components/Container";
import { useState } from "react";

// interface ProductState {
//   filter: string;
//   products: ProductResponse;
// }

export const Collection = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const { data: products, isLoading:isLoadingProducts } = useGetProductsQuery();





  return (
    <>
      <Breadcrumbs className="bg-gray-100 pb-[18px] pt-3" location="Search" />
      <Container>
        <div className="flex w-full max-w-full flex-1 gap-5">
          { 
          (isLoadingProducts && isLoadingCategories) ? (<div>Loading skeleton</div>)
            :(
            <>
            <Categories
            className="h-full w-1/5 border border-gray-900"
            categories={categories!}
            selectedCategories={selectedCategories}
            setCategories={setSelectedCategories}
          />
          <ProductList products={products} />
          </>
            )
          }
        </div>
      </Container>
    </>
  );
};
