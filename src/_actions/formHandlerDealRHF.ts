'use server';

import { dealSchema, DealType } from "@/_schemas/deal";
import { DealFormState } from "@/_types/deal";
import { convertZodErrors } from "@/_utils/erorrs";

export const formHandlerDealRHFAction = async (
  deal: DealType
): Promise<DealFormState<DealType>> => {
  const validated = dealSchema.safeParse(deal);
  if (!validated.success) {
    const errors = convertZodErrors(validated.error);
    return { errors };
  } else {
    return { successMsg: 'Deal added successfully' }
  }
}