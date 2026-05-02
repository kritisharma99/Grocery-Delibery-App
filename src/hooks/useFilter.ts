// src/hooks/useFilter.ts
import { useState } from 'react'

export function useFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [showFilter, setShowFilter] = useState(false)

  const toggleCategory = (val: string) => {
    if (val === '__clear__') return setSelectedCategories([])
    setSelectedCategories((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    )
  }

  const toggleBrand = (val: string) => {
    if (val === '__clear__') return setSelectedBrands([])
    setSelectedBrands((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    )
  }

  return {
    selectedCategories,
    selectedBrands,
    showFilter,
    setShowFilter,
    toggleCategory,
    toggleBrand,
  }
}