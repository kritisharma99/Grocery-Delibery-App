export default function CardSkeletonLoader() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 p-3">
      <div className="h-24 w-full rounded-lg bg-gray-200" />
      <div className="mt-3 h-3 w-3/4 rounded bg-gray-200" />
      <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
      <div className="mt-3 flex items-center justify-between">
        <div className="h-4 w-12 rounded bg-gray-200" />
        <div className="h-8 w-8 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

export function BannerSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-gray-200 px-5 py-6 h-[120px]" />
  );
}

export function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-center pt-6 animate-pulse">
      <div className="h-6 w-6 rounded bg-gray-200 mb-2" />
      <div className="h-4 w-32 rounded bg-gray-200" />
    </div>
  );
}
