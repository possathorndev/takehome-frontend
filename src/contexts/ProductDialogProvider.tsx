'use client';

import {createContext, useContext, useState} from 'react';
import {DIALOG_STATE} from "@/components/ProductPage/ProductForm/ConfirmationDialog";

type ProductDialogContextValues = {
  open: boolean
  dialogState?: DIALOG_STATE
  triggerDialog: (isOpen: boolean) => void
  changeDialogState: (state: DIALOG_STATE) => void
};

const initialState: ProductDialogContextValues = {
  open: false,
  triggerDialog: () => {
  },
  changeDialogState: () => {
  }
};

export const ProductDialogContext: React.Context<ProductDialogContextValues> =
  createContext<ProductDialogContextValues>(initialState);

export const ProductDialogContextProvider = ({children}: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [dialogState, setDialogState] = useState<DIALOG_STATE>()

  const triggerDialog = (isOpen: boolean) => setOpen(isOpen)
  const changeDialogState = (state: DIALOG_STATE) => setDialogState(state)

  return (
    <ProductDialogContext.Provider
      value={{
        open,
        dialogState,
        triggerDialog,
        changeDialogState
      }}
    >
      {children}
    </ProductDialogContext.Provider>
  );
};

export function useProductDialogCtx(): ProductDialogContextValues {
  const context = useContext(ProductDialogContext);
  if (!context) {
    throw new Error('Missing ProductDialog context');
  }
  return context;
}
