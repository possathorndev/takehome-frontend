import {useMemo} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChevronLeft} from "lucide-react";

// Apis
import {Product} from "@/lib/api/product";

// Hooks
import {useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation} from "@/hooks/useProduct";

// Components
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import GenerateDescriptionButton from "@/components/ProductPage/ProductForm/GenerateDescriptionButton";
import FormCta from "@/components/ProductPage/ProductForm/FormCta";
import ProductPriceInput from "@/components/ProductPage/ProductForm/ProductPriceInput";
import ProductQuantityInput from "@/components/ProductPage/ProductForm/ProductQuantityInput";
import ConfirmationDialog, {DIALOG_STATE} from "@/components/ProductPage/ProductForm/ConfirmationDialog";

// Providers
import {useProductDialogCtx} from "@/contexts/ProductDialogProvider";

export enum FORM_TYPE {
  CREATE = 0,
  EDIT = 1
}

export const productFormSchema = z.object({
  slug: z.string().optional(),
  name: z.string().min(1, 'Name is required').max(40, 'Name too long'),
  description: z.string().optional(),
  price: z.preprocess(
    (value) => (value === "" ? undefined : parseFloat(value as string)),
    z.number().positive("Price must be positive")
  ),
  quantity: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z.number()
      .nonnegative("Quantity must be greater or equal to 0")
      .refine((val) => Number.isInteger(val), "Quantity must be an integer") // Ensure it's an integer
  ),
});

interface Props {
  formType: FORM_TYPE
  data?: Product
}

const ProductForm = ({formType, data}: Props) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const {triggerDialog, dialogState} = useProductDialogCtx()
  const {mutateAsync: createMutateAsync, isPending: isCreatePending} = useCreateProductMutation()
  const {mutateAsync: updateMutateAsync, isPending: isUpdatePending} = useUpdateProductMutation(data?.slug || '')
  const {mutateAsync: deleteMutateAsync, isPending: isDeletePending} = useDeleteProductMutation()

  const isPending = useMemo(() => isCreatePending || isUpdatePending || isDeletePending, [isCreatePending, isUpdatePending, isDeletePending])

  const form = useForm<z.infer<typeof productFormSchema>>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      slug: data?.slug,
      name: data?.name || '',
      description: data?.description || '',
      price: data?.price,
      quantity: data?.quantity
    }
  });

  const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
    if (dialogState === undefined) return

    const mutationMap = {
      [DIALOG_STATE.CREATE]: createMutateAsync,
      [DIALOG_STATE.EDIT]: updateMutateAsync,
      [DIALOG_STATE.DELETE]: deleteMutateAsync,
    };

    const mutationFn = mutationMap[dialogState];

    if (mutationFn) {
      await mutationFn(values as Product);
      triggerDialog(false)
      router.replace('/')
      queryClient.invalidateQueries({queryKey: ['products']})
    }
  };

  const onConfirm = () => {
    onSubmit(form.getValues())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <div className='flex gap-4 items-center'>
            <Link href={'/'} className='flex items-center text-blue-500'>
              <ChevronLeft className='w-4 h-4'/>
              Back
            </Link>
            <div className='text-xl font-bold'>Product Information</div>
          </div>


          <div className='flex flex-col gap-4'>
            {/* Name */}
            <FormField
              control={form.control}
              name='name'
              disabled={form?.formState?.isSubmitting}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='rounded-lg border-border bg-transparent'
                      placeholder='Enter product name'
                      max={40}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name='description'
              disabled={form?.formState?.isSubmitting}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <div className='flex items-center gap-2'>
                      <Textarea
                        {...field}
                        className='bg-transparent h-32'
                        placeholder='Type product description here.'
                        value={field.value ?? ''}
                      />
                      <GenerateDescriptionButton/>
                    </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            {/* Price & Quantity */}
            <div className='grid grid-cols-2 gap-4'>
              <ProductPriceInput/>
              <ProductQuantityInput/>
            </div>

            {/* Button */}
            <FormCta formType={formType}/>
          </div>

          {/* Confirmation Dialog */}
          <ConfirmationDialog
            handleConfirm={onConfirm}
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
