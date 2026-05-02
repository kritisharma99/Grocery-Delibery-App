import { Plus, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/cartStores";

export default function ProductCard({
  name,
  desc,
  price,
  image,
  id,
}: {
  name: string;
  desc: string;
  price: string;
  image: string;
  id: number;
}) {
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart)
  const cartItems = useCartStore((s) => s.items)

  const isInCart = cartItems.some((item) => item.productId === String(id))

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isInCart) {
      addToCart(String(id))
    }
  }

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="cursor-pointer rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-3 flex h-24 items-center justify-center rounded-xl text-5xl">
        {image}
      </div>

      <p className="text-left text-sm font-semibold text-gray-900">{name}</p>
      <p className="mt-0.5 text-xs text-gray-400">{desc}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-base font-bold text-gray-900">{price}</span>

        <button
          onClick={handleAddToCart}
          className={`flex h-[45px] w-[45px] items-center justify-center rounded-xl transition ${
            isInCart
              ? "bg-primary/10 text-primary"
              : "bg-primary text-white hover:bg-primary-hover"
          }`}
        >
          {isInCart
            ? <Check className="h-4 w-4" />
            : <Plus className="h-4 w-4" />
          }
        </button>
      </div>
    </div>
  )
}