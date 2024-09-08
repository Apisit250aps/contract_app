import { FC, ReactNode } from "react"

interface ModalProps {
  children?: ReactNode
  title?: string
  id: string
  isOpen: boolean
  onClose: () => void
}

const Modal: FC<ModalProps> = ({ 
  children, 
  title = "Modal", 
  id, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <dialog className="modal" open={isOpen} id={id} role="dialog">
      <div className="modal-box">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          aria-label="Close"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold mb-3">{title}</h3>
        <main>{children}</main>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </dialog>
  )
}

export default Modal