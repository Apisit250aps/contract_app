import { FC, ReactNode } from "react"

const Modal: FC<{ children?: ReactNode; title?: string; id: string }> = ({
  children,
  title = "Modal",
  id
}) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <dialog className="modal" role="dialog">
        <div className="modal-box">
          {/* if there is a button in form, it will close the modal */}
          <label
            htmlFor={id}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold mb-3">{title}</h3>
          <main>{children}</main>
          <div className="modal-action">
            <button className="btn btn-primary">Create</button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default Modal
