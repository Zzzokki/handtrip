"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/providers";
import { useLoginAsCustomerMutation } from "@/types/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, LogIn, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const loginFormSchema = z.object({
  username: z.string().min(1, "Хэрэглэгчийн нэр шаардлагатай"),
  password: z.string().min(6, "Нууц үг доровь 6 тэмдэгт байх ёстой").max(100, "Нууц үг 100 тэмдэгтээс бага байх ёстой"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export const TravelerLoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [loginAsCustomer, { loading }] = useLoginAsCustomerMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      const result = await loginAsCustomer({
        variables: {
          username: data.username,
          password: data.password,
        },
      });

      if (result.data?.loginAsCustomer) {
        const { token, customer } = result.data.loginAsCustomer;
        login(
          {
            id: customer.id.toString(),
            role: "customer",
          },
          token
        );
        router.push("/customer");
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid username or password");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-700">Хэрэглэгчийн нэр</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Хэрэглэгчийн нэр" type="text" disabled={loading} className="pl-10 h-10 border-gray-300 focus-visible:ring-blue-500" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-700">Нууц үг</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Нууц үгээ оруулна уу" type="password" disabled={loading} className="pl-10 h-10 border-gray-300 focus-visible:ring-blue-500" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end">
          <Link href="/forgot-password" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors hover:underline">
            Нууц үгээ мартсан?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-10 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Нэвтэрч байна...
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4 mr-2" />
              Жуулчин нэвтрэх
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
