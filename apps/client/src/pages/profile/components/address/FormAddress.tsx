import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
const formSchema = z.object({
  streetAddress: z.string().min(3, "Debe tener al menos 3 caracteres"),
  city: z.string().min(2, "Debe tener al menos 2 caracteres"),
  phone: z.number().min(2, "Debe tener al menos 2 caracteres"),
  zipcode: z.coerce.number().min(1000, "Código postal inválido"),
  country: z.string().min(3, "Debe tener al menos 3 caracteres"),
});

type FormAddress = z.infer<typeof formSchema>;

export const FormAddress = () => {
  const { user } = useAppSelector((state) => state.auth);

  const form = useForm<FormAddress>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: user?.customer ? user.customer.departamento : "",
      country: user?.customer ? user.customer.country : "",
      phone: user?.customer ? parseInt(user.customer.phone) : undefined,
      zipcode: user?.customer ? parseInt(user.customer.zipcode) : undefined,
      streetAddress: user?.customer ? user?.customer.address : "",
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pb-9">
          <FormField
            control={control}
            name="zipcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="h-11 w-36" type="submit" disabled={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </Form>
  );
};
