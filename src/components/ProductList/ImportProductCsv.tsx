import React, {useState} from "react";
import {Import} from "lucide-react";
import {useDropzone} from "react-dropzone";
import Papa from "papaparse";

// Apis
import {Product} from "@/lib/api/product";

// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import UploadResultDisplay from "@/components/ProductList/UploadResultDisplay";
import {Button} from "@/components/ui/button";

const ImportProductCsv = () => {
  const [open, setOpen] = useState<boolean>()
  const [modifiedData, setModifiedData] = useState<Partial<Product>[]>();
  const [error, setError] = useState("");

  const handleOpenChange = (isOpen: boolean) => {
    setModifiedData(undefined)
    setOpen(isOpen)
  }

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      setError("No file provided");
      return;
    }

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setError("Not CSV file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;

      Papa.parse<Partial<Product>>(text, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const sanitizedResult = result.data.map((row) => ({
            name: row?.name,
            description: row?.description,
            price: row?.price,
            quantity: row?.quantity,
          })).filter((res) => res?.name && (res?.price && res?.price > 0) && (res?.quantity && res?.quantity >= 0))
          setModifiedData(sanitizedResult);
          setError("");
        },
      });
    };
    reader.readAsText(file);
  };

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {"text/csv": [".csv"]},
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex bg-yellow-500 w-32 md:w-fit items-center text-white p-2 text-sm rounded-lg gap-1">
          <Import className="w-4 h-4"/>
          Import
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Product</DialogTitle>
          <DialogDescription>
            The valid column in CSV file are name, description, price, quantity
          </DialogDescription>
        </DialogHeader>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer"
        >
          <input {...getInputProps()} />
          <p className="text-center text-blue-500">Click to upload CSV file</p>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {modifiedData && <UploadResultDisplay data={modifiedData} onClose={() => handleOpenChange(false)}/>}
      </DialogContent>
    </Dialog>
  );
};

export default ImportProductCsv;