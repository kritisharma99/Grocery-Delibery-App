import { X, Check } from 'lucide-react'

const categories = ['Eggs', 'Noodles & Pasta', 'Chips & Crisps', 'Fast Food', 'Fresh Fruits', 'Vegetables', 'Beverages', 'Dairy']

interface FilterPanelProps {
  selectedCategories: string[]
  selectedBrands: string[]
  onToggleCategory: (val: string) => void
  onToggleBrand: (val: string) => void
  onApply: () => void
  onClose: () => void
  variant?: 'sheet' | 'inline' | 'dropdown'
}

function CheckItem({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="flex w-full items-center gap-3 py-2.5 text-left">
      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
        checked ? 'border-[#53b175] bg-[#53b175]' : 'border-gray-300 bg-white'
      }`}>
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </div>
      <span className={`text-sm transition ${checked ? 'font-semibold text-[#53b175]' : 'text-gray-700'}`}>
        {label}
      </span>
    </button>
  )
}

export function FilterPanel({
  selectedCategories,
  selectedBrands,
  onToggleCategory,
  onToggleBrand,
  onApply,
  onClose,
  variant = 'sheet',
}: FilterPanelProps) {

  const content = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="text-base font-bold text-gray-900">Filters</h2>
        <button
          onClick={() => { onToggleCategory('__clear__'); onToggleBrand('__clear__') }}
          className="text-xs font-semibold text-[#53b175]"
        >
          Clear all
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="mb-1 mt-2 text-sm font-bold text-gray-900">Categories</h3>
        <div className="divide-y divide-gray-50">
          {categories.map((cat) => (
            <CheckItem key={cat} label={cat} checked={selectedCategories.includes(cat)} onToggle={() => onToggleCategory(cat)} />
          ))}
        </div>
      </div>

      {/* Apply */}
      <div className="shrink-0 pt-4">
        <button onClick={onApply} className="btn-primary">
          Apply Filter
          {(selectedCategories.length + selectedBrands.length) > 0 && (
            <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
              {selectedCategories.length + selectedBrands.length}
            </span>
          )}
        </button>
      </div>
    </div>
  )

  // ── Dropdown (desktop + mobile) ──
// ── Dropdown (desktop + mobile) ──
if (variant === 'dropdown') {
    return (
      <>
        <div className="fixed inset-0 z-40" onClick={onClose} />
        <div
          className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl"
          style={{ maxHeight: '70vh', display: 'flex', flexDirection: 'column' }}
        >
          {/* Header */}
          <div className="mb-2 shrink-0 flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-gray-900">Filters</h2>
            <button
              onClick={() => { onToggleCategory('__clear__'); onToggleBrand('__clear__') }}
              className="text-xs font-semibold text-[#53b175]"
            >
              Clear all
            </button>
          </div>
  
          {/* ✅ Scrollable middle — flex-1 + overflow-y-auto */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <h3 className="mb-1 mt-2 text-sm font-bold text-gray-900">Categories</h3>
            <div className="divide-y divide-gray-50">
              {categories.map((cat) => (
                <CheckItem
                  key={cat}
                  label={cat}
                  checked={selectedCategories.includes(cat)}
                  onToggle={() => onToggleCategory(cat)}
                />
              ))}
            </div>
          </div>
  
          {/* ✅ Apply — shrink-0 keeps it always visible at bottom */}
          <div className="shrink-0 border-t border-gray-100 pt-3">
            <button onClick={onApply} className="btn-primary">
              Apply Filter
              {(selectedCategories.length + selectedBrands.length) > 0 && (
                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
                  {selectedCategories.length + selectedBrands.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </>
    )
  }

  // ── Mobile bottom sheet ──
  if (variant === 'sheet') {
    return (
      <>
        <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />
        <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white px-5 pt-5"
          style={{ height: '85vh', paddingBottom: 'calc(env(safe-area-inset-bottom) + 80px)' }}
        >
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-200" />
          {content}
        </div>
      </>
    )
  }

  // ── Desktop inline ──
  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm">
      {content}
    </div>
  )
}