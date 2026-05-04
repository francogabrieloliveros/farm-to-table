import axios from "axios";
import { type User } from "@/types/User";

type RegisteredUsersResponse = {
  success: boolean;
  total: number;
  data: User[];
};

// get the saved auth token from local storage
const getAuthToken = () => {
  const storedUser = localStorage.getItem("auth_user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser).token;
  } catch {
    return null;
  }
};

export const userService = {
  // get all registered customer/consumer users
  getRegisteredCustomers: async (): Promise<RegisteredUsersResponse> => {
    const token = getAuthToken();

    const { data } = await axios.get("/api/users/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};