// components/UserColumns.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Message from "@/components/common/mesage";
import EditUser from "../editUser";

export const userColumns = [
  {
    accessorKey: "designation",
    header: "Designation",
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original; // full row data

      const handleDelete = () => {
        console.log("🗑 Delete user:", user.id);
      };

      const handleEdit = () => {
        console.log("✏️ Edit user:", user.id);
        // 👉 Open edit modal / redirect to edit page
      };

      return (
        <div className="flex space-x-2">
          <EditUser user={user} />
          <Message
            buttonTag={
              <Button variant="outline">
                <Trash2 />
              </Button>
            }
            header="Are you absolutely sure?"
            message="This action cannot be undone. Your account and data will be permanently deleted."
            action={handleDelete}
          />
        </div>
      );
    },
  },
];


export const Columns = [
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  // {
  //   id: "actions", // ✅ no accessorKey since it's custom
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const user = row.original; // full row data

  //     const handleDelete = () => {
  //       console.log("🗑 Delete user:", user.id);
  //       // 👉 Here you can call API or open a confirmation dialog
  //     };

  //     const handleEdit = () => {
  //       console.log("✏️ Edit user:", user.id);
  //       // 👉 Open edit modal / redirect to edit page
  //     };

  //     return (
  //       <div className="flex space-x-2">
  //         <EditUser user={user} />
  //         <Message
  //           buttonTag={
  //             <Button variant="outline">
  //               <Trash2 />
  //             </Button>
  //           }
  //           header="Are you absolutely sure?"
  //           message="This action cannot be undone. Your account and data will be permanently deleted."
  //           action={handleDelete}
  //         />
  //       </div>
  //     );
  //   },
  // },
];
