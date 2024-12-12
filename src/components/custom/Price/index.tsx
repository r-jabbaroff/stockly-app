"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import { NumericFormat } from "react-number-format";

export default function Price() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label htmlFor="price" className="text-slate-600">
        Price
      </Label>
      <Controller
        name="price"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value, ...field } }) => (
          <NumericFormat
            {...field}
            value={value}
            customInput={Input}
            thousandSeparator
            placeholder="Price..."
            className="h-11"
            decimalScale={2}
            allowNegative={false}
            onValueChange={(values) => {
              const { floatValue, value } = values;
              // If the input is empty (value is empty string), pass empty string
              // Otherwise pass the float value
              onChange(value === "" ? "" : (floatValue ?? 0));
            }}
          />
        )}
      />

      {errors.price && (
        <div className="flex items-center gap-1 text-[13px] text-red-500">
          <MdError />
          <p>{String(errors.price.message)}</p>
        </div>
      )}
    </div>
  );
}
