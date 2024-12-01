import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import Link from "next/link";
import React from "react";

const CreateProductLink = () => {
  return (
    <Link href={'/product/create'}>
      <Button className='flex bg-blue-400 w-32 md:w-fit items-center text-white p-2 text-sm rounded-lg gap-1'>
        <Plus className='w-4 h-4'/>
        Add Product
      </Button>
    </Link>
  )
}

export default CreateProductLink