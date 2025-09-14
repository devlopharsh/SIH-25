"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { apiCall } from "@/utils/API";
import { toast } from "react-hot-toast"; // ✅ if you're using sonner for toast

// ✅ Zod schema
const formSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

const ForgetPasswordDialog = ({ buttonTag }) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    console.log("request invite:", data);

    try {
      // Example API call
      // await apiCall("/auth/forgot-password", "POST", data);

      toast.success("Password Reset link sent to your email!");
      setOpen(false);
      form.reset(); // reset after submit
    } catch (error) {
      toast.error(error.message || "❌ Failed to send reset link");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* Trigger button */}
      <AlertDialogTrigger asChild>{buttonTag}</AlertDialogTrigger>

      {/* Dialog content */}
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Forget Password</AlertDialogTitle>
          <AlertDialogDescription>
            Enter your email address. A reset link will be sent to your email.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* ✅ Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <Button type="submit">Continue</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ForgetPasswordDialog;
