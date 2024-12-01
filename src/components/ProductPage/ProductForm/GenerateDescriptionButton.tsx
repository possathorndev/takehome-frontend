import {useFormContext} from "react-hook-form";
import {Sparkles} from "lucide-react";

// Apis
import {Product} from "@/lib/api/product";

// Hooks
import {useGenerateDescriptionMutation} from "@/hooks/useProduct";

// Components
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

// Utils
import {cn} from "@/lib/utils";

const GenerateDescriptionButton = () => {
  const form = useFormContext()
  
  const {mutateAsync, isPending} = useGenerateDescriptionMutation()

  const handleGenerateDescription = async () => {
    if (isPending) return

    const product = form.getValues()
    const description = await mutateAsync(product as Product)
    form.setValue('description', description)
    form.trigger('description');
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn('cursor-pointer bg-blue-500 w-8 h-8 flex items-center justify-center rounded-3xl', isPending && 'animate-pulse cursor-default')}
            onClick={handleGenerateDescription}>
            <Sparkles className={cn('text-white w-4 h-4', isPending && 'animate-spin')}/>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Generate description by AI<br/><span className='text-red-500'>*</span>Product name is required</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default GenerateDescriptionButton
