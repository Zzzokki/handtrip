"use client";

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
import { useAuth } from "@/components/providers";
import { useLoginAsCustomerMutation } from "@/types/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const loginFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
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
        const { token, user } = result.data.loginAsCustomer;
        login(
          {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            type: "customer",
          },
          token
        );
        router.push("/profile");
      }
    } catch (error: any) {
      alert(error.message || "Invalid username or password");
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="your_username"
                  type="text"
                  disabled={loading}
                  {...field}
                />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="lg"
          disabled={loading}
        >
          {loading ? "Signing in..." : `Sign in as Traveler`}
        </Button>
      </form>
    </Form>
  );
};
