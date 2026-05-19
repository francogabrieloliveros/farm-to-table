import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { Leaf, ArrowLeft } from "lucide-react";
import InputField from "@/components/InputField";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fname = formData.get("fnameInput") as string;
    const mname = formData.get("mnameInput") as string;
    const lname = formData.get("lnameInput") as string;
    const email = formData.get("emailInput") as string;
    const password = formData.get("passwordInput") as string;
    const confirmPassword = formData.get("confirmPasswordInput") as string;

    if (password != confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const data = await signup({ fname, mname, lname, email, password });
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
    <main className="w-dvw min-h-dvh flex justify-center items-center py-12 relative overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>

      <Link
        to="/"
        className="absolute top-6 sm:top-10 left-6 sm:left-10 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium inter bg-background/50 backdrop-blur-md px-4 py-2 rounded-full border border-border/50 shadow-sm z-20"
      >
        <ArrowLeft size={18} />
        <span>Back to Home</span>
      </Link>

      <form
        className="bg-card shadow-2xl flex flex-col px-8 sm:px-10 py-10 w-full max-w-[500px] sm:rounded-3xl border border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700 m-4 z-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 p-3 rounded-2xl text-primary mb-4">
            <Leaf className="h-8 w-8" />
          </div>
          <h1 className="manrope text-foreground text-3xl font-extrabold tracking-tight mb-2">
            Create Account
          </h1>
          <p className="inter text-muted-foreground text-sm text-center">
            Join Farm-to-Table to access fresh local products.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <InputField
              id="fnameInput"
              type="text"
              placeholder="Juan"
              label="First Name"
              required={true}
            />
            <InputField
              id="mnameInput"
              type="text"
              placeholder="D."
              label="Middle Name"
              required={false}
            />
            <InputField
              id="lnameInput"
              type="text"
              placeholder="Dela Cruz"
              label="Last Name"
              required={true}
            />
          </div>
          <InputField
            id="emailInput"
            type="email"
            placeholder="user@3t.com"
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
          <InputField
            id="confirmPasswordInput"
            type="password"
            placeholder="••••••••"
            label="Confirm Password"
            required={true}
          />
        </div>

        <div className="w-full flex flex-col gap-3 mt-8 mb-6">
          <Button className="rounded-xl bg-primary text-primary-foreground py-6 manrope text-lg font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Sign up
          </Button>
        </div>

        <p className="inter text-sm text-center text-muted-foreground mt-2">
          Already have an account?{" "}
          <span className="text-primary font-semibold hover:underline">
            <a href="/login">Log in</a>
          </span>
        </p>
      </form>
    </main>
  );
};

export default SignupPage;
