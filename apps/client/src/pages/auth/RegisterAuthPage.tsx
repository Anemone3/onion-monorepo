import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useRegisterUserMutation } from "@/redux/api/auth.api";
import { setCredentials } from "@/redux/slices/authslice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

const stepSchemas = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    firstname: z.string().min(2, "Too short!"),
    lastname: z.string().min(2, "Too short!"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof stepSchemas>;
export const RegisterAuthPage = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  });

  const [register, {  }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<FormData>({
    resolver: zodResolver(stepSchemas),
    mode: "onBlur",
    defaultValues: formData,
  });

  const { control, handleSubmit, getValues, reset } = form;

  async function onSubmit(values: FormData) {

    const {confirmPassword, ...data} = values;
    const user = await register(data).unwrap();

    if (user) {
      dispatch(setCredentials(user));
      navigate('/')
    }
  }

  const handleNext = async () => {
    setFormData((prev) => ({ ...prev, ...getValues() }));

    setStep((prev) => prev + 1);
    reset(getValues());
  };

  return (
    <div className="mx-auto mt-[190px] w-[900px]">
      <h2 className="text-center text-2xl font-normal">Create an account</h2>
      <p className="text-center text-lg font-light">
        Already have an account?
        <Link to="/auth/login" className="text-blue-500">
          Log in
        </Link>
      </p>

      <div className="relative mx-auto flex w-[750px] items-center justify-between pb-8 pt-14">
        {[
          "Enter your email address",
          "Provide your basic info",
          "Create your password",
        ].map((text, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <span
              className={`z-10 inline-block h-5 w-5 rounded-full pt-[3px] text-center text-xs text-white ${
                step === index + 1 ? "bg-gray-500" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </span>
            <span
              className={`mt-2 text-xs ${step === index + 1 ? "text-black dark:text-white" : "text-gray-400"}`}
            >
              {text}
            </span>
            {index < 2 && (
              <div className="absolute left-[65%] top-2 -z-10 h-[1px] w-[260px] bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mx-auto w-[750px]">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <FormField
                name="email"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What's your email?</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            {step === 2 && (
              <div className="flex max-w-full justify-between gap-4">
                <FormField
                  control={control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Jane" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="lastname"
                  control={control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Doe" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}
            {step === 3 && (
              <>
                <div>
                  <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your Password"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="*****"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="ml-auto mt-9 flex h-12 w-96" type="submit">
                  Register
                </Button>
              </>
            )}
          </form>
          {step !== 3 && (
            <Button
              className="ml-auto mt-9 flex h-12 w-96"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};
