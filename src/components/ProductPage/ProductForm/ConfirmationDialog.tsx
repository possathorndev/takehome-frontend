import {Loader2} from "lucide-react";

// Components
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

// Providers
import {useProductDialogCtx} from "@/contexts/ProductDialogProvider";

export enum DIALOG_STATE {
  CREATE = 0,
  EDIT = 1,
  DELETE = 2
}

interface Props {
  isPending: boolean
  handleConfirm: () => void
}

const ConfirmationDialog = ({isPending, handleConfirm}: Props) => {
  const {open, triggerDialog, dialogState} = useProductDialogCtx()

  const dialogTitle = () => {
    switch (dialogState) {
      case DIALOG_STATE.CREATE:
        return 'Do you want to create new product?'
      case DIALOG_STATE.EDIT:
        return 'Do you want to save changes?'
      case DIALOG_STATE.DELETE:
        return 'Do you want to delete this product?'
      default:
        return ''
    }
  }

  const dialogDescription = () => {
    switch (dialogState) {
      case DIALOG_STATE.CREATE:
      case DIALOG_STATE.EDIT:
        return ''
      case DIALOG_STATE.DELETE:
        return 'This action cannot be undone. This will permanently delete your product.'
      default:
        return ''
    }
  }

  return (
    <Dialog open={open} onOpenChange={triggerDialog}>
      <DialogContent>
        <DialogHeader className='space-y-8'>
          <DialogTitle>{dialogTitle()}</DialogTitle>
          <DialogDescription>
            {dialogDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-2 gap-2'>
          <Button variant='secondary' onClick={() => triggerDialog(false)}>Cancel</Button>
          <Button disabled={isPending} onClick={handleConfirm}>{isPending ?
            <Loader2 className='animate-spin w-4 h-4'/> : 'Confirm'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationDialog
