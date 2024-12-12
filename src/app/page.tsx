"use client";

import { DeleteDialog } from "@/components/custom/DeleteDialog";
import MainHeader from "@/components/custom/MainHeader";
import MainTable from "@/components/custom/MainTable";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div
      className={`poppins min-h-screen w-full border bg-gray-50 p-5 dark:bg-black max-sm:p-2`}
    >
      <Card className="flex flex-col rounded-none p-5 shadow-none max-sm:p-2">
        <DeleteDialog />
        <MainHeader />
        <MainTable />
      </Card>
    </div>
  );
}
