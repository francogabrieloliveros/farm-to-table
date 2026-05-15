import { type Product } from "@/types/Product";
import { useState } from "react";
import { Pencil, Trash2, Leaf, Egg } from "lucide-react";
import { productService } from "@/services/product.service";
import DeleteModal from "./DeleteModal";
import toast from "react-hot-toast";

const InventoryProduct = ({
  item,
  setDummy,
  setShowModal,
  setModalItem,
}: {
  item: Product;
  setDummy: (b: boolean | ((prev: boolean) => boolean)) => void;
  setShowModal: (b: boolean) => void;
  setModalItem: (p: Product) => void;
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const deleteProduct = async () => {
    try {
      await productService.deleteProduct(item._id);
      toast.success(`Product ${item.name} successfully deleted.`);
      setDummy((prev) => !prev);
      setShowDelete(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Something went wrong.");
    }
  };

  return (
    <>
      {showDelete ? (
        <DeleteModal
          deleteProduct={deleteProduct}
          setShowDelete={setShowDelete}
        />
      ) : undefined}
      <div className="border-t flex items-center max-md:pt-5">
        <div className="md:w-8 md:h-8 w-full aspect-square">
          <img
            src={item.imageUrl}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
      </div>
      <p className="font-semibold py-3 md:border-t text-[#1C4419]">
        {item.name}
      </p>
      <div className="md:border-t flex items-center p-2">
        <div className="bg-[#D2E6C9] px-3 py-1 h-6 w-20 font-semibold text-[0.6rem] text-[#55684F] rounded-xl flex gap-1 items-center justify-center">
          {item.type === 1 ? <Leaf size={10} /> : <Egg size={10} />}
          {item.type === 1 ? "CROP" : "POULTRY"}
        </div>
      </div>
      <div className="flex items-center md:border-t">
        <p className="font-semibold text-sm py-3">&#8369;{item.price}</p>
      </div>
      <div className="flex items-center gap-1 md:border-t">
        <div className="w-2 h-2 bg-[#1C4419] rounded-2xl"></div>
        <p className="font-semibold text-xs py-3">{item.quantity}</p>
      </div>
      <div className="flex items-center gap-3 md:border-t max-md:pb-5">
        <button
          className="text-[#42493E]"
          onClick={() => {
            setModalItem(item);
            setShowModal(true);
          }}
        >
          <Pencil size={16} />
        </button>
        <button className="text-[#42493E]" onClick={() => setShowDelete(true)}>
          <Trash2 size={16} />
        </button>
      </div>
    </>
  );
};

export default InventoryProduct;
