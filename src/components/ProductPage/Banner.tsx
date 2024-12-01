'use client';

import React from 'react';

interface Props {
  name?: string
}

const Banner = ({name}: Props) => {

  return (
    <div
      className='relative w-full overflow-hidden py-8 min-h-[300px] flex flex-col items-center justify-center'
      style={{
        backgroundImage: 'url("/images/productPage/product.png")',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
    >
      <div className='absolute inset-0 bg-gradient-to-t from-background to-transparent'/>

      <div className='z-10'>
        <div className='text-5xl font-bold'>{name || 'Product Information'}</div>
      </div>
    </div>
  );
};

export default Banner;
