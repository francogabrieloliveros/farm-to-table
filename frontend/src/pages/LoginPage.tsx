import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import InputField from "@/components/InputField";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login, userType } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("emailInput") as string;
    const password = formData.get("passwordInput") as string;

    try {
      const data = await login({ email, password });
      toast.success("Logged in successfully");
      navigate(data.userType === "Admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Something went wrong.");
    }
  };

  return (
    <main className="w-dvw h-dvh flex justify-center items-center">
      <div className="bg-[#FAF9F6] fixed w-screen h-screen -z-10"></div>

      <form
        className="bg-white shadow-xl flex flex-col justify-between px-10 py-13 h-dvh w-dvw items-center sm:max-w-[400px] min-h-[543px] sm:max-h-[586px] sm:rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="manrope text-[#294E27] text-3xl font-bold">
          Farm-to-table
        </h1>

        <div className="flex flex-col gap-5 w-full">
          <InputField
            id="emailInput"
            type="email"
            placeholder="farmer@verdant.com"
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

        <div className="w-full flex flex-col gap-3">
          <Button
            className="rounded-sm bg-[#8C2A00] py-8 manrope text-lg font-semibold"
            type="submit"
          >
            Log In
          </Button>
          <Button
            className="rounded-sm bg-white text-[#8C2A00] py-8 manrope text-lg font-semibold border-black"
            type="button"
          >
            Continue with Google
          </Button>
        </div>

        <p className="inter text-sm text-justify">
          <span className="font-light">Don't have an account? </span>
          <span className="text-[#294E27] font-semibold">
            <a href="/signup">Create Account</a>
          </span>
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
