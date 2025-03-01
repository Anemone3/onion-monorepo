import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Category } from "@/models/product-interface";

interface CategoriesProps {
  className?: string;
  categories: Category[];
}

export const Categories = ({ className, categories }: CategoriesProps) => {
  if (!categories) return <div>Loading categories..</div>;

  return (
    <div className={`${className} px-4`}>
      <h2>Categories</h2>
      <ul className="my-4 flex flex-col space-y-2 divide-y">
        {categories.map((c) => (
          <CategoryItem key={c.id} value={c.name} />
        ))}
      </ul>
      <h3>Selected Price</h3>
        <Slider/>
    </div>
  );
};

const CategoryItem = ({ value }: { value: string }) => {
  return (
    <li className="flex items-center gap-[10px] pt-3">
      <Checkbox onCheckedChange={()=>{console.log(value)}}/>
      <span>{value}</span>
    </li>
  );
};
