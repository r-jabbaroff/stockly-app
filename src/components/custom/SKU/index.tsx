import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
export default function SKU() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="sku" className="text-slate-600">
        SKU
      </Label>
      <Input
        {...register("sku")}
        type="text"
        id="sku"
        className="h-11 shadow-none"
        placeholder="ABC001"
      />
      {errors.sku && (
        <div className="flex items-center gap-1 text-[13px] text-red-500">
          <MdError />
          <p>{errors.sku.message as string}</p>
        </div>
      )}
    </div>
  );
}
