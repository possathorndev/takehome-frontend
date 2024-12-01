'use client';

import {ProductDialogContextProvider} from "@/contexts/ProductDialogProvider";

export default function ProductLayout({
                                        children,
                                      }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProductDialogContextProvider>
      <div className='relative overflow-hidden'>{children}</div>
    </ProductDialogContextProvider>
  );
}
