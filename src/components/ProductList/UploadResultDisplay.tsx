import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {Product} from "@/lib/api/product";
import {useCreateProductMutation} from "@/hooks/useProduct";
import {Check, X} from "lucide-react";
import {useQueryClient} from "@tanstack/react-query";

interface Props {
  data: Partial<Product>[]
  onClose: () => void
}

enum DISPLAY_STATE {
  PENDING = 0,
  CONFIRMED = 1
}

const UploadResultDisplay = ({data, onClose}: Props) => {
  const queryClient = useQueryClient()
  const [displayState, setDisplayState] = useState<DISPLAY_STATE>(DISPLAY_STATE.PENDING)

  const [successList, setSuccessList] = useState<number[]>()
  const [failList, setFailList] = useState<number[]>()

  const {mutateAsync} = useCreateProductMutation()

  const successListTemp: number[] = [];
  const failListTemp: number[] = [];

  const handleSubmit = async () => {
    for (let index = 0; index < data.length; index++) {
      const toUploadProduct = data[index];
      try {
        await mutateAsync(toUploadProduct as Product);
        successListTemp.push(index);
      } catch (error) {
        console.error('~ error =', error)
        failListTemp.push(index);
      }
    }

    setSuccessList(successListTemp);
    setFailList(failListTemp);
    setDisplayState(DISPLAY_STATE.CONFIRMED)

    queryClient.invalidateQueries({queryKey: ['products']})
  }

  const handleClose = () => {
    onClose()
    setDisplayState(DISPLAY_STATE.PENDING)
  }

  return (
    <div className='space-y-2'>
      <h4 className="text-blue-500">Please confirm your data before proceed:</h4>
      <div className="bg-gray-100 p-4 rounded max-h-64 w-full overflow-auto text-sm space-y-2">
        {data?.map((data, index) => (
          <div key={index} className='border-b-[1px] pb-2 border-border'>
            <div className='flex font-bold underline gap-1'>
              {displayState === DISPLAY_STATE.CONFIRMED && (successList?.includes(index) ?
                <div className='w-4 h-4 flex items-center justify-center rounded-full bg-green-600'><Check
                  className='w-3 h-3 text-white'/></div> : failList?.includes(index) ?
                  <div className='w-4 h-4 flex items-center justify-center rounded-full bg-red-600'><X
                    className='w-3 h-3 text-white'/></div> : <></>)}
              No: {index + 1}
            </div>
            <div className='space-x-1'><span className='font-bold'>Name:</span> {data.name}</div>
            <div className='space-x-1'><span className='font-bold'>Description:</span> {data?.description}</div>
            <div className='space-x-1'><span className='font-bold'>Price:</span> {data.price}</div>
            <div className='space-x-1'><span className='font-bold'>Quantity:</span> {data.quantity}</div>
          </div>
        ))}
      </div>

      {displayState === DISPLAY_STATE.PENDING && <Button className='w-full' onClick={handleSubmit}>Submit</Button>}
      {displayState === DISPLAY_STATE.CONFIRMED && <Button className='w-full' onClick={handleClose}>Close</Button>}
    </div>
  )
}

export default UploadResultDisplay
