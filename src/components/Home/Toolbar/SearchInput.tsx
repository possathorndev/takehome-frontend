import {useEffect, useState} from "react";
import {Search} from "lucide-react";

// Components
import {Input} from "@/components/ui/input";

// Providers
import {useProductQueryCtx} from "@/contexts/ProductQueryProvider";


const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const {handleSearch} = useProductQueryCtx()

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    handleSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm]);

  return (
    <div className='flex w-full items-center border-0 px-3 gap-2'>
      <Input
        type='search'
        placeholder='Search...'
        className='h-full w-full rounded-lg border-border bg-transparent px-4 placeholder-gray-500'
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <Search className='w-6 h-6 text-blue-500'/>
    </div>
  );
}

export default SearchInput
