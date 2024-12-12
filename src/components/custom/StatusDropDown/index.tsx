import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { FaCheck, FaInbox } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuGitPullRequestDraft } from "react-icons/lu";

type Status = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

const statuses: Status[] = [
  { value: "Published", label: "Published", icon: <FaCheck /> },
  { value: "Inactive", label: "Inactive", icon: <IoClose /> },
  { value: "Draft", label: "Draft", icon: <FaInbox /> },
];

type StatusDropDownProps = {
  selectedStatuses: string[];
  setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>;
};

export function StatusDropDown({
  selectedStatuses,
  setSelectedStatuses,
}: StatusDropDownProps) {
  const [open, setOpen] = React.useState(false);

  function returnColor(status: string) {
    switch (status) {
      case "Published":
        return "text-green-600 bg-green-100";
      case "Inactive":
        return "text-red-600 bg-red-100";
      case "Draft":
        return "text-gray-600 bg-gray-100";
      default:
        return "";
    }
  }

  function handleCheckboxChange(value: string) {
    setSelectedStatuses((prev) => {
      const updatedStatuses = prev.includes(value)
        ? prev.filter((status) => status !== value)
        : [...prev, value];

      return updatedStatuses;
    });
  }

  function clearFilters() {
    setSelectedStatuses([]);
  }

  return (
    <div className="poppins flex items-center space-x-4 max-sm:w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="h-10 max-sm:w-full">
            <LuGitPullRequestDraft />
            Status
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="poppins w-48 p-0"
          side="bottom"
          align="center"
        >
          <Command className="p-1">
            <CommandList>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    className="mb-2 flex h-10 items-center"
                    key={status.value}
                    value={status.value}
                    onClick={() => handleCheckboxChange(status.value)}
                  >
                    <Checkbox
                      checked={selectedStatuses.includes(status.value)}
                      onCheckedChange={() => handleCheckboxChange(status.value)}
                      className="mr-2 size-4 rounded-[4px]"
                    />
                    <div
                      className={`flex items-center gap-1 ${returnColor(
                        status.value,
                      )} rounded-lg p-1 px-4 text-[13px]`}
                    >
                      {status.icon}
                      {status.label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="flex flex-col gap-2 text-[23px]">
              <Separator />
              <Button
                variant="ghost"
                className="mb-1 text-[12px]"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
