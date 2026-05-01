import { Search, SlidersHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const DUMMY_INVENTORY = [
  {
    name: "Heirloom Tomatoes",
    category: "Produce",
    price: "$4.50",
    stock: 124,
  },
  {
    name: "Wild Yeast Sourdough",
    category: "Bakery",
    price: "$8.00",
    stock: 124,
  },
  {
    name: "Raw Wildflower Honey",
    category: "Pantry",
    price: "$14.00",
    stock: 85,
  },
];

const categoryStyles: Record<string, string> = {
  Produce: "bg-[#e8f5e2] text-[#1C4419]",
  Bakery: "bg-amber-50 text-amber-700",
  Pantry: "bg-blue-50 text-blue-600",
};

export default function InventoryPage() {
  const [search, setSearch] = useState("");

  const filtered = DUMMY_INVENTORY.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Inventory</h1>
          <p className="text-sm text-gray-400">
            Manage, curate, and update your product offerings.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#7E2700] text-white text-sm font-medium px-4 py-2 rounded-lg">
          + Add New Product
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative w-72">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#E2E1DF] rounded-lg bg-white text-gray-700 placeholder-gray-400 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 border border-[#E2E1DF] bg-white text-sm text-gray-600 px-4 py-2 rounded-lg">
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-gray-400 border-b border-[#E2E1DF]">
              <th className="text-left px-6 py-3 w-12">Item</th>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Category</th>
              <th className="text-left px-6 py-3">Price</th>
              <th className="text-left px-6 py-3">Stock</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.name}
                className="border-b border-[#E2E1DF] last:border-0"
              >
                <td className="px-6 py-4">
                  <div className="w-8 h-8 bg-[#E2E1DF] rounded-md" />
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {item.name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${categoryStyles[item.category]}`}
                  >
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{item.price}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-[#1C4419] inline-block" />
                    {item.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="text-gray-400">
                      <Pencil size={16} />
                    </button>
                    <button className="text-gray-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-6 py-3 border-t border-[#E2E1DF]">
          <p className="text-xs text-gray-400">Showing 1 to 3 of 45 entries</p>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded border border-[#E2E1DF] text-gray-400 text-sm">
              ‹
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-[#E2E1DF] text-gray-400 text-sm">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
