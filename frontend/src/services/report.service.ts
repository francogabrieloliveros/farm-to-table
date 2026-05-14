import api from "@/lib/api";

export type ReportInterval = "weekly" | "monthly" | "annual";

export type ReportProduct = {
  productId: string;
  productName: string;
  totalSales: number;
  income: number;
};

export type ReportGroup = {
  _id: {
    year?: number;
    month?: number;
    week?: number;
  };
  products: ReportProduct[];
  totalIntervalIncome: number;
};

export type SalesReportResponse = {
  success: boolean;
  totalPendingOrders: number;
  data: ReportGroup[];
};

export const reportService = {
  // get aggregated sales report data by interval
  getSalesReport: async (
    interval: ReportInterval,
  ): Promise<SalesReportResponse> => {
    const { data } = await api.get("/api/reports", {
      params: { interval },
    });

    return data;
  },
};