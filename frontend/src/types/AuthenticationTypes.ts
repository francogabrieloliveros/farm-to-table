type AuthUser = {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  userType: string;
  token: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (credentials: { email: string; password: string }) => Promise<AuthUser>;
  signup: (credentials: {
    fname: string;
    mname: string | null;
    lname: string;
    email: string;
    password: string;
  }) => Promise<AuthUser>;
  logout: () => void;
  updateStoredUser: (updates: Partial<AuthUser>) => void;
  isAuthenticated: boolean;
  userType: string | undefined;
};

export { type AuthUser, type AuthContextValue };
