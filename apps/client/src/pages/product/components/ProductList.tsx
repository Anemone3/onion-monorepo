import { ProductResponse } from "@/models/product-interface"

interface ProductListProps {
    products: ProductResponse | undefined
}

export const ProductList = ({products}:ProductListProps) => {
  return (
    <div>
        Product List..
    </div>
  )
}