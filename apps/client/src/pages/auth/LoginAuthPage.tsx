import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { LoginRequest } from "@/models";
import { useLoginUserMutation } from "@/redux/api/auth.api";
import { setCredentials } from "@/redux/slices/authslice";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Ingrese un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const LoginAuthPage = () => {
  const navigate = useNavigate();

  const [login, { error }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginRequest> = async ({ email, password }) => {
    try {
      const user = await login({ email, password }).unwrap();

      dispatch(setCredentials(user));

      if (user) navigate("/profile", { replace: true });
    } catch (error) {
      reset();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md rounded-lg p-6 shadow-lg">
        <h3 className="mb-6 text-center text-2xl font-semibold">Sign In</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          {error && (
            <p className="text-sm text-red-500">
              Invalid Credentials
            </p>
          )}

          <Button type="submit" className="w-full">
            Log in
          </Button>

          <p className="text-center text-xs text-gray-600">
            By continuing, you agree to the{" "}
            <span className="underline">Terms of Use</span> and{" "}
            <span className="underline">Privacy Policy</span>.
          </p>

          <div className="flex cursor-pointer justify-between text-xs text-blue-500 underline">
            <p>Other issue with sign in</p>
            <p>Forgot your password?</p>
          </div>
        </form>

        <div className="relative my-6">
          <hr className="border-gray-300" />
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 transform bg-white px-4 text-sm text-gray-500">
            New to our community?
          </span>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate("/auth/register")}
          className="w-full"
        >
          Create an account
        </Button>
      </Card>
    </div>
  );
};
