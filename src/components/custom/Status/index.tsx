"use client";

import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction } from "react";
import { FaInbox } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Product } from "../Columns";

export default function Status({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<Product["status"]>>;
}) {
  console.log(selectedTab);

  return (
    <div>
      <Label className="text-slate-600">Status</Label>
      <Tabs
        value={selectedTab}
        onValueChange={(value: string) =>
          setSelectedTab(value as Product["status"])
        }
        className="mt-1"
      >
        <TabsList className="h-11 w-full px-2">
          <TabsTrigger
            className={`h-8 w-full ${
              selectedTab === "Published" ? "text-red-500" : ""
            }`}
            value="Published"
          >
            <FaCheck className="pr-1" />
            Published
          </TabsTrigger>
          <TabsTrigger
            className={`h-8 w-full ${
              selectedTab === "Inactive" ? "text-red-500" : ""
            }`}
            value="Inactive"
          >
            <IoClose />
            Inactive
          </TabsTrigger>
          <TabsTrigger
            className={`h-8 w-full ${selectedTab === "Draft" ? "text-red-500" : ""}`}
            value="Draft"
          >
            <FaInbox className="pr-1" />
            Draft
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
