import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  Share2,
  Heart,
  Minus,
  Plus,
  ChevronRight,
} from "lucide-react";
import { productsList } from "../../lib/mockData";
import { useCartStore } from "../../stores/cartStores";
import { useProductStore } from "../../stores/productStores";

export function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const product =
    productsList.find((item) => item.id === Number(id ?? 1)) || productsList[0];

  console.log("P", product, id);
  const addToCart = useCartStore((s) => s.addToCart);
  const updateQty = useCartStore((s) => s.updateQty);
  const cartItems = useCartStore((s) => s.items);
  const toggleFavorite = useProductStore((s) => s.toggleFavorite);
  const favorites = useProductStore((s) => s.favorites);

  const isFavorite = favorites.includes(String(product.id));
  const cartItem = cartItems.find((i) => Number(i.productId) === product.id);
  const [localQty, setLocalQty] = useState(1);
  const [detailOpen, setDetailOpen] = useState(true);
  const [activeDot, setActiveDot] = useState(0);

  const handleAddToBasket = () => {
    addToCart(String(product.id));
    // update to localQty if more than 1
    if (localQty > 1) {
      updateQty(String(product.id), localQty);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      {/* ── Product Image Area ── */}
      <div className="relative bg-gray-50 pb-6 pt-4">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Share2 className="h-4 w-4 text-gray-700" />
          </button>
        </div>

        {/* Image */}
        <div className="mt-4 flex items-center justify-center py-6 text-[120px]">
          {product.image}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setActiveDot(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === activeDot ? "w-5 bg-primary" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col px-5 pt-5">
        {/* Name + Favorite */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-head text-left text-gray-900">
              {product.name}
            </h1>
            {/* <p className="mt-1 text-sm text-gray-400">{product.unit}</p> */}
          </div>
          <button
            onClick={() => toggleFavorite(String(product.id))}
            className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray-100"
          >
            <Heart
              className={`h-5 w-5 transition ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>
        <div>
          <h1 className="text-subheading text-left text-gray-700">
            {product.desc}
          </h1>
          {/* <p className="mt-1 text-sm text-gray-400">{product.unit}</p> */}
        </div>

        {/* Qty + Price */}
        {/* Qty + Price */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocalQty((q) => Math.max(1, q - 1))}
              className="flex h-9 w-9 items-center justify-center transition hover:bg-gray-50"
            >
              <Minus className="h-3.5 w-3.5 text-gray-500" />
            </button>

            <div className="flex h-9 w-12 items-center justify-center rounded-[17px] border border-gray-200 bg-white">
              <span className="text-sm font-semibold text-gray-900">
                {localQty}
              </span>
            </div>

            <button
              onClick={() => setLocalQty((q) => q + 1)}
              className="flex h-9 w-9 items-center justify-center transition hover:bg-gray-50"
            >
              <Plus className="h-3.5 w-3.5 text-primary" />
            </button>
          </div>

          <span className="text-xl font-bold text-gray-900">
            ${(Number(product.price.replace("$", "")) * localQty).toFixed(2)}
          </span>
        </div>

        <div className="my-5 h-px bg-gray-100" />

        {/* Product Detail accordion */}
        <button
          onClick={() => setDetailOpen(!detailOpen)}
          className="flex w-full items-center justify-between"
        >
          <span className="text-base font-semibold text-gray-900">
            Product Detail
          </span>
          <ChevronRight
            className={`h-5 w-5 text-gray-700 transition-transform ${
              detailOpen ? "rotate-90" : ""
            }`}
          />
        </button>
        {detailOpen && (
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            {product.description}
          </p>
        )}

        <div className="my-5 h-px bg-gray-100" />

        {/* Nutritions row */}
        <button className="flex w-full items-center justify-between py-1">
          <span className="text-base font-semibold text-gray-900">
            Nutritions
          </span>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
              100g
            </span>
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </div>
        </button>

        <div className="my-5 h-px bg-gray-100" />

        {/* Review row */}
        <button className="flex w-full items-center justify-between py-1">
          <span className="text-base font-semibold text-gray-900">Review</span>
          <div className="flex items-center gap-2">
            {/* Stars */}
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`text-sm ${s <= 4 ? "text-yellow-400" : "text-gray-200"}`}
                >
                  ★
                </span>
              ))}
            </div>
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </div>
        </button>

        {/* Add To Basket */}
        <div className="mt-auto pb-8 pt-6">
          {cartItem ? (
            <button onClick={() => navigate("/cart")} className="btn-primary">
              Go To Basket
            </button>
          ) : (
            <button onClick={handleAddToBasket} className="btn-primary">
              Add To Basket
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
