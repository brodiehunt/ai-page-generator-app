"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState, useTransition } from "react";
import CogBars from "../shared/CogBars";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/src/schemas";
import FormError from "@/src/components/shared/Forms/FormError";
import FormSuccess from "@/src/components/shared/Forms/FormSuccess";
import { registerUser } from "@/src/actions/register";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    setError("");
    setSuccess("");
    startTransition(() => {
      registerUser(values).then((data) => {
        console.log("what da hell", data);
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className="w-[600px] flex flex-col p-16 py-12 rounded-lg shadow-xl gap-8">
      <div className="">
        <h3 className="text-4xl font-bold text-center mb-4 flex gap-4 items-center justify-center">
          <CogBars />
          Register
        </h3>
        <p className="text-center text-gray-400 text-lg">Welcome Back!</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormError message={error} />
        <FormSuccess message={success} />
        <div>
          <label
            htmlFor="name"
            className="block text-sm text-gray-500 dark:text-gray-300"
          >
            Name
          </label>

          <div className="relative flex items-center mt-2">
            <span className="absolute">
              <svg
                className="w-6 h-6 mx-3 text-gray-400 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>

            <input
              type="text"
              {...register("name")}
              disabled={isPending}
              placeholder="john doe"
              className={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                errors.name &&
                "border-red-400 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 "
              }`}
            />
          </div>
          {errors.name && (
            <p className="mt-3 text-xs text-red-400" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm text-gray-500 dark:text-gray-300"
          >
            Email Address
          </label>

          <div className="relative flex items-center mt-2">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mx-3 text-gray-400 dark:text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </span>

            <input
              type="email"
              {...register("email")}
              disabled={isPending}
              placeholder="john@example.com"
              className={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                errors.email &&
                "border-red-400 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 "
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-3 text-xs text-red-400" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Password
            </label>
            <a
              href="#"
              className="text-xs text-gray-600 hover:underline dark:text-gray-400"
            >
              Forget Password?
            </a>
          </div>

          <div className="relative flex items-center mt-2">
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
              >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path
                  fillRule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="********"
              disabled={isPending}
              className={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                errors.password &&
                "border-red-400 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 "
              }`}
            />
          </div>
          {errors.password && (
            <p className="mt-3 text-xs text-red-400" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="mt-4 py-2 px-4 rounded transition-all duration-200 text-custom-light bg-custom-primary hover:bg-custom-primary/80 font-semibold text-xl flex gap-2 items-center justify-center"
        >
          {isPending && (
            <span className="w-4 h-4 border-t-2 border-custom-light/80 rounded-full animate-spin"></span>
          )}{" "}
          Register
        </button>
      </form>
      <div className="flex justify-stretch gap-4">
        <button
          disabled={isPending}
          className="shadow-md py-4 flex-grow flex justify-center rounded-lg hover:bg-gray-50 hover:shadow-lg transition-all duration-200ms"
          aria-label="Register in with google"
        >
          <FcGoogle className="w-10 h-10" />
        </button>
        <button
          disabled={isPending}
          className="shadow-md py-4 flex-grow flex justify-center rounded-lg hover:bg-gray-50 hover:shadow-lg transition-all duration-200ms"
          aria-label="Register in with github"
        >
          <FaGithub className="w-10 h-10" />
        </button>
      </div>
      <p className="text-center text-gray-400 text-lg">
        <Link
          href="/auth/login"
          className="hover:text-gray-600 hover:border-solid hover:border-b-2 hover:border-gray-600 transition-all duration-200"
        >
          Already have an account?
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
