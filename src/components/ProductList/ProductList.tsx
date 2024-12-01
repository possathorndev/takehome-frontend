import {Product} from "@/lib/api/product";
import React from "react";
import {EyeClosed} from "lucide-react";
import ProductItem from "@/components/ProductList/ProductItem";
import {Button} from "@/components/ui/button";
import CardListSkeleton from "@/components/CardSkeleton/CardListSkeleton";
import CreateProductLink from "@/components/ProductList/CreateProductLink";

interface Props {
  data: Product[]
  isLoading: boolean
  hasMoreData: boolean
  isLoadingMoreData: boolean
  loadMoreData: () => void
}

const ProductList = React.forwardRef<HTMLDivElement, Props>(
  ({data, isLoading, hasMoreData, isLoadingMoreData, loadMoreData}, ref) => {

    return (
      <div>
        {/* List */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {isLoading && <CardListSkeleton/>}

          {data?.map((product, index) => <ProductItem key={index} data={product}/>)}
        </div>

        {/* Load more */}
        {hasMoreData && !!data?.length && (
          <div className='flex w-full items-center justify-center pb-4' ref={ref}>
            <Button
              variant='secondary'
              className='mx-6 w-full md:w-1/4'
              onClick={loadMoreData}
              disabled={isLoadingMoreData || !hasMoreData}
            >
              Load More
            </Button>
          </div>
        )}

        {/* Empty Product */}
        {!isLoading && !data?.length && (
          <div className='flex flex-col w-full items-center justify-center py-20 gap-2'>
            <EyeClosed className='w-10 h-10'/>
            <p className='text-2xl text-gray-500'>No Products</p>
            <CreateProductLink/>
          </div>
        )}
      </div>
    )
  })

ProductList.displayName = 'ProductList'

export default ProductList
