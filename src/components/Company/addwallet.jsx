import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiCall } from "@/utils/API";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

// ✅ Validation schema
const walletSchema = z.object({
  walletAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum wallet address"),
});

export default function AddWallet() {
  const navigate = useNavigate();
  const location = useLocation();

  const refreshPage = () => {
    navigate(0); // full page reload (like F5)
  };
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      walletAddress: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Submitting:", data); // ✅ should show { walletAddress: "0x..." }

      const res = await apiCall("companies/connect-wallet", "POST", {
        walletAddress: data.walletAddress, // ✅ correct shape
      });

      toast.success("Wallet connected successfully!");
      refreshPage();
      console.log("✅ Response:", res);
      setOpen(false);
    } catch (error) {
      console.error("❌ API Error:", error.message);
      toast.error(error.message || "Failed to connect wallet");
    }
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          onClick={() => {
            setOpen(true);
          }}
        >
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            this wallet will be used to store all your carbon Credit. <br />{" "}
            Please choose it wisely.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="walletAddress" // ✅ must match API key
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x1234...abcd" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <Button
                variant={"outline"}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
