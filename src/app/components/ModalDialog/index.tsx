"use client"

import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

type ModalDialogProps = {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  title?: string;
  content?: string;
}

const ModalDialog: React.FC<ModalDialogProps> = ({ isOpen, setIsModalOpen, content, title }) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsModalOpen(false)}>
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="absolute absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2">
        <DialogPanel className="w-96 space-y-4 bg-slate-900 p-5 rounded-lg">
          <DialogTitle className="font-bold text-center">{title}</DialogTitle>
          <Description className="text-center">
            {content}
          </Description>
          <hr />
          <div className='justify-self-end'>
            <button onClick={() => setIsModalOpen(false)}>OK</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalDialog;