import { StringMap } from "@/_types/deal";
import { ZodError } from "zod";


export const convertZodErrors = (error: ZodError): StringMap => {
  const errors = error.issues.reduce((acc: StringMap, issue) => {
    acc[issue.path[0]] = issue.message;
    return acc;
  }, {});
  return errors;
}