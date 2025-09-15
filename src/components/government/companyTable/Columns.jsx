// components/Columns.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import Details from "../Company_Details";

export const Columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions", // ✅ no accessorKey since it's custom
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original; // full row data

      const handleDelete = () => {
        console.log("🗑 Delete user:", user.id);
        // 👉 Here you can call API or open a confirmation dialog
      };

      const handleEdit = () => {
        console.log("✏️ Edit user:", user.id);
        // 👉 Open edit modal / redirect to edit page
      };

      return (
        <div className="flex space-x-2">
          <Details />
        </div>
      );
    },
  },
];
