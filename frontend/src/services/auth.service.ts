import api from "@/lib/api";

export const authService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const { data } = await api.post("/api/auth/login", { email, password });
    return { ...data, id: data._id };
  },

  signup: async ({
    fname,
    mname,
    lname,
    email,
    password,
  }: {
    fname: string;
    mname: string | null;
    lname: string;
    email: string;
    password: string;
  }) => {
    const { data } = await api.post("/api/auth/signup", {
      firstName: fname,
      middleName: mname,
      lastName: lname,
      email,
      password,
    });
    return { ...data, id: data._id };
  },
};
