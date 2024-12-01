import React, {useMemo} from "react";

// Hooks
import {useProducts} from "@/hooks/useProduct";

// Components
import CreateProductLink from "@/components/ProductList/CreateProductLink";
import SortButton from "@/components/Home/Toolbar/SortButton";
import SearchInput from "@/components/Home/Toolbar/SearchInput";
import ImportProductCsv from "@/components/ProductList/ImportProductCsv";

const Toolbar = () => {
  const {data} = useProducts()
  const pagination = useMemo(() => data?.pages?.[0].meta.pagination, [data])

  return (
    <div className='w-full'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='flex gap-4 items-center justify-between'>
          <div
            className='text-primary text-2xl font-bold z-10'>Products {pagination?.total ? `(${pagination?.total})` : ''}</div>
          <div className='flex flex-col md:flex-row gap-1 items-end md:items-center'>
            <CreateProductLink/>
            <ImportProductCsv/>
          </div>
        </div>

        <div className='grid grid-cols-6 items-center gap-4'>
          <div className='col-span-3 md:col-span-4'>
            <SearchInput/>
          </div>
          <div className='col-span-3 md:col-span-2'>
            <SortButton/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toolbar
