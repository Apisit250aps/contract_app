import { FC, ChangeEvent } from "react"

interface TextInputProp {
  label?: string
  type?: string
  placeholder?: string
  value: string
  set: (value: ChangeEvent<HTMLInputElement>) => void
}

const InputLabelInside: FC<TextInputProp> = ({
  label,
  type = "text",
  placeholder,
  value,
  set
}) => {
  return (
    <label className="input input-bordered mb-2 flex items-center gap-2">
      {label}
      <input
        type={type}
        className="grow"
        placeholder={placeholder}
        value={value}
        onChange={set}
      />
    </label>
  )
}

export default InputLabelInside
