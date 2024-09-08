import { FC, ChangeEvent } from "react"

interface TextInputProp {
  label?: string
  type?: string
  placeholder?: string
  value: string
  name?: string
  set: (value: ChangeEvent<HTMLInputElement>) => void
}

const InputLabelInside: FC<TextInputProp> = ({
  label,
  type = "text",
  placeholder,
  value,
  name = "",
  set
}) => {
  return (
    <label className="input mb-2 flex items-center gap-2 bg-base-200 ">
      {label}
      <input
        type={type}
        className="grow"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={set}
      />
    </label>
  )
}

export default InputLabelInside
