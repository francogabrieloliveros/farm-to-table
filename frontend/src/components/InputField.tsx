import { Mail, LockKeyhole } from "lucide-react";
import type { InputFieldProps } from "@/types/InputFieldProps";

const InputField = ({
  id,
  type,
  placeholder,
  label,
  required = false,
}: InputFieldProps) => {
  return (
    <div>
      <label className="text-sm inter text-gray-600 font-medium" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        {type === "email" ? (
          <Mail className="absolute text-gray-500 size-5 left-3 top-1/2 -translate-y-1/2" />
        ) : undefined}
        {type === "password" ? (
          <LockKeyhole className="absolute text-gray-500 size-5 left-3 top-1/2 -translate-y-1/2" />
        ) : undefined}
        <input
          name={id}
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`bg-[#E8E7E4] py-3 text-gray-500 outline-none w-full rounded-sm ${type === "email" || type === "password" ? "pl-10 pr-2" : "px-3"}`}
        />
      </div>
    </div>
  );
};

export default InputField;
