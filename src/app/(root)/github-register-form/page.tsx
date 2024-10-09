
'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/_schemas/user-schena";
import { FormDataType, ValidFieldNames } from "./types";
import { FormField } from "./components/FieldForm";
import toast from "react-hot-toast";

export default function GithubRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormDataType>({
    resolver: zodResolver(UserSchema)
  });

  const onSubmit = async (data: FormDataType) => {
    try {
      const response = await fetch("http://localhost:3000/api/github-register-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      const { errors = null } = result;

      if (errors) {
        const fieldErrorMapping: Record<string, ValidFieldNames> = {
          email: "email",
          githubUrl: "githubUrl",
          yearsOfExperience: "yearsOfExperience",
          password: "password",
          confirmPassword: "confirmPassword",
        };

        Object.keys(fieldErrorMapping).forEach(
          (field) => {
            errors?.[field]
              ? setError(fieldErrorMapping[field], {
                type: "server",
                message: errors[field],
              })
              : null;
          }
        );
        const message = Object.values(errors).join(", \n");
        toast.error(message);
        return;
      }

      toast.success("Form submitted successfully!");
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid col-auto gap-2">
        <h1 className="text-3xl font-bold mb-4">
          Zod & React-Hook-Form
        </h1>
        <FormField
          type="email"
          placeholder="Email"
          name="email"
          register={register}
          error={errors.email}
        />

        <FormField
          type="text"
          placeholder="GitHub URL"
          name="githubUrl"
          register={register}
          error={errors.githubUrl}
        />

        <FormField
          type="number"
          placeholder="Years of Experience (1 - 10)"
          name="yearsOfExperience"
          register={register}
          error={errors.yearsOfExperience}
          valueAsNumber
        />

        <FormField
          type="password"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password}
        />

        <FormField
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
        />
        <button type="submit" className="p-2 bg-cyan-700 rounded-md">
          Submit
        </button>
      </div>
    </form>
  );
}