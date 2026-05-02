import { useState } from "react";
import { Plus } from 'lucide-react'
import { useNavigate } from "react-router-dom";

export default function ProductCard({ name, desc, price, image, id }: { name: string; desc: string; price: string; image: string, id: number }) {
    const [added, setAdded] = useState(false)
    const navigate = useNavigate();

   
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm" onClick={() => {
            console.log("Product:", name);
            navigate(`/product/${id}`)
        }}>
            <div className="mb-3 flex h-24 items-center justify-center rounded-xl text-5xl">
                {image}
            </div>
            <p className="text-subheading font-semibold text-gray-900 text-left">{name}</p>
            <p className="mt-0.5 text-sm text-gray-400">{desc}</p>
            <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">{price}</span>
                <button
                    onClick={() => setAdded(!added)}
                    className={`flex h-[45px] w-[45px] items-center justify-center rounded-lg transition ${added ? 'bg-gray-200 text-gray-500' : 'bg-[#53b175] text-white'
                        }`}
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}