import api from "@/lib/api";
import { type User } from "@/types/User";

export type RegisteredUsersResponse = {
  success: boolean;
  total: number;
  data: User[];
};

export type UpdateProfilePayload = {
  firstName: string;
  middleName?: string;
  lastName: string;
  password?: string;
};

export type UpdateProfileResponse = {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  userType: string;
};

export const userService = {
  // get all registered customer/consumer users
  getRegisteredCustomers: async (): Promise<RegisteredUsersResponse> => {
    const { data } = await api.get("/api/users/customers");
    return data;
  },

  // update the current user's profile details
  updateProfile: async (
    payload: UpdateProfilePayload,
  ): Promise<UpdateProfileResponse> => {
    const { data } = await api.put("/api/users/profile", payload);
    return data;
  },

  getUser: async (id: string) => {
    const { data: res } = await api.get(`/api/users/${id}`);
    return res;
  },

  deleteCustomer: async (id: string) => {
    const { data } = await api.delete(`/api/users/${id}`);
    return data;
  },
};
