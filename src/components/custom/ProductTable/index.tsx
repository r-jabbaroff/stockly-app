"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { IoClose } from "react-icons/io5";
import { CategoriesDropDown } from "../CategoryDropDown";
import { StatusDropDown } from "../StatusDropDown";

import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PaginationSelection from "../PaginationSelection";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export interface PaginationType {
  pageIndex: number;
  pageSize: number;
}

// Define custom filter types
declare module "@tanstack/table-core" {
  interface FilterFns {
    multiSelect: FilterFn<unknown>;
  }
}

// Define the custom filter function
const multiSelectFilter: FilterFn<unknown> = (
  row,
  columnId,
  filterValue: string[],
) => {
  const rowValue = (row.getValue(columnId) as string).toLowerCase();
  const lowercaseFilterValues = filterValue.map((val) => val.toLowerCase());
  return filterValue.length === 0 || lowercaseFilterValues.includes(rowValue);
};

console.log("multiSelectFilter", multiSelectFilter);

export function ProductTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationType>({
    pageIndex: 0,
    pageSize: 8,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  console.log(selectedCategories);

  // Combined useEffect for both filters
  useEffect(() => {
    setColumnFilters((prev) => {
      // Remove both status and category filters
      const baseFilters = prev.filter(
        (filter) => filter.id !== "status" && filter.id !== "category",
      );

      const newFilters = [...baseFilters];

      // Add status filter if there are selected statuses
      if (selectedStatuses.length > 0) {
        newFilters.push({
          id: "status",
          value: selectedStatuses,
        });
      }

      // Add category filter if there are selected categories
      if (selectedCategories.length > 0) {
        newFilters.push({
          id: "category",
          value: selectedCategories,
        });
      }

      console.log("New Column Filters:", newFilters);
      return newFilters;
    });

    // Set initial sorting for the "createdAt" column
    setSorting([
      {
        id: "createdAt",

        desc: true,
      },
    ]);
  }, [selectedStatuses, selectedCategories]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      columnFilters,
      sorting,
    },
    filterFns: {
      multiSelect: multiSelectFilter,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="poppins">
      <div className="mb-8 mt-6 flex flex-col gap-3">
        <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-4">
          <Input
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            placeholder="Search by name..."
            className="h-10 max-w-sm"
          />
          <div className="flex items-center gap-4 max-sm:w-full max-sm:justify-between">
            <StatusDropDown
              selectedStatuses={selectedStatuses}
              setSelectedStatuses={setSelectedStatuses}
            />
            <CategoriesDropDown
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
        </div>

        {/* filter area */}
        <FilterArea
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>

      {/* Upcoming table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-5 flex items-center justify-between max-md:flex-col max-md:gap-4">
        <PaginationSelection
          pagination={pagination}
          setPagination={setPagination}
        />

        <div className="flex items-center gap-3 max-sm:w-full max-sm:flex-col max-sm:items-start max-sm:gap-0">
          <span className="text-sm text-gray-500">
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div className="flex items-center justify-end space-x-2 max-sm:w-full max-sm:justify-between max-sm:pt-4">
            {/* First Page Button */}
            <Button
              variant="outline"
              className="size-9 w-12 max-sm:w-full"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <BiFirstPage />
            </Button>

            {/* Previous Page Button */}
            <Button
              variant="outline"
              className="size-9 w-12 max-sm:w-full"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <GrFormPrevious />
            </Button>

            {/* Next Page Button */}
            <Button
              className="size-9 w-12 max-sm:w-full"
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <GrFormNext />
            </Button>

            {/* Last Page Button */}
            <Button
              className="size-9 w-12 max-sm:w-full"
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <BiLastPage />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterArea({
  selectedStatuses,
  setSelectedStatuses,
  selectedCategories,
  setSelectedCategories,
}: {
  selectedStatuses: string[];
  setSelectedStatuses: Dispatch<SetStateAction<string[]>>;
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <div className="poppins flex flex-wrap gap-3">
      {/* status */}
      {selectedStatuses.length > 0 && (
        <div className="flex items-center gap-2 rounded-sm border border-dashed p-1 px-2 text-sm">
          <span className="text-gray-600">Status</span>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-2">
            {selectedStatuses.length < 3 ? (
              <>
                {selectedStatuses.map((status, index) => (
                  <Badge key={index} variant={"secondary"}>
                    {status}
                  </Badge>
                ))}
              </>
            ) : (
              <>
                <Badge variant={"secondary"}>3 Selected</Badge>
              </>
            )}
          </div>
        </div>
      )}

      {/* category */}
      {selectedCategories.length > 0 && (
        <div className="flex items-center gap-2 rounded-sm border border-dashed p-1 px-2 text-sm">
          <span className="text-gray-600">category</span>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-2">
            {selectedCategories.length < 3 ? (
              <>
                {selectedCategories.map((category, index) => (
                  <Badge key={index} variant={"secondary"}>
                    {category}
                  </Badge>
                ))}
              </>
            ) : (
              <>
                <Badge variant={"secondary"}>3 Selected</Badge>
              </>
            )}
          </div>
        </div>
      )}

      {(selectedCategories.length > 0 || selectedStatuses.length > 0) && (
        <Button
          onClick={() => {
            setSelectedCategories([]);
            setSelectedStatuses([]);
          }}
          variant={"ghost"}
          className="p-1 px-2"
        >
          <span>Reset</span>
          <IoClose />
        </Button>
      )}
    </div>
  );
}
