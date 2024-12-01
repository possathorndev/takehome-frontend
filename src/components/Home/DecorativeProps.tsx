import Image from "next/image";
import React from "react";

const DecorativeProps = () => {
  return (
    <>
      <div className='-rotate-12 absolute bottom-0 left-0 -translate-x-1/4 -translate-y-1/2 hidden md:block z-0'>
        <Image
          className='w-60 animate-[bounce_15s_linear_infinite]'
          width={200}
          src='/images/props.png'
          alt=''
          height={200}
        />
      </div>
      <div className='rotate-12 absolute bottom-0 right-0 translate-x-1/4 translate-y-1/2 hidden md:block z-0'>
        <Image
          className='w-60 animate-[bounce_15s_linear_infinite]'
          width={200}
          src='/images/props.png'
          alt=''
          height={200}
        />
      </div>
    </>
  )
}

export default DecorativeProps
