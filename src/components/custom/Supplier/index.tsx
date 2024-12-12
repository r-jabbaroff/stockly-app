import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";

export default function Supplier() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="supplier-name" className="text-slate-600">
        {`Supplier's name`}
      </Label>
      <Input
        {...register("supplier")}
        type="text"
        id="supplier-name"
        className="h-11 shadow-none"
        placeholder="TechWorld..."
      />
      {errors.supplier && (
        <div className="flex items-center gap-1 text-[13px] text-red-500">
          <MdError />
          <p>
            <>{errors.supplier.message}</>
          </p>
        </div>
      )}
    </div>
  );
}
