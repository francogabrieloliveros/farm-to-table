import axios from "axios";

export const authService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const { data } = await axios.post("/api/auth/login", { email, password });
    return data;
  },

  signup: async ({
    fname,
    mname,
    lname,
    email,
    password,
  }: {
    fname: string;
    mname: string;
    lname: string;
    email: string;
    password: string;
  }) => {
    const { data } = await axios.post("/api/auth/signup", {
      firstName: fname,
      mname,
      lastName: lname,
      email,
      password,
    });
    return data;
  },
};
