import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { Leaf, ArrowLeft } from "lucide-react";
import InputField from "@/components/InputField";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("emailInput") as string;
    const password = formData.get("passwordInput") as string;

    try {
      const data = await login({ email, password });
      const parsedToken = jwtDecode(data.token);
      toast.success("Logged in successfully");

      if (parsedToken.userType === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/shop");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Something went wrong.");
    }
  };

  return (
    <main className="w-dvw h-dvh flex justify-center items-center relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>

      <Link
        to="/"
        className="absolute top-6 sm:top-10 left-6 sm:left-10 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium inter bg-background/50 backdrop-blur-md px-4 py-2 rounded-full border border-border/50 shadow-sm"
      >
        <ArrowLeft size={18} />
        <span>Back to Home</span>
      </Link>

      <form
        className="bg-card shadow-2xl flex flex-col px-10 py-12 w-full max-w-[440px] sm:rounded-3xl border border-border/50 items-center animate-in fade-in slide-in-from-bottom-4 duration-700 z-10 m-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 p-3 rounded-2xl text-primary mb-4">
            <Leaf className="h-8 w-8" />
          </div>
          <h1 className="manrope text-foreground text-3xl font-extrabold tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="inter text-muted-foreground text-sm text-center">
            Sign in to access your Farm-to-Table account.
          </p>
        </div>

        <div className="flex flex-col gap-5 w-full mb-8">
          <InputField
            id="emailInput"
            type="email"
            placeholder="admin@3t.com"
            label="Email Address"
            required={true}
          />
          <InputField
            id="passwordInput"
            type="password"
            placeholder="••••••••"
            label="Password"
            required={true}
          />
        </div>

        <div className="w-full flex flex-col gap-3 mb-6">
          <Button
            className="rounded-xl bg-primary text-primary-foreground py-6 manrope text-lg font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            type="submit"
          >
            Log In
          </Button>
          <Button
            className="rounded-xl bg-background text-foreground py-6 manrope text-lg font-semibold border border-border hover:bg-muted transition-all shadow-sm"
            type="button"
          >
            Continue with Google
          </Button>
        </div>

        <p className="inter text-sm text-center text-muted-foreground">
          Don't have an account?{" "}
          <span className="text-primary font-semibold hover:underline">
            <a href="/signup">Create Account</a>
          </span>
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
