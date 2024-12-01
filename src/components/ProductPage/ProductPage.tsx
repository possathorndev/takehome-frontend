'use client'

import {useQuery} from "@tanstack/react-query";

// Apis
import {findProductBySlug, Product} from "@/lib/api/product";

// Components
import Banner from "@/components/ProductPage/Banner";
import ProductForm, {FORM_TYPE} from "@/components/ProductPage/ProductForm/ProductForm";

interface Props {
  slug: string;
  initialData?: Product
}

const ProductPage = ({slug, initialData}: Props) => {
  const {data} = useQuery({
    queryKey: ['productDetail', slug],
    queryFn: () => findProductBySlug(slug),
    staleTime: 60 * 1000, // 1 minute
    initialData,
    retry: 10,
    retryDelay: 1500,
  });

  return (
    <div className='space-y-12'>
      {/* Banner */}
      <Banner name={'Edit Product'}/>

      {/* Product Info */}
      <div className='px-8 max-w-screen-md w-full mx-auto'>
        <ProductForm formType={FORM_TYPE.EDIT} data={data}/>
      </div>
    </div>
  )
}

export default ProductPage
