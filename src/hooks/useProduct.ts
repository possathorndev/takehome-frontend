import {
  deleteProduct,
  findProductsAPI,
  postGenerateDescription,
  postProduct,
  Product,
  putProduct
} from "@/lib/api/product";
import {useInfiniteQuery, useMutation} from "@tanstack/react-query";
import {toast} from "@/hooks/use-toast";
import {SortDirection, SortOptionKey, useProductQueryCtx} from "@/contexts/ProductQueryProvider";
import {useMemo} from "react";
import {parseErrorMessage} from "@/lib/error";

export const useProducts = () => {
  const {search, pageSize, sortOptionValue} = useProductQueryCtx();

  const [sortBy, sortOrder] = useMemo(() => {
    return [sortOptionValue.split(':')[0] as SortOptionKey, sortOptionValue.split(':')[1] as SortDirection]
  }, [sortOptionValue])

  const {
    data,
    isLoading,
    fetchNextPage: fetchMoreData,
    isFetchingNextPage: isLoadingMoreData,
    hasNextPage: hasMoreData
  } = useInfiniteQuery({
    queryKey: ['products', sortOptionValue, search],
    queryFn: ({pageParam = 0}) => {
      return findProductsAPI({
        page: pageParam,
        pageSize,
        sortBy,
        sortOrder,
        search
      });
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => {
      if (firstPage.meta.pagination.page === 0) return undefined;
      return firstPage.meta.pagination.page - 1;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.pagination.page === lastPage.meta.pagination.pageCount - 1) return undefined;
      return lastPage.meta.pagination.page + 1;
    },
    retry: 2,
    staleTime: 1000 * 60,
  });

  return {data, isLoading, hasMoreData, fetchMoreData, isLoadingMoreData};
};

export const useCreateProductMutation = () => {
  const {
    mutateAsync,
    isPending
  } = useMutation({
    mutationFn: postProduct,
    onSuccess: (data) => {
      toast({
        variant: 'success',
        title: 'Create Success!',
        description: `${data.name} added to product catalog.`,
      })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Create Failed!',
        description: parseErrorMessage(error)
      })
    }
  })

  return {mutateAsync, isPending}
}

export const useUpdateProductMutation = (slug: string) => {
  const {
    mutateAsync,
    isPending
  } = useMutation({
    mutationFn: (updatedProduct: Product) => putProduct(slug, updatedProduct),
    onSuccess: (data) => {
      toast({
        variant: 'success',
        title: 'Update Success!',
        description: `${data.name} have been updated.`,
      })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Update Failed!',
        description: parseErrorMessage(error)
      })
    }
  })

  return {mutateAsync, isPending}
}

export const useDeleteProductMutation = () => {
  const {
    mutateAsync,
    isPending
  } = useMutation({
    mutationFn: (product: Product) => deleteProduct(product.slug),
    onSuccess: (data, variables) => {
      toast({
        variant: 'success',
        title: 'Delete Success!',
        description: `${variables.name} have been deleted.`,
      })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Delete Failed!',
        description: parseErrorMessage(error)
      })
    }
  })

  return {mutateAsync, isPending}
}

export const useGenerateDescriptionMutation = () => {
  const {
    mutateAsync,
    isPending
  } = useMutation({
    mutationFn: (product: Product) => postGenerateDescription({name: product.name}),
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Generate Description Failed!',
        description: parseErrorMessage(error)
      })
    }
  })

  return {mutateAsync, isPending}
}
