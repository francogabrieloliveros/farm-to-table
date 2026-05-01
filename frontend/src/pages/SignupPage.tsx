import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const SignupPage = () => {
  const { signup, userType } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fname = formData.get("fnameInput") as string;
    const mname = formData.get("mnameInput") as string;
    const lname = formData.get("lnameInput") as string;
    const email = formData.get("emailInput") as string;
    const password = formData.get("passwordInput") as string;

    try {
      await signup({ fname, mname, lname, email, password });
      toast.success("Logged in successfully");
      navigate(userType === "Admin" ? "/admin" : "/");
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Something went wrong.");
    }
  };

  return (
    <main className="w-dvw sm:h-dvh flex justify-center items-center">
      <div className="bg-[#FAF9F6] fixed w-screen h-screen -z-10"></div>

      <form
        className="bg-white shadow-xl flex flex-col justify-between px-10 py-13 w-dvw items-center sm:max-w-[500px] sm:max-h-[800px] min-h-[800px] sm:rounded-lg sm:h-dvh"
        onSubmit={handleSubmit}
      >
        <h1 className="manrope text-[#294E27] text-3xl font-bold mb-7">
          Farm-to-table
        </h1>

        <div className="flex flex-col gap-5 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField
              id="fnameInput"
              type="text"
              placeholder="Juan"
              label="First Name"
              required={true}
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
            id="mnameInput"
            type="text"
            placeholder="Santos"
            label="Middle Name"
            required={false}
          />
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

        <div className="w-full flex flex-col gap-3 mt-8">
          <Button className="rounded-sm bg-[#8C2A00] py-8 manrope text-lg font-semibold">
            Sign up
          </Button>
          <Button className="rounded-sm bg-white text-[#8C2A00] py-8 manrope text-lg font-semibold border-black">
            Continue with Google
          </Button>
        </div>

        <p className="inter text-sm text-justify mt-5">
          <span className="font-light">Already have an account? </span>
          <span className="text-[#294E27] font-semibold">
            <a href="/login">Log in</a>
          </span>
        </p>
      </form>
    </main>
  );
};

export default SignupPage;
