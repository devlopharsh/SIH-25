"use client";
import React from "react";
import { Input } from "@/components/ui/input";

export function SearchBar({ value, onChange }) {
  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search users..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
