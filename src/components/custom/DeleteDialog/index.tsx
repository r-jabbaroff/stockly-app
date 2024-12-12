import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useProductStore } from "@/stores/useProductStore";

export function DeleteDialog() {
  const {
    openDialog,
    setOpenDialog,
    setSelectedProduct,
    selectedProduct,
    isLoading,
    deleteProduct,
  } = useProductStore();
  const { toast } = useToast();
  async function deleteProductFx() {
    if (selectedProduct) {
      const result = await deleteProduct(selectedProduct.id);
      if (result) {
        toast({
          title: "Product Deleted",
          description: `The product [${selectedProduct.name}] has been deleted successfully!`,
        });
      }
    }
  }

  return (
    <AlertDialog
      open={openDialog}
      onOpenChange={(open) => {
        setOpenDialog(open);
      }}
    >
      <AlertDialogContent className="p-8">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2">
            This action cannot be undone. This will permanently delete the
            product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8">
          <AlertDialogCancel
            onClick={() => {
              setSelectedProduct(null);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteProductFx()}>
            {isLoading ? "deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
