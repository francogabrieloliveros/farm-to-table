import { X, AlertTriangle } from "lucide-react";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
};

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C4419]/20 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-[#E8E7E4] overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100">
              <AlertTriangle size={24} />
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <h3 className="text-xl font-black text-[#1C4419] manrope mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">
            {message}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3.5 rounded-2xl text-sm font-bold text-gray-500 bg-[#F4F3F1] hover:bg-[#E8E7E4] transition-all"
            >
              No, keep it
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all"
            >
              Yes, delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
