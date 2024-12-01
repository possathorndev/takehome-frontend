'use client';

import React, {useEffect, useMemo} from "react";
import {useInView} from "react-intersection-observer";

// Hooks
import {useProducts} from "@/hooks/useProduct";

// Components
import Banner from "@/components/Home/Banner";
import ProductList from "@/components/ProductList/ProductList";
import Toolbar from "@/components/Home/Toolbar/Toolbar";
import DecorativeProps from "@/components/Home/DecorativeProps";

const Home = () => {
  const {ref, inView} = useInView({threshold: 0});

  const {data, hasMoreData, isLoading, isLoadingMoreData, fetchMoreData} = useProducts()
  const productsData = useMemo(() => data?.pages.flatMap((page) => page.data), [data])

  useEffect(() => {
    if (inView && hasMoreData) {
      fetchMoreData();
    }
  }, [fetchMoreData, hasMoreData, inView]);

  return (
    <div className='space-y-12 overflow-hidden'>
      {/* Banner */}
      <Banner/>

      <div className='px-8 max-w-screen-xl w-full mx-auto space-y-8'>
        {/* Title */}
        <Toolbar/>

        {/* Product List */}
        <ProductList
          ref={ref}
          data={productsData || []}
          isLoading={isLoading}
          hasMoreData={hasMoreData}
          isLoadingMoreData={isLoadingMoreData}
          loadMoreData={fetchMoreData}
        />
      </div>

      {/* Decorative Props */}
      <DecorativeProps/>
    </div>
  )
}

export default Home
