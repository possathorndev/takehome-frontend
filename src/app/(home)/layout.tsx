import {ProductQueryContextProvider} from "@/contexts/ProductQueryProvider";

export default function HomeLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProductQueryContextProvider>
      <div className='relative overflow-hidden'>{children}</div>
    </ProductQueryContextProvider>
  );
}
