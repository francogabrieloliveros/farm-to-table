import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Period = "Weekly" | "Monthly" | "Annual";

const PRODUCT_PERFORMANCE = [
  {
    name: "Heirloom Tomatoes",
    category: "Nightshades",
    itemsSold: 1200,
    price: "$4.50",
    totalIncome: "$5,400.00",
  },
  {
    name: "Honeycrisp Apples",
    category: "Orchard",
    itemsSold: 3400,
    price: "$2.20",
    totalIncome: "$7,480.00",
  },
  {
    name: "Organic Kale",
    category: "Leafy Greens",
    itemsSold: 850,
    price: "$3.00",
    totalIncome: "$2,550.00",
  },
  {
    name: "Root Veg Box",
    category: "Market Box",
    itemsSold: 450,
    price: "$25.00",
    totalIncome: "$11,250.00",
  },
];

export default function ReportsPage() {
  const [period, setPeriod] = useState<Period>("Weekly");
  const grandTotalItems = PRODUCT_PERFORMANCE.reduce(
    (sum, p) => sum + p.itemsSold,
    0,
  );

  return (
    <div className="p-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Sales Reports
          </h1>
          <p className="text-sm text-gray-400">
            Comprehensive review of market performance and volume.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-white border border-[#E2E1DF] rounded-lg p-1">
          {(["Weekly", "Monthly", "Annual"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 text-sm rounded-md font-medium ${
                period === p ? "bg-[#1C4419] text-white" : "text-gray-500"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#e8f5e2] rounded-xl p-6">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
            Total
          </p>
          <p className="text-4xl font-bold text-gray-800">$124,500</p>
        </div>
        <div className="bg-white rounded-xl p-6">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
            Total Items Sold
          </p>
          <p className="text-4xl font-bold text-gray-800">8,420</p>
        </div>
      </div>

      {/* Product Performance */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E1DF]">
          <h2 className="font-semibold text-gray-800">Product Performance</h2>
          <button className="flex items-center gap-1 text-sm text-[#7E2700] font-medium">
            Filter by Category <ChevronDown size={14} />
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-gray-400 border-b border-[#E2E1DF]">
              <th className="text-left px-6 py-3">Product Name</th>
              <th className="text-left px-6 py-3">Category</th>
              <th className="text-right px-6 py-3">Items Sold</th>
              <th className="text-right px-6 py-3">Price</th>
              <th className="text-right px-6 py-3">Total Income</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCT_PERFORMANCE.map((row) => (
              <tr key={row.name} className="border-b border-[#E2E1DF]">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#E2E1DF] rounded-md shrink-0" />
                  <span className="text-gray-700 font-medium">{row.name}</span>
                </td>
                <td className="px-6 py-4 text-gray-400">{row.category}</td>
                <td className="px-6 py-4 text-right text-gray-700">
                  {row.itemsSold.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right text-gray-700">
                  {row.price}
                </td>
                <td className="px-6 py-4 text-right text-gray-700">
                  {row.totalIncome}
                </td>
              </tr>
            ))}
            {/* Grand Total */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 font-bold text-gray-800">Grand Total</td>
              <td className="px-6 py-4" />
              <td className="px-6 py-4 text-right font-semibold text-gray-700">
                {grandTotalItems.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right text-gray-400">--</td>
              <td className="px-6 py-4 text-right font-bold text-gray-800">
                $26,680.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
