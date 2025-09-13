"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// ✅ Zod Schema
const formSchema = z.object({
  workerId: z.string().min(2, "Worker ID is required"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  address: z.string().min(3, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pin: z.string().min(6, "PIN must be 6 digits"),
  employeeId: z.string().min(2, "Employee ID is required"),
  designation: z.string().min(2, "Designation is required"),
});

const AddUser = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workerId: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pin: "",
      employeeId: "",
      designation: "",
    },
  });

  const onSubmit = (data) => {
    console.log("✅ Submitted Data:", data);
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>
            <CirclePlus className="w-5 h-5 mr-2" />
            Create User
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Create a New User</AlertDialogTitle>
            <AlertDialogDescription>
              enter the details of the new user
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* ✅ Form inside */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-4 py-4"
            >
              {[
                {
                  name: "workerId",
                  label: "Worker ID",
                  placeholder: "Enter worker ID",
                },
                { name: "name", label: "Name", placeholder: "Enter full name" },
                {
                  name: "email",
                  label: "Email",
                  placeholder: "Enter email address",
                },
                {
                  name: "phone",
                  label: "Phone",
                  placeholder: "Enter phone number",
                },
                {
                  name: "address",
                  label: "Address",
                  placeholder: "Enter address",
                },
                { name: "city", label: "City", placeholder: "Enter city" },
                { name: "state", label: "State", placeholder: "Enter state" },
                {
                  name: "pin",
                  label: "PIN Code",
                  placeholder: "Enter pin code",
                },
                {
                  name: "employeeId",
                  label: "Employee ID",
                  placeholder: "Enter employee ID",
                },
                {
                  name: "designation",
                  label: "Designation",
                  placeholder: "Enter designation",
                },
              ].map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: inputField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        {/* ✅ Placeholder added */}
                        <Input
                          {...inputField}
                          placeholder={field.placeholder}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {/* Footer takes full width */}
              <div className="col-span-2 flex justify-end space-x-2 pt-4">
                <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddUser;
