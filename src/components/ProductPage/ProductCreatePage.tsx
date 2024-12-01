'use client'

import Banner from "@/components/ProductPage/Banner";
import ProductForm, {FORM_TYPE} from "@/components/ProductPage/ProductForm/ProductForm";

const ProductCreatePage = () => {
  return (
    <div className='space-y-12'>
      {/* Banner */}
      <Banner name='New Product'/>

      {/* Product Info */}
      <div className='px-8 max-w-screen-md w-full mx-auto'>
        <ProductForm formType={FORM_TYPE.CREATE}/>
      </div>
    </div>
  )
}

export default ProductCreatePage
