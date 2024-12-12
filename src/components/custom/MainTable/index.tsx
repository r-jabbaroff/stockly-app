"use client";

import { useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductTable } from "../ProductTable";

import { useLoadProducts } from "@/hooks/useLoadProducts";
import { useProductStore } from "@/stores/useProductStore";

import { Columns } from "../Columns";
import ProductDialog from "../ProductDialog";

export default function MainTable() {
  const { allProducts } = useProductStore();
  const loadProducts = useLoadProducts();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <Card className="poppins mt-12 flex flex-col border-none shadow-none max-sm:mt-6 max-sm:p-2">
      <CardHeader className="flex justify-between max-sm:p-2">
        <div className="flex items-center justify-between">
          <div className="">
            <CardTitle className="text-[23px] font-bold">Products</CardTitle>
            <p className="text-sm text-slate-600">
              {allProducts.length} products
            </p>
          </div>
          <ProductDialog />
        </div>
      </CardHeader>

      <CardContent className="max-sm:p-2">
        <ProductTable data={allProducts} columns={Columns} />
      </CardContent>
    </Card>
  );
}
