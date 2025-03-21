import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { authServices } from "../../services/auth";
import toast, { Toaster } from "react-hot-toast";

const LoginSchema = z.object({
  email: z.string().email("Email is invalid").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });
  const navigation = useNavigate();
  const handleLogin = async (data:LoginSchemaType) => {
    const loginResponse = await authServices.login(data);
    console.log(loginResponse);

    if(!loginResponse){
      toast.error("login fail");
      return;
    }
    localStorage.setItem("token", loginResponse.accessToken);
    toast.success("login success");
    navigation('/');
  };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center">Login</h2>
          <form onSubmit={handleSubmit(handleLogin)} className="mt-4">
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="w-full p-2 mt-2 border rounded"
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full p-2 mt-2 border rounded"
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <button className="w-full p-2 mt-4 text-white bg-blue-500 rounded">
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </div>
      <div>
        <Toaster/>
      </div>
    </div>
  );
};

export default Login;
