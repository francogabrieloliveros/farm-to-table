import { type User } from "@/types/User";

const DUMMY_USERS: User[] = [
  {
    firstName: "Juan",
    middleName: "Santos",
    lastName: "Dela Cruz",
    userType: "admin",
    email: "juan.delacruz@email.com",
    password: "juan@123",
  },
  {
    firstName: "Maria",
    lastName: "Santos",
    userType: "customer",
    email: "maria.santos@email.com",
    password: "maria@123",
  },
  {
    firstName: "Pedro",
    middleName: "Garcia",
    lastName: "Reyes",
    userType: "customer",
    email: "pedro.reyes@email.com",
    password: "pedro@123",
  },
  {
    firstName: "Ana",
    middleName: "Tan",
    lastName: "Lim",
    userType: "staff",
    email: "ana.lim@email.com",
    password: "ana@123",
  },
  {
    firstName: "Jose",
    lastName: "Cruz",
    userType: "customer",
    email: "jose.cruz@email.com",
    password: "jose@123",
  },
];

export const userService = {
  getUsers: async ({
    userType,
    email,
  }: {
    userType: string | null;
    email: string | null;
  }): Promise<User[]> => {
    let users = [...DUMMY_USERS];

    if (userType !== null) {
      users = users.filter((u) => u.userType === userType);
    }

    if (email !== null) {
      users = users.filter((u) => u.email === email);
    }

    return users;
  },

  getUserByEmail: async (email: string): Promise<User | undefined> => {
    return DUMMY_USERS.find((u) => u.email === email);
  },
};
