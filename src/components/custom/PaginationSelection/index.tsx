"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Dispatch, SetStateAction } from "react";
import { PaginationType } from "../ProductTable";
export default function PaginationSelection({
  pagination,
  setPagination,
}: {
  pagination: PaginationType;
  setPagination: Dispatch<SetStateAction<PaginationType>>;
}) {
  return (
    <div className="flex items-center gap-3 max-sm:w-full max-sm:justify-between">
      <div className="text-sm text-gray-500">Rows per page</div>
      <Select
        value={pagination.pageSize.toString()}
        onValueChange={(value) =>
          setPagination((prev) => ({
            ...prev,
            pageSize: Number(value),
          }))
        }
      >
        <SelectTrigger className="w-14 rounded-md border px-2">
          <SelectValue placeholder={pagination.pageSize.toString()} />
        </SelectTrigger>
        <SelectContent>
          {[4, 6, 8, 10, 15, 20, 30].map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
