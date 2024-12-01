import {useMemo} from "react";
import {useFormContext} from "react-hook-form";
import {Trash} from "lucide-react";
import {cn} from "@/lib/utils";

// Components
import {Button} from "@/components/ui/button";
import {DIALOG_STATE} from "@/components/ProductPage/ProductForm/ConfirmationDialog";
import {FORM_TYPE} from "@/components/ProductPage/ProductForm/ProductForm";

// Providers
import {useProductDialogCtx} from "@/contexts/ProductDialogProvider";

interface Props {
  formType: FORM_TYPE
}

const FormCta = ({formType}: Props) => {
  const {triggerDialog, changeDialogState} = useProductDialogCtx()
  const form = useFormContext()

  const isButtonDisabled = useMemo(() => !form.formState.isValid || !form.formState.isDirty || form.formState.isSubmitting, [form.formState.isValid, form.formState.isDirty, form.formState.isSubmitting])

  const handleDeleteCta = (event: React.FormEvent) => {
    event.preventDefault()
    changeDialogState(DIALOG_STATE.DELETE)
    triggerDialog(true)
  }

  const handleSubmitCta = (event: React.FormEvent) => {
    event.preventDefault()
    changeDialogState(formType === FORM_TYPE.CREATE ? DIALOG_STATE.CREATE : DIALOG_STATE.EDIT)
    triggerDialog(true)
  }

  return (
    <div className='mt-4 grid grid-cols-8 gap-2'>
      {formType !== FORM_TYPE.CREATE &&
          <Button
              variant='destructive'
              className='col-span-1'
              disabled={form?.formState?.isSubmitting}
              onClick={handleDeleteCta}
          >
              <Trash/>
          </Button>
      }
      <Button
        variant='default'
        className={cn('col-span-7', formType === FORM_TYPE.CREATE && 'col-span-8')}
        disabled={isButtonDisabled}
        onClick={handleSubmitCta}
      >
        {formType === FORM_TYPE.CREATE ? 'Submit' : 'Save'}
      </Button>
    </div>
  )
}

export default FormCta
