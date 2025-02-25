import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  newPassword: z.string().min(6, "Debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Debe tener al menos 6 caracteres"),
}).refine((data)=> data.newPassword === data.confirmPassword,{
    message: "Password is not match",
    path: ["confirmPassword"]
})
;

type FormPassword = z.infer<typeof formSchema>;

export const FormPassword = () => {
  const form = useForm<FormPassword>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-80 space-y-4">
        <FormField
          control={control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="pb-6">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
                <FormMessage />
            </FormItem>
          )}
        />

        <Button className="h-11 w-36" type="submit" disabled={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </Form>
  );
};
