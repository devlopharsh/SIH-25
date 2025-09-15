"use client";
import React from "react";
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
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const Details = () => {
  const Download = async () => {
    console.log("download will work");
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Show Details</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="!max-w-5xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Company Details</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          Here will be the company details
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={Download}>Download</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Details;
