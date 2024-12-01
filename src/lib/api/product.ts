import qs from 'qs'

import {publicAPI} from "@/lib/api/index";
import {FindResponse} from "@/lib/api/utils/common";
import {SortDirection, SortOptionKey} from "@/contexts/ProductQueryProvider";

export type Product = {
  slug: string;
  name: string;
  description: string;
  price: number;
  quantity: number
}

export const findProductsAPI = async (params: {
  page: number,
  pageSize: number
  sortBy: SortOptionKey;
  sortOrder: SortDirection;
  search: string
}): Promise<FindResponse<Product>> => {
  const query = qs.stringify(
    {
      page: params.page,
      pageSize: params.pageSize,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
      search: params.search
    },
    {encodeValuesOnly: true},
  );

  const response = await publicAPI.get(`/products?${query}`);

  return response.data
}

export const findProductBySlug = async (slug: string): Promise<Product | undefined> => {
  const response = await publicAPI.get(`/products/${slug}`)

  return response.data
}

export const findProductBySlugServerSide = async (slug: string): Promise<Product | undefined> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}`, {
      next: {revalidate: 10},
    });

    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  } catch (error) {
    console.log(error);
  }
};

type PostProductBody = {
  name: string,
  description: string,
  price: number,
  quantity: number
}

export const postProduct = async (payload: PostProductBody): Promise<Product> => {
  const response = await publicAPI.post(`/products`, payload)
  return response.data
}

type PutProductBody = Partial<PostProductBody>

export const putProduct = async (slug: string, payload: PutProductBody): Promise<Product> => {
  const response = await publicAPI.put(`/products/${slug}`, payload)
  return response.data
}

export const deleteProduct = async (slug: string) => {
  const response = await publicAPI.delete(`/products/${slug}`)
  return response.data
}

type PostGenerateDescriptionBody = {
  name: string
}

export const postGenerateDescription = async (payload: PostGenerateDescriptionBody): Promise<string> => {
  const response = await publicAPI.post(`/products/generate-description`, payload)
  return response.data
}
