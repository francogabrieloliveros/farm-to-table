import { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Download } from "lucide-react";
import {
  reportService,
  type ReportInterval,
  type ReportProduct,
  type ReportGroup,
  type SalesReportResponse,
} from "@/services/report.service";

type Period = {
  label: "Weekly" | "Monthly" | "Annual";
  value: ReportInterval;
};

type ProductBreakdown = ReportProduct & {
  productName: string;
};

const PERIODS: Period[] = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Annual", value: "annual" },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);

export default function ReportsPage() {
  const [period, setPeriod] = useState<Period>(PERIODS[0]);
  const [data, setData] = useState<SalesReportResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setIsLoading(true);
        const result = await reportService.getSalesReport(period.value);
        setData(result);
        setIsError(false);
      } catch (error) {
        console.error("Error fetching report:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [period.value]);

  const reportGroups = data?.data ?? [];
  const totalPendingOrders = data?.totalPendingOrders ?? 0;

  // combine product income across all returned intervals
  const productBreakdown = useMemo(() => {
    const products = new Map<string, ProductBreakdown>();

    reportGroups.forEach((group: ReportGroup) => {
      group.products.forEach((product: ReportProduct) => {
        const existing = products.get(product.productId);

        if (existing) {
          existing.totalSales += product.totalSales;
          existing.income += product.income;
        } else {
          products.set(product.productId, { ...product } as ProductBreakdown);
        }
      });
    });

    return Array.from(products.values());
  }, [reportGroups]);

  const totalSalesRevenue = reportGroups.reduce(
    (sum: number, group: ReportGroup) => sum + group.totalIntervalIncome,
    0,
  );

  const totalItemsSold = productBreakdown.reduce(
    (sum: number, product: ProductBreakdown) => sum + product.totalSales,
    0,
  );

  const handleDownloadCsv = async () => {
    try {
      const blob = await reportService.downloadSalesReport();
      const today = new Date().toISOString().split("T")[0];
      const fileName = `sales_report_${today}.csv`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("CSV report download started.");
    } catch (error) {
      toast.error("Failed to download CSV report.");
    }
  };

  return (
    <div className="p-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Sales Reports
          </h1>
          <p className="text-sm text-gray-400">
            Comprehensive review of market performance and revenue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadCsv}
            className="flex items-center gap-2 bg-[#7E2700] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#9b3300] transition-colors"
          >
            <Download size={16} />
            Download CSV
          </button>

          <div className="flex items-center gap-1 bg-white border border-[#E2E1DF] rounded-lg p-1">
            {PERIODS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 text-sm rounded-md font-medium ${period.value === p.value
                    ? "bg-[#1C4419] text-white"
                    : "text-gray-500"
                  }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#e8f5e2] rounded-xl p-6">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
            Total Sales Revenue
          </p>
          <p className="text-4xl font-bold text-gray-800">
            {isLoading ? "Loading..." : formatCurrency(totalSalesRevenue)}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
            Total Pending Orders
          </p>
          <p className="text-4xl font-bold text-gray-800">
            {isLoading ? "Loading..." : totalPendingOrders.toLocaleString()}
          </p>
        </div>
      </div>

      {/* product performance table */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E1DF]">
          <h2 className="font-semibold text-gray-800">
            Product Income Breakdown
          </h2>
          <p className="text-sm text-gray-400">{period.label} View</p>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-gray-400 border-b border-[#E2E1DF]">
              <th className="text-left px-6 py-3">Product Name</th>
              <th className="text-right px-6 py-3">Items Sold</th>
              <th className="text-right px-6 py-3">Total Income</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={3} className="px-6 py-6 text-gray-500">
                  Loading report data...
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan={3} className="px-6 py-6 text-[#7E2700]">
                  Failed to load sales report.
                </td>
              </tr>
            )}

            {!isLoading && !isError && productBreakdown.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-6 text-gray-500">
                  No completed sales found for this period.
                </td>
              </tr>
            )}

            {!isLoading &&
              !isError &&
              productBreakdown.map((row) => (
                <tr key={row.productId} className="border-b border-[#E2E1DF]">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#E2E1DF] rounded-md shrink-0" />
                    <span className="text-gray-700 font-medium">
                      {row.productName}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right text-gray-700">
                    {row.totalSales.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-right text-gray-700">
                    {formatCurrency(row.income)}
                  </td>
                </tr>
              ))}

            {!isLoading && !isError && productBreakdown.length > 0 && (
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-800">
                  Grand Total
                </td>
                <td className="px-6 py-4 text-right font-semibold text-gray-700">
                  {totalItemsSold.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right font-bold text-gray-800">
                  {formatCurrency(totalSalesRevenue)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
