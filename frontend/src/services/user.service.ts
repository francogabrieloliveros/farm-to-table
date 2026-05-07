import api from "@/lib/api";
import { type User } from "@/types/User";

type RegisteredUsersResponse = {
  success: boolean;
  total: number;
  data: User[];
};

export const userService = {
  // get all registered customer/consumer users
  getRegisteredCustomers: async (): Promise<RegisteredUsersResponse> => {
    const { data } = await api.get("/api/users/customers");
    return data;
  },
};