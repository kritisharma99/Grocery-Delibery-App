import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Search, SlidersHorizontal } from "lucide-react";
import { categories, productsList } from "../../lib/mockData";
import { useFilter } from "../../hooks/useFilter";
import { FilterPanel } from "../../components/FilterPanel";
import ProductCard from "../../components/ProductCard";
import { useDebounce } from "../../hooks/useDebounce";

export function CategoryPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const category = categories.find((c) => String(c.id) === id);

  const {
    selectedCategories,
    selectedBrands,
    showFilter,
    setShowFilter,
    toggleCategory,
    toggleBrand,
  } = useFilter();

  const activeFilterCount = selectedCategories.length + selectedBrands.length;

  const products = useMemo(() => {
    return productsList.filter((p) => {
      const inCategory = p.categoryId === Number(id);
      const matchesSearch =
        !debouncedSearch ||
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      return inCategory && matchesSearch;
    });
  }, [id, debouncedSearch]);

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="relative flex items-center border-b border-gray-100 px-5 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-bold text-gray-900">
          {category?.name ?? "Products"}
        </h1>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-5 py-3">
        {/* Search */}
        <div className="relative flex-1 flex items-center gap-3 rounded-2xl bg-gray-100 px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Store"
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Filter button */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition ${
              activeFilterCount > 0
                ? "border-primary bg-primary/10 text-primary"
                : "border-gray-200 bg-white text-gray-500"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {activeFilterCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Dropdown filter */}
          {showFilter && (
            <FilterPanel
              variant="dropdown"
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              onToggleCategory={toggleCategory}
              onToggleBrand={toggleBrand}
              onApply={() => setShowFilter(false)}
              onClose={() => setShowFilter(false)}
            />
          )}
        </div>
      </div>

      {/* Products grid */}
      <div className="flex-1 overflow-y-auto px-5 pb-24 md:pb-6">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-gray-400">
            <span className="text-5xl">{category?.emoji ?? "🔍"}</span>
            <p className="text-sm">No products found</p>
            {(search || activeFilterCount > 0) && (
              <button
                onClick={() => {
                  setSearch("");
                  toggleCategory("__clear__");
                  toggleBrand("__clear__");
                }}
                className="text-sm font-semibold text-primary"
              >
                Clear search & filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
