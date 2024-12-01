'use client';

import React from 'react';

const Banner = () => {
  return (
    <div
      className='relative w-full overflow-hidden py-8 min-h-[400px] flex flex-col items-center justify-center'
      style={{
        backgroundImage: 'url("/images/homepage/banner.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='absolute inset-0 bg-gradient-to-t from-background to-transparent'/>

      <div className='z-10'>
        <div className='text-5xl font-bold px-8'>Product Dashboard</div>
      </div>
    </div>
  );
};

export default Banner;
