import {useFormContext} from "react-hook-form";
import {getDecimalCount} from "@/lib/formatNumber";

// Components
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

const quickPriceValues = [50, 100, 250, 500, 750, 1000]

const ProductPriceInput = () => {
  const form = useFormContext()

  const handleQuickPriceInput = (price: number) => {
    form.setValue('price', price, {shouldValidate: true})
    form.trigger('price');
  }

  return (
    <FormField
      control={form.control}
      name='price'
      disabled={form?.formState?.isSubmitting}
      render={({field}) => (
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <div className='space-y-2'>
              <Input
                {...field}
                type='number'
                className='text-right'
                placeholder='0.00'
                step='0.01'
                onWheel={(event) => event.preventDefault()}
                onChange={event => {
                  const value = event.target.value;
                  if (value === "") {
                    field.onChange("");
                  } else if (getDecimalCount(+value) <= 2) {
                    field.onChange(+value);
                  }
                }}
              />

              {/* Quick Input */}
              <div className='grid grid-cols-3 md:grid-cols-6 gap-2'>
                {quickPriceValues.map((price, index) => (
                  <div
                    key={index}
                    className='text-sm flex items-center hover:bg-primary hover:text-white cursor-pointer justify-center rounded-lg border-border border-[1px] p-2'
                    onClick={() => handleQuickPriceInput(price)}
                  >
                    {price}
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

export default ProductPriceInput
