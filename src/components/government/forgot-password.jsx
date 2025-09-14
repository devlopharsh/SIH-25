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
import { toast } from "react-hot-toast";

// ✅ Zod schema for userId (must be 8+ digits)
const formSchema = z.object({
  userId: z
    .string()
    .min(8, "User ID must be at least 8 digits")
    .regex(/^\d+$/, "User ID must contain only digits"),
});

const ForgetPasswordDialog = ({ buttonTag }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { userId: "" },
  });

  const onSubmit = async (data) => {
    console.log("request invite:", data);

    try {
      setLoading(true);
      const response = await apiCall("gov/auth/forgot-password", "POST", data);
      console.log("response getted:", response);
      // Example API call
      // await apiCall("/auth/forgot-password", "POST", data);
      if (!response) {
        setLoading(false);
        toast.error("something went wrong");
      } else {
        setLoading(false);
        toast.success("Password Reset link sent to your registered email!");
      }
      setOpen(false);
      form.reset();
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
            Enter your 8-digit User ID. A reset link will be sent to your
            registered email.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* ✅ Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your 8-digit User ID"
                      maxLength={12} // optional limit
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ForgetPasswordDialog;
