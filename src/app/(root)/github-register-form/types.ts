import { FieldError, UseFormRegister } from "react-hook-form";

export type FormDataType = {
  email: string;
  githubUrl: string;
  yearsOfExperience: number;
  password: string;
  confirmPassword: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormDataType>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};


export type ValidFieldNames = keyof FormDataType;