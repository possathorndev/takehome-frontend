import {useFormContext} from "react-hook-form";

// Components
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

const quickQuantityValues = [5, 10, 50, 100, 500, 1000]

const ProductQuantityInput = () => {
  const form = useFormContext()

  const handleQuickQuantityInput = (quantity: number) => {
    form.setValue('quantity', quantity, {shouldValidate: true})
    form.trigger('quantity');
  }

  return (
    <FormField
      control={form.control}
      name='quantity'
      disabled={form?.formState?.isSubmitting}
      render={({field}) => (
        <FormItem>
          <FormLabel>Quantity</FormLabel>
          <FormControl>
            <div className='space-y-2'>
              <Input
                {...field}
                value={field.value ?? ''}
                type='number'
                className='text-right'
                placeholder='0'
                step='1'
                onWheel={(event) => event.preventDefault()}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value === "") {
                    field.onChange("");
                  } else {
                    field.onChange(+value);
                  }
                }}
              />

              {/* Quick Input */}
              <div className='grid grid-cols-3 md:grid-cols-6 gap-2'>
                {quickQuantityValues.map((quantity, index) => (
                  <div
                    key={index}
                    className='text-sm flex items-center hover:bg-primary hover:text-white cursor-pointer justify-center rounded-lg border-border border-[1px] p-2'
                    onClick={() => handleQuickQuantityInput(quantity)}
                  >
                    {quantity}
                  </div>
                ))}
              </div>

            </div>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}

export default ProductQuantityInput
