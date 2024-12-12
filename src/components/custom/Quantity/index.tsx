import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";

export default function Quantity() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label htmlFor="quantity" className="text-slate-600">
        {`Quantity`}
      </Label>
      <Input
        {...register("quantity", { valueAsNumber: true })}
        type="text"
        id="quantity"
        className="h-11 shadow-none"
        placeholder="34"
      />
      {errors.quantity && (
        <div className="flex items-center gap-1 text-[13px] text-red-500">
          <MdError />
          <p>
            <>{errors.quantity.message}</>
          </p>
        </div>
      )}
    </div>
  );
}
