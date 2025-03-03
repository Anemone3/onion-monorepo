import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Category } from "@/models/product-interface";

interface CategoriesProps {
  className?: string;
  categories: Category[];
  selectedCategories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Categories = ({
  className,
  categories,
  selectedCategories,
  setCategories,
}: CategoriesProps) => {


  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    setCategories((prev) =>
      checked
        ? [...prev, categoryName]
        : prev.filter((c) => c !== categoryName),
    );
  };


  if (!categories) return <div>Loading categories..</div>;

  return (
    <div className={`${className} w-64 px-4 py-6`}>
      <h2>Categories</h2>
      <ul className="my-4 flex flex-col space-y-2 divide-y">
        {categories &&
          categories.map((c) => (
            <CategoryItem
              key={c.id}
              value={c.name}
              isChecked={selectedCategories.includes(c.name)}
              onCheckedChange={handleCategoryChange}
            />
          ))}
      </ul>
      <div className="flex flex-col gap-6 py-9">
        <h3>Selected Price</h3>
        <Slider />
      </div>
    </div>
  );
};

const CategoryItem = ({
  value,
  isChecked,
  onCheckedChange,
}: {
  value: string;
  isChecked: boolean;
  onCheckedChange: (value: string, checked: boolean) => void;
}) => {
  return (
    <li className="flex items-center gap-[10px] pt-3">
      <Checkbox
        checked={isChecked}
        onCheckedChange={(checked: boolean) => onCheckedChange(value, checked)}
      />
      <span>{value}</span>
    </li>
  );
};
