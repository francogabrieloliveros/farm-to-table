import { X, CloudUpload } from "lucide-react";
import { useState, useRef } from "react";
import {
  type AddProductFormData,
  type EditProductFormData,
  addProductSchema,
  editProductSchema,
  type Product,
} from "@/types/Product";
import toast from "react-hot-toast";
import { productService } from "@/services/product.service";

export default function ProductModal({
  onClose,
  item,
}: {
  onClose: () => void;
  item: Product;
}) {
  const [preview, setPreview] = useState<string | null>(item?.imageUrl ?? null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFile = (file: File) => {
    setForm((f) => ({ ...f, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleImageFile(file);
  };

  const [form, setForm] = useState<AddProductFormData | EditProductFormData>({
    name: item?.name ?? "",
    description: item?.description ?? "",
    type: item?.type ?? 1,
    price: item?.price ?? 0,
    quantity: item?.quantity ?? 0,
    image: null,
  });

  const handleSubmit = async () => {
    if (!item) {
      const result = addProductSchema.safeParse(form);

      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }

      try {
        await productService.addProduct(result.data);
        toast.success("Product successfully added.");
      } catch (err: any) {
        toast.error(err?.response?.data?.message ?? "Something went wrong.");
      }
    } else {
      const result = editProductSchema.safeParse(form);

      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }

      try {
        await productService.editProduct(result.data, item._id);
        toast.success("Product successfully edited.");
      } catch (err: any) {
        toast.error(err?.response?.data?.message ?? "Something went wrong.");
      }
    }
    onClose();
  };

  const labelClass =
    "block text-xs font-medium tracking-widest text-[#42493E] uppercase mb-1.5";
  const inputClass =
    "w-full bg-gray-100 rounded-sm px-3 py-2 text-sm text-[#42493E] placeholder:text-gray-500 focus:outline-none transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
      <div className="relative max-md:h-dvh w-full md:max-w-lg md:mx-4 bg-white md:rounded-sm border border-[#E8E7E3] overflow-hidden inter">
        <div className="px-7 pt-7 pb-5 border-b border-[#EDECE8]">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-bold text-[#1C4419] manrope">
              {item ? "Edit" : "Add"} New Product
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#8A9186] hover:bg-[#EDECE8] hover:text-[#42493E] transition-colors -mt-0.5"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-y-scroll h-full md:max-h-[70vh] px-7 py-6 space-y-7 pb-40 md:pb-20">
          <section>
            <h3 className="font-bold text-[#1C4419] manrope mb-4">
              Basic Details
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className={labelClass}>Product Name</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. Cherokee Purple Tomatoes"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Type</label>
                <select
                  className={inputClass}
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      type: parseInt(e.target.value),
                    }))
                  }
                >
                  <option value="1">Crop</option>
                  <option value="2">Poultry</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                className={`${inputClass} resize-none h-24`}
                placeholder="Describe the origin, flavor profile, and handling instructions..."
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </div>
          </section>

          <section>
            <h3 className="font-bold text-[#1C4419] manrope mb-4">
              Pricing &amp; Inventory
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Unit Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8A9186]">
                    &#8369;
                  </span>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    className={`${inputClass} pl-7`}
                    placeholder="0.00"
                    value={form.price || ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        price: parseFloat(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Initial Stock</label>
                <input
                  type="number"
                  min={0}
                  className={inputClass}
                  placeholder="0"
                  value={form.quantity || ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      quantity: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold text-[#1C4419] manrope mb-1">
              Product Image
            </h3>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative rounded-sm border-2 border-dashed transition-all cursor-pointer overflow-hidden
                ${
                  dragging
                    ? "border-[#1C4419] bg-[#1C4419]/5"
                    : "border-[#D5D4CF] bg-gray-100"
                }`}
              style={{ minHeight: "120px" }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-8 gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-[#E2E1DD] flex items-center justify-center">
                    <CloudUpload size={20} className="text-[#6B7162]" />
                  </div>
                  <p className="text-xs text-[#8A9186] text-center">
                    <span className="font-medium text-[#42493E]">
                      Click to upload
                    </span>{" "}
                    or drag &amp; drop
                  </p>
                  <p className="text-[10px] text-[#ABABAB]">
                    PNG, JPG, WEBP up to 10MB
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageFile(file);
                }}
              />
            </div>
            {preview && (
              <button
                onClick={() => {
                  setPreview(null);
                  setForm((f) => ({ ...f, image: null }));
                }}
                className="mt-1.5 text-xs text-[#8A9186] hover:text-red-500 transition-colors"
              >
                Remove image
              </button>
            )}
          </section>
        </div>

        <div className="absolute bottom-0 w-full px-7 py-4 border-t border-[#EDECE8] flex items-center justify-end gap-3 bg-[#FAFAF8]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#42493E] hover:bg-[#EDECE8] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#8B2215] rounded-sm transition-colors shadow-sm"
          >
            Save {item ? "Changes" : "Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
