import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <Card className="w-full h-72 cursor-pointer">
      <CardHeader className='pb-3'>
        <CardTitle><Skeleton className='w-[50%] h-10'/></CardTitle>
        <CardDescription>
          <Skeleton className='w-full h-20'/>
        </CardDescription>
      </CardHeader>
      <CardContent className='pb-2'>
        <Skeleton className='w-full h-10'/>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className='w-full h-10'/>
      </CardFooter>
    </Card>
  )
}

export default CardSkeleton
