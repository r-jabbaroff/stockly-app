import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import { IconSelector } from "../IconSelector";
export default function ProductName({
  onSelectedIcon,
}: {
  onSelectedIcon: (selectedIcon: ReactNode) => void;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  function getSelectedIcon(selectedIcon: ReactNode) {
    onSelectedIcon(selectedIcon);
  }
  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="product-name" className="text-slate-600">
        {`Product's Name`}
      </Label>
      <div className="flex items-center gap-2">
        <Input
          {...register("productName")}
          type="text"
          id="product-name"
          className="h-11 shadow-none"
          placeholder="Laptop..."
        />
        <IconSelector onUpdateIcon={getSelectedIcon} />
      </div>

      {errors.productName && (
        <div className="flex items-center gap-1 text-[13px] text-red-500">
          <MdError />
          <p>The product name is required</p>
        </div>
      )}
    </div>
  );
}
