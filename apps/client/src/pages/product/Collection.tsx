import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/api/product.api";
import { Breadcrumbs } from "@/shared/components/Breadcrumb";

import { Categories } from "./components/Categories";
import { ProductList } from "./components/ProductList";
import { Container } from "@/shared/components/Container";

// interface ProductState {
//   filter: string;
//   products: ProductResponse;
// }

export const Collection = () => {
  const { data: productsAll, isLoading } = useGetProductsQuery();
  const { data: categories } = useGetCategoriesQuery();

  // const [products, setProducts] = useState<ProductState | null>(() =>
  //   productsAll
  //     ? {
  //         filter: "all",
  //         products: productsAll,
  //       }
  //     : null,
  // );

  if (isLoading && !productsAll && !categories) return <div>Loading...</div>;




  return (
    <>
      <Breadcrumbs className="bg-gray-100 pb-[18px] pt-3" location="Search" />
      <Container>
        <div className="flex w-full max-w-full flex-1 gap-5">
          <Categories
            className="h-full w-1/5 border border-gray-900"
            categories={categories!}
          />
          <ProductList products={productsAll} />
        </div>
      </Container>
    </>
  );
};
