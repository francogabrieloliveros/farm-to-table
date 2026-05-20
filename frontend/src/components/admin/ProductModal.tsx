import { X, CloudUpload, Package, Info, DollarSign, Layers } from "lucide-react";
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
  item: Product | null;
}) {
  const [preview, setPreview] = useState<string | null>(item?.imageUrl ?? null);
  const [dragging, setDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<AddProductFormData | EditProductFormData>({
    name: item?.name ?? "",
    description: item?.description ?? "",
    type: item?.type ?? 1,
    price: item?.price ?? 0,
    quantity: item?.quantity ?? 0,
    image: null,
  });

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!item) {
      const result = addProductSchema.safeParse(form);

      if (!result.success) {
        toast.error(result.error.issues[0].message);
        setIsSubmitting(false);
        return;
      }

      try {
        await productService.addProduct(result.data);
        toast.success("Product successfully added.");
        onClose();
      } catch (err: any) {
        toast.error(err?.response?.data?.message ?? "Something went wrong.");
      }
    } else {
      const result = editProductSchema.safeParse(form);

      if (!result.success) {
        toast.error(result.error.issues[0].message);
        setIsSubmitting(false);
        return;
      }

      try {
        await productService.editProduct(result.data, item._id);
        toast.success("Product successfully edited.");
        onClose();
      } catch (err: any) {
        toast.error(err?.response?.data?.message ?? "Something went wrong.");
      }
    }
    setIsSubmitting(false);
  };

  const labelClass = "text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1.5 flex items-center gap-1.5";
  const inputClass = "w-full bg-[#F9FAFB] border border-[#E8E7E4] rounded-xl px-4 py-3 text-sm text-[#1C4419] font-bold placeholder:text-[#9CA3AF] focus:border-[#1C4419] focus:ring-4 focus:ring-[#1C4419]/5 outline-none transition-all";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C4419]/20 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#E8E7E4] overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-10 py-8 border-b border-[#F4F3F1] flex items-center justify-between bg-[#FCFBF9]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1C4419] flex items-center justify-center text-white shadow-lg shadow-[#1C4419]/20">
              <Package size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#1C4419] tracking-tight manrope">
                {item ? "Edit Product" : "New Harvest"}
              </h2>
              <p className="text-xs text-[#6B7280] font-medium">Define product details and inventory settings.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-2xl text-[#9CA3AF] hover:bg-[#F4F3F1] hover:text-[#1C4419] transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8 scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Image */}
            <div className="space-y-4">
              <label className={labelClass}>Product Visual</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative aspect-square rounded-3xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex items-center justify-center
                  ${dragging ? "border-[#1C4419] bg-[#1C4419]/5 scale-[0.98]" : "border-[#E8E7E4] bg-[#F9FAFB] hover:border-[#1C4419]/30"}
                `}
              >
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                      Change Image
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#E8E7E4] flex items-center justify-center text-[#1C4419]">
                      <CloudUpload size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1C4419]">Upload Image</p>
                      <p className="text-[10px] text-[#6B7280] font-medium mt-1">Drag and drop or click to browse</p>
                    </div>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageFile(file);
                }} />
              </div>
            </div>

            {/* Right Column: Basic Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className={labelClass}><Info size={12} /> Name</label>
                  <input type="text" className={inputClass} placeholder="e.g. Organic Red Onions" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}><Layers size={12} /> Category</label>
                  <select className={inputClass} value={form.type} onChange={(e) => setForm(f => ({ ...f, type: parseInt(e.target.value) }))}>
                    <option value="1">Crop (Fruits & Vegetables)</option>
                    <option value="2">Poultry (Meat & Eggs)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}><DollarSign size={12} /> Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] font-bold">₱</span>
                    <input type="number" className={`${inputClass} pl-8`} placeholder="0.00" value={form.price || ""} onChange={(e) => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}><Package size={12} /> Stock</label>
                  <input type="number" className={inputClass} placeholder="0" value={form.quantity || ""} onChange={(e) => setForm(f => ({ ...f, quantity: parseInt(e.target.value) || 0 }))} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>Detailed Description</label>
            <textarea 
              className={`${inputClass} min-h-[120px] resize-none py-4 leading-relaxed`} 
              placeholder="Describe the origin, flavor profile, and handling instructions..." 
              value={form.description} 
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-6 bg-[#FCFBF9] border-t border-[#F4F3F1] flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="px-8 py-3.5 rounded-2xl text-sm font-bold text-[#6B7280] hover:bg-[#F4F3F1] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-10 py-3.5 rounded-2xl text-sm font-black text-white bg-[#1C4419] hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#1C4419]/20 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : (item ? "Update Product" : "Publish Harvest")}
          </button>
        </div>
      </div>
    </div>
  );
}
