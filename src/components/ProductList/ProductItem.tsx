import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Product} from "@/lib/api/product";
import Link from "next/link";

interface Props {
  data: Product
}

const ProductItem = ({data}: Props) => {
  return (
    <Card className="w-full h-72 z-10">
      <CardHeader>
        <CardTitle className='text-2xl'>{data.name}</CardTitle>
        <CardDescription>
          <div className='h-20 overflow-auto'>{data.description}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between'>
          <div className='flex gap-4'>
            <div>Quantity</div>
            <div>{data.quantity}</div>
          </div>
          <div className='flex gap-4'>
            <div>Price</div>
            <div>{data.price.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/product/${data.slug}`} className='w-full'>
          <Button variant='secondary' className='w-full'>
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ProductItem
