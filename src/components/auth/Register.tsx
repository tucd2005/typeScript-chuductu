import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { authServices } from "../../services/auth";
import toast, { Toaster } from "react-hot-toast";

const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  email: z.string().email("Email is invalid").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(255, "Password is too long"),
});
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
  const navigate = useNavigate();
  const handleRegister = async (data:RegisterSchemaType) => {
    const registerResponse = await authServices.register(data);
    if(!registerResponse){
      toast.error("register fail");
      return;
    }
    toast.success("register success");
    navigate("/login");
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center">Register</h2>
          <form onSubmit={handleSubmit(handleRegister)} className="mt-4">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Name"
                className="w-full p-2 mt-2 border rounded"
              />
              {errors.name && (
                <span className="text-red-500"> {errors.name.message}</span>
              )}
            </div>
            <div className="mb-4">
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
              {errors.email && (
                <span className="text-red-500"> {errors.email.message}</span>
              )}
            </div>
            <div className="mb-4">
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
              {errors.password && (
                <span className="text-red-500"> {errors.password.message}</span>
              )}
            </div>
            <button className="w-full p-2 mt-4 text-white bg-green-500 rounded">
              Register
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-green-500">
              Login
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

export default Register;
