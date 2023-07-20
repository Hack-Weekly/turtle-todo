"use client";

import { categoryFilters } from "@/types/common.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const handleTags = (item: string) => {
    router.push(`${pathName}?category=${item}`);
  };

  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleTags(filter)}
            className={`${category === filter
              ? "opacity-100 font-medium"
              : "opacity-30 font-normal"
              } pr-4 mt-6 mb-2 text-lg`}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
