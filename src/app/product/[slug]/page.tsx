import {notFound} from "next/navigation";
import type {Metadata} from 'next';

// Apis
import {findProductBySlugServerSide} from "@/lib/api/product";

// Components
import ProductPage from "@/components/ProductPage/ProductPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const productData = await findProductBySlugServerSide(slug);

  if (!productData) return {};

  const title = productData?.name

  return {
    title,
    description: productData?.description,
    twitter: {
      title,
    },
  };
}

export default async function Page({params}: Props) {
  const {slug} = await params
  const productData = await findProductBySlugServerSide(slug);

  if (!productData) {
    return notFound()
  }

  return (
    <div className='min-h-[calc(100vh)] pb-10'>
      <ProductPage slug={slug} initialData={productData}/>
    </div>)
}
