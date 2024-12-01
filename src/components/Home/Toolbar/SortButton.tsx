'use client';

import {useEffect, useMemo, useState} from 'react';
import {ChevronDown, ChevronUp} from 'lucide-react';

// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Providers
import {SortOptionKey, sortOptions, useProductQueryCtx} from "@/contexts/ProductQueryProvider";

const SortButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOptionKey>(sortOptions[0].key);
  const {sortOptionValue, handleSetSortBy} = useProductQueryCtx();

  const displaySortName = useMemo(() => sortOptions.find((option) => option.key === sortBy)?.name, [sortBy]);

  useEffect(() => {
    const selectedSortOption = sortOptions.find((option) => option.value === sortOptionValue);

    if (!selectedSortOption) return;

    setSortBy(selectedSortOption.key);
    handleSetSortBy(selectedSortOption.key)
  }, [sortOptionValue]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div
          className='flex h-full w-full cursor-pointer items-center gap-2'>
          {/* Value */}
          <p className='font-bold'>Sort:</p>

          <div className='flex justify-between items-center w-full border-[1px] border-border rounded-lg pl-1'>
            <p className='text-blue-500 text-xs'>{displaySortName}</p>

            {/* Dropdown Icon */}
            {isOpen ? <ChevronUp className='h-5 w-5 text-blue-500'/> : <ChevronDown className='h-5 w-5 text-blue-500'/>}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-36 border-0 bg-border'>
        <DropdownMenuRadioGroup
          value={sortBy}
          onValueChange={(value) => {
            setSortBy(value as SortOptionKey);
            handleSetSortBy(value as SortOptionKey);
          }}
        >
          {sortOptions.map((option) => (
            <DropdownMenuRadioItem key={option.key} value={option.key}>
              {option.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortButton;
