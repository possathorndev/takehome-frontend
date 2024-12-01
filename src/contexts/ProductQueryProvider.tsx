'use client';

import {createContext, useContext, useMemo, useState} from 'react';

export type SortOptionKey = 'updatedAt' | 'name' | 'lowPrice' | 'highPrice' | 'lowQuantity' | 'highQuantity'
export type SortOptionValue =
  'updatedAt:desc'
  | 'name:asc'
  | 'price:asc'
  | 'price:desc'
  | 'quantity:asc'
  | 'quantity:desc'
export type SortDirection = 'desc' | 'asc'
export type SortOption = {
  name: string;
  key: SortOptionKey;
  value: SortOptionValue
}
export const sortOptions: SortOption[] = [
  {
    name: 'Recent',
    key: 'updatedAt',
    value: 'updatedAt:desc',
  },
  {
    name: 'Name',
    key: 'name',
    value: 'name:asc',
  },
  {
    name: 'Lowest Price',
    key: 'lowPrice',
    value: 'price:asc',
  },
  {
    name: 'Highest Price',
    key: 'highPrice',
    value: 'price:desc',
  },
  {
    name: 'Lowest Stock',
    key: 'lowQuantity',
    value: 'quantity:asc',
  },
  {
    name: 'Highest Stock',
    key: 'highQuantity',
    value: 'quantity:desc',
  },
];


type ProductQueryContextValues = {
  search: string,
  pageSize: number,
  sortOptionValue: SortOptionValue,
  handleSetSortBy: (value: SortOptionKey) => void;
  handleSearch: (text: string) => void
};

const initialState: ProductQueryContextValues = {
  search: '',
  pageSize: 9,
  sortOptionValue: sortOptions[0].value,
  handleSetSortBy: () => {
  },
  handleSearch: () => {
  }
};

export const ProductQueryContext: React.Context<ProductQueryContextValues> =
  createContext<ProductQueryContextValues>(initialState);

export const ProductQueryContextProvider = ({children}: { children: React.ReactNode }) => {
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOptionKey>(sortOptions[0].key);

  const sortOptionValue = useMemo(() => {
    const selectedSortOption = sortOptions.find((option) => option.key === sortBy);

    if (!selectedSortOption) return sortOptions[0].value;

    return selectedSortOption.value;
  }, [sortOptions, sortBy]);

  const handleSetSortBy = (value: SortOptionKey) => setSortBy(value);
  const handleSearch = (text: string) => setSearch(text)

  return (
    <ProductQueryContext.Provider
      value={{
        search,
        pageSize: initialState.pageSize,
        sortOptionValue,
        handleSetSortBy,
        handleSearch
      }}
    >
      {children}
    </ProductQueryContext.Provider>
  );
};

export function useProductQueryCtx(): ProductQueryContextValues {
  const context = useContext(ProductQueryContext);
  if (!context) {
    throw new Error('Missing ProductQuery context');
  }
  return context;
}
