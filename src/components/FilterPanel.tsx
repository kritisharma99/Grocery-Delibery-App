import { X, Check } from "lucide-react"

const FILTER_CATEGORIES = [
  "Eggs",
  "Noodles & Pasta",
  "Chips & Crisps",
  "Fast Food",
  "Fresh Fruits",
  "Vegetables",
  "Beverages",
  "Dairy",
]


interface FilterPanelProps {
  selectedCategories: string[]
  selectedBrands: string[]
  onToggleCategory: (val: string) => void
  onToggleBrand: (val: string) => void
  onApply: () => void
  onClose: () => void
  variant?: "sheet" | "inline" | "dropdown"
}

function CheckItem({
  label,
  checked,
  onToggle,
}: {
  label: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center gap-3 py-2.5 text-left"
    >
      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
          checked
            ? "border-primary bg-primary"
            : "border-gray-300 bg-white"
        }`}
      >
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </div>
      <span
        className={`text-sm transition ${
          checked
            ? "font-semibold text-primary"
            : "font-medium text-gray-700"
        }`}
      >
        {label}
      </span>
    </button>
  )
}

function FilterContent({
  selectedCategories,
  selectedBrands,
  onToggleCategory,
  onToggleBrand,
  onApply,
  onClose,
  showCloseInHeader = false,
}: FilterPanelProps & { showCloseInHeader?: boolean }) {
  const activeCount = selectedCategories.length + selectedBrands.length

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="relative flex items-center justify-center border-b border-gray-100 pb-3">
        {showCloseInHeader && (
          <button
            onClick={onClose}
            className="absolute left-0 flex h-8 w-8 items-center justify-center"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        )}
        <h2 className="text-base font-semibold text-gray-900">Filters</h2>
        <button
          onClick={() => {
            onToggleCategory("__clear__")
            onToggleBrand("__clear__")
          }}
          className="absolute right-0 text-xs font-semibold text-primary"
        >
          Clear all
        </button>
      </div>

      {/* Scrollable body */}
      <div className="min-h-0 flex-1 overflow-y-auto py-2">
        <h3 className="mb-2 mt-3 text-sm font-bold text-gray-900">
          Categories
        </h3>
        <div className="flex flex-col">
          {FILTER_CATEGORIES.map((cat) => (
            <CheckItem
              key={cat}
              label={cat}
              checked={selectedCategories.includes(cat)}
              onToggle={() => onToggleCategory(cat)}
            />
          ))}
        </div>
      </div>

      {/* Apply */}
      <div className="shrink-0 border-t border-gray-100 pt-4">
        <button onClick={onApply} className="btn-primary">
          Apply Filter
          {activeCount > 0 && (
            <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
              {activeCount}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

export function FilterPanel({
  selectedCategories,
  selectedBrands,
  onToggleCategory,
  onToggleBrand,
  onApply,
  onClose,
  variant = "sheet",
}: FilterPanelProps) {

  // ── Dropdown ──
  if (variant === "dropdown") {
    return (
      <>
        <div className="fixed inset-0 z-40" onClick={onClose} />
        <div className="absolute right-0 top-full z-50 mt-2 flex max-h-[70vh] w-72 flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
          <FilterContent
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            onToggleCategory={onToggleCategory}
            onToggleBrand={onToggleBrand}
            onApply={onApply}
            onClose={onClose}
          />
        </div>
      </>
    )
  }

  // ── Mobile sheet ──
  if (variant === "sheet") {
    return (
      <>
        <div className="fixed inset-0 z-40 bg-black/10" onClick={onClose} />
        <div className="fixed inset-0 z-50 flex flex-col bg-surface px-5 py-4">
          <FilterContent
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            onToggleCategory={onToggleCategory}
            onToggleBrand={onToggleBrand}
            onApply={onApply}
            onClose={onClose}
            showCloseInHeader
          />
        </div>
      </>
    )
  }

  // ── Desktop inline ──
  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-card">
      <FilterContent
        selectedCategories={selectedCategories}
        selectedBrands={selectedBrands}
        onToggleCategory={onToggleCategory}
        onToggleBrand={onToggleBrand}
        onApply={onApply}
        onClose={onClose}
      />
    </div>
  )
}