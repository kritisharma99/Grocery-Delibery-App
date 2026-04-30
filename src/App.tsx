import { create } from 'zustand'

type CounterState = {
  count: number
  increment: () => void
  reset: () => void
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}))

function App() {
  const { count, increment, reset } = useCounterStore()

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-slate-900">
          Grocery Delivery App Starter
        </h1>
        <p className="mt-2 text-slate-600">
          Vite + React + TypeScript + Zustand + Tailwind is ready.
        </p>

        <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 p-4">
          <span className="text-slate-700">Counter</span>
          <span className="text-2xl font-bold text-slate-900">{count}</span>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={increment}
            className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700"
          >
            Increment
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-800 hover:bg-slate-100"
          >
            Reset
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
