type AuthUser = {
  id: string;
  firstName: string;
  email: string;
  userType: string;
  token: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (credentials: {
    fname: string;
    mname: string | null;
    lname: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  userType: string;
};

export { type AuthUser, type AuthContextValue };
