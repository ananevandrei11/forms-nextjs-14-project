import { FormFieldProps } from "../types";

export function FormField(props: FormFieldProps) {
  const {
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber,
  } = props;

  return (
    <label className="flex flex-col gap-2" htmlFor={name}>
      <span className="text-gray-900 cursor-pointer">{placeholder || name}</span>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className="w-full p-2 rounded-md text-gray-900"
        {...register(name, { valueAsNumber })}
      />
      {error && <span className="text-red-400">{error.message}</span>}
    </label>
  );
}
