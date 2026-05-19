import { Edit, Trash2 } from "lucide-react";
import { type Product, ProductType } from "@/types/Product";
import { productService } from "@/services/product.service";
import { DeleteModal } from "./DeleteModal";
import { useState } from "react";
import toast from "react-hot-toast";

type InventoryProductProps = {
  item: Product;
  setDummy: React.Dispatch<React.SetStateAction<boolean>>;
  setModalItem: (item: Product | null) => void;
  setShowModal: (show: boolean) => void;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);

export default function InventoryProduct({
  item,
  setDummy,
  setModalItem,
  setShowModal,
}: InventoryProductProps) {
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await productService.deleteProduct(item._id);
      toast.success("Product deleted successfully");
      setDummy((prev) => !prev);
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setShowDelete(false);
    }
  };

  return (
    <>
      <DeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete ${item.name}? This action cannot be undone.`}
      />

      <tr className="hover:bg-[#FCFBF9] transition-colors group">
        <td className="px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E8E7E4] overflow-hidden border border-[#F4F3F1] shrink-0">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span className="font-bold text-[#1C4419] line-clamp-1">{item.name}</span>
          </div>
        </td>
        <td className="px-4 py-5">
          <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider bg-[#F4F3F1] px-2 py-1 rounded-md border border-[#E8E7E4]">
            {Object.keys(ProductType).find(key => ProductType[key as keyof typeof ProductType] === item.type)}
          </span>
        </td>
        <td className="px-4 py-5 font-black text-[#1C4419]">
          {formatCurrency(item.price)}
        </td>
        <td className="px-4 py-5">
          <div className="flex flex-col gap-1.5 w-32">
            <div className="flex justify-between text-[10px] font-black uppercase">
              <span className={item.quantity < 10 ? "text-rose-600" : "text-[#1C4419]"}>
                {item.quantity} in stock
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#F4F3F1] rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${item.quantity < 10 ? "bg-rose-500" : "bg-[#1C4419]"}`}
                style={{ width: `${Math.min((item.quantity / 100) * 100, 100)}%` }}
              />
            </div>
          </div>
        </td>
        <td className="px-8 py-5 text-right">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => {
                setModalItem(item);
                setShowModal(true);
              }}
              className="p-2 rounded-lg text-[#6B7280] hover:bg-[#E8F5E2] hover:text-[#1C4419] transition-all"
              title="Edit Product"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => setShowDelete(true)}
              className="p-2 rounded-lg text-[#6B7280] hover:bg-rose-50 hover:text-rose-600 transition-all"
              title="Delete Product"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
