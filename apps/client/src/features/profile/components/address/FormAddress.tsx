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
const formSchema = z.object({
  streetAddress: z.string().min(3, "Debe tener al menos 3 caracteres"),
  city: z.string().min(2, "Debe tener al menos 2 caracteres"),
  state: z.string().min(2, "Debe tener al menos 2 caracteres"),
  zipcode: z.coerce.number().min(1000, "Código postal inválido"),
  country: z.string().min(3, "Debe tener al menos 3 caracteres"),
});

type FormAddress = z.infer<typeof formSchema>;

export const FormAddress = () => {
  const form = useForm<FormAddress>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      country: "",
      state: "",
      zipcode: undefined,
      streetAddress: "",
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
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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

        <Button className="w-36 h-11"  type="submit" disabled={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </Form>
  );
};
