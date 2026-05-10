const DeleteModal = ({
  deleteProduct,
  setShowDelete,
}: {
  deleteProduct: () => Promise<void>;
  setShowDelete: (b: boolean) => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
      <div className="relative w-full max-w-sm mx-4 p-5 bg-white rounded-sm border border-[#E8E7E3] overflow-hidden inter">
        Are you sure you want to delete this product?
        <div className="w-full mt-5 border-[#EDECE8] flex items-center justify-end gap-3 bg-[#FAFAF8]">
          <button
            onClick={() => setShowDelete(false)}
            className="px-4 py-2 text-sm font-medium text-[#42493E] hover:bg-[#EDECE8] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={deleteProduct}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#8B2215] rounded-sm transition-colors shadow-sm"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
