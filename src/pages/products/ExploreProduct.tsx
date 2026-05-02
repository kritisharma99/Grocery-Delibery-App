import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { categories, productsList } from "../../lib/mockData";
import { useDebounce } from "../../hooks/useDebounce";
import { useFilter } from "../../hooks/useFilter";
import { FilterPanel } from "../../components/FilterPanel";
import ProductCard from "../../components/ProductCard";
import FilterIcon from "../../assets/filter-icon.svg";
import { useNavigate } from "react-router-dom";

export function ExplorePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const searchLower = debouncedSearch.toLowerCase();

  const {
    selectedCategories,
    selectedBrands,
    showFilter,
    setShowFilter,
    toggleCategory,
    toggleBrand,
  } = useFilter();

  const activeFilterCount = selectedCategories.length + selectedBrands.length;

  // ── Filter categories shown in grid ──
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch =
        !searchLower ||
        cat.name.toLowerCase().includes(searchLower) ||
        productsList.some(
          (p) =>
            p.categoryId === cat.id &&
            p.name.toLowerCase().includes(searchLower),
        );
      const matchesFilter =
        selectedCategories.length === 0 ||
        selectedCategories.includes(cat.name);
      return matchesSearch && matchesFilter;
    });
  }, [searchLower, selectedCategories]);

  // ── Filter products (shown when searching or filter active) ──
  const filteredProducts = useMemo(() => {
    const hasSearch = !!debouncedSearch;
    const hasFilter =
      selectedCategories.length > 0 || selectedBrands.length > 0;
    if (!hasSearch && !hasFilter) return [];

    return productsList.filter((p) => {
      const matchesSearch =
        !searchLower || p.name.toLowerCase().includes(searchLower);

      // match category by name — find cat name from categoryId
      const catName = categories.find((c) => c.id === p.categoryId)?.name ?? "";
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(catName);

      return matchesSearch && matchesCategory;
    });
  }, [searchLower, debouncedSearch, selectedCategories, selectedBrands]);

  const showProducts = filteredProducts.length > 0;
  const showEmpty =
    (debouncedSearch || activeFilterCount > 0) &&
    filteredCategories.length === 0 &&
    filteredProducts.length === 0;

  return (
    <main className="relative min-h-screen bg-white px-4 pt-6 pb-24 md:pb-6">
      <h1 className="text-center text-lg font-semibold text-gray-900">
        Find Products
      </h1>

      {/* ── Search + Filter ── */}
      <div className="relative mt-4 flex items-center gap-2">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search Store"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl bg-gray-100 py-3 pl-10 pr-10 text-sm outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter button — relative so dropdown anchors to it */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex h-12 w-12 items-center justify-center transition ${
              showFilter || activeFilterCount > 0
                ? "border-primary bg-primary/10 text-primary"
                : "border-gray-200 bg-white text-gray-500"
            }`}
          >
            <img src={FilterIcon} alt="filter" />
            {activeFilterCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Dropdown filter — anchored below the button */}
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

      {/* Active filter pills */}
      {activeFilterCount > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {[...selectedCategories, ...selectedBrands].map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {tag}
              <button
                onClick={() => {
                  toggleCategory(tag);
                  toggleBrand(tag);
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button
            onClick={() => {
              toggleCategory("__clear__");
              toggleBrand("__clear__");
            }}
            className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-400 hover:text-gray-600"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Categories grid */}
      {!showProducts && (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/category/${cat.id}`)}
                className={`cursor-pointer rounded-2xl border p-4 transition hover:opacity-80 ${cat.bg} ${cat.border} ${
                  selectedCategories.includes(cat.name)
                    ? "ring-2 ring-primary"
                    : ""
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={cat.emoji}
                    alt={cat.name}
                    className="h-14 w-auto object-contain"
                  />
                  <p className="mt-3 text-sm font-semibold text-gray-900">
                    {cat.name}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-2 text-center text-sm text-gray-400">
              No categories found
            </p>
          )}
        </div>
      )}

      {/* Products */}
      {showProducts && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">
              Results
              <span className="ml-2 text-gray-400">
                ({filteredProducts.length})
              </span>
            </h2>
            {activeFilterCount > 0 && (
              <button
                onClick={() => setShowFilter(true)}
                className="text-xs text-primary font-medium"
              >
                Edit filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      )}

      {/* Empty */}
      {showEmpty && (
        <div className="mt-16 flex flex-col items-center gap-3 text-gray-400">
          <span className="text-5xl">🔍</span>
          <p className="text-sm">No results found</p>
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
        </div>
      )}
    </main>
  );
}
