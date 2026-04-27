import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";

const LoginPage = () => {
  return (
    <main className="w-dvw h-dvh flex justify-center items-center">
      <div className="bg-[#FAF9F6] fixed w-screen h-screen -z-10"></div>

      <div className="bg-white shadow-xl flex flex-col justify-between px-10 py-13 h-dvh w-dvw items-center sm:max-w-[400px] min-h-[543px] sm:max-h-[586px] sm:rounded-lg">
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
          <Button className="rounded-sm bg-[#8C2A00] py-8 manrope text-lg font-semibold">
            Log In
          </Button>
          <Button className="rounded-sm bg-white text-[#8C2A00] py-8 manrope text-lg font-semibold border-black">
            Continue with Google
          </Button>
        </div>

        <p className="inter text-sm text-justify">
          <span className="font-light">Don't have an account? </span>
          <span className="text-[#294E27] font-semibold">
            <a href="/signup">Create Account</a>
          </span>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
