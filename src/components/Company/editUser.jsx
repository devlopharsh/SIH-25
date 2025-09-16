"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus , Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { apiCall } from "@/utils/API";

// ✅ Zod Schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  address: z.string().min(3, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pin: z.string().min(6, "PIN must be 6 digits"),
  designation: z.string().min(2, "Designation is required"),
  assignedAreas: z.string().min(2, "Assigned areas are required"),
  researchCredentials_qualifications: z.string().optional(),
  researchCredentials_institutionAffiliation: z.string().optional(),
  researchCredentials_certificationNumber: z.string().optional(),
});

// ✅ Dropdown options
const DESIGNATIONS = [
  "Field Data Collector",
  "Senior Field Collector",
  "Marine Research Scientist",
  "Senior Marine Researcher",
  "Research Associate",
  "Project Coordinator",
];

// ✅ Common fields
const commonFields = [
  { name: "name", label: "Name", placeholder: "Enter full name" },
  { name: "email", label: "Email", placeholder: "Enter email address" },
  { name: "phone", label: "Phone", placeholder: "Enter phone number" },
  { name: "address", label: "Address", placeholder: "Enter address" },
  { name: "city", label: "City", placeholder: "Enter city" },
  { name: "state", label: "State", placeholder: "Enter state" },
  { name: "pin", label: "PIN Code", placeholder: "Enter pin code" },
  {
    name: "assignedAreas",
    label: "Assigned Areas",
    placeholder: "Comma separated list (e.g. Area1, Area2)",
  },
];

// ✅ Tab-specific fields
const landFields = [
  {
    name: "researchCredentials_institutionAffiliation",
    label: "Institution Affiliation",
    placeholder: "Enter institution affiliation",
  },
  {
    name: "researchCredentials_certificationNumber",
    label: "Certification Number",
    placeholder: "Enter certification number",
  },
];

const seaFields = [
  {
    name: "researchCredentials_qualifications",
    label: "Qualifications",
    placeholder: "Comma separated list (e.g. Degree1, Degree2)",
  },
  {
    name: "researchCredentials_institutionAffiliation",
    label: "Institution Affiliation",
    placeholder: "Enter institution affiliation",
  },
  {
    name: "researchCredentials_certificationNumber",
    label: "Certification Number",
    placeholder: "Enter certification number",
  },
];

const EditUser = (user) => {
  const [tabs, setTabs] = useState("Land");
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      city: user?.city,
      state: user?.state,
      pin: user?.pin,
      designation: user?.designation,
      assignedAreas: user?.assignedAreas,
      researchCredentials_qualifications: user?.researchCredentials_qualifications,
      researchCredentials_institutionAffiliation: user?.researchCredentials_institutionAffiliation,
      researchCredentials_certificationNumber: user?.researchCredentials_certificationNumber,
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        workerType: tabs === "Land" ? "field_collector" : "seagrass_researcher", // ✅ auto-set
        assignedAreas: data.assignedAreas
          ? data.assignedAreas.split(",").map((s) => s.trim())
          : [],
        researchCredentials: {
          qualifications: data.researchCredentials_qualifications
            ? data.researchCredentials_qualifications
                .split(",")
                .map((s) => s.trim())
            : [],
          institutionAffiliation:
            data.researchCredentials_institutionAffiliation || "",
          certificationNumber:
            data.researchCredentials_certificationNumber || "",
        },
      };

      const response = await apiCall("worker/create", "POST", payload);
      if (response.success === true) {
        toast.sucess("User Created Successfully!");
        setOpen(false);
      } else {
        toast.error("Something went wrong");
      }
      console.log("✅ User created successfully:", response);
    } catch (error) {
      console.error("❌ Error creating user:", error.message);
      toast.error(error.message);
    }
  };

  const activeFields = [
    ...commonFields,
    ...(tabs === "Land" ? landFields : seaFields),
  ];

  return (
    <div>
      <AlertDialog open={open}>
        <AlertDialogTrigger
          asChild
          onClick={() => {
            setOpen(true);
          }}
        >
          <Button>
            <Pencil />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="!max-w-5xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between">
              <p>Create a New Worker</p>
              <div className="absolute right-5 flex gap-3">
                <Button
                  onClick={() => setTabs("Land")}
                  variant={tabs === "Land" ? "default" : "ghost"}
                >
                  Land Team
                </Button>
                <Button
                  onClick={() => setTabs("Sea")}
                  variant={tabs === "Sea" ? "default" : "ghost"}
                >
                  Sea Team
                </Button>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Enter the details of the new worker
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-4 py-4"
            >
              {activeFields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: inputField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
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

              {/* ✅ Designation Dropdown */}
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select designation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DESIGNATIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Footer */}
              <div className="col-span-2 flex justify-end space-x-2 pt-4">
                <AlertDialogCancel type="button" onClick={()=>{setOpen(false)}}>Cancel</AlertDialogCancel>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditUser;
