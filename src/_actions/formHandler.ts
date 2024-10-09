'use server';

import { dealSchema, DealType } from "@/_schemas/deal";
import { DealFormState, StringMap } from "@/_types/deal";
import { convertZodErrors } from "@/_utils/erorrs";

export const formHandlerAction = async (
  prevState: DealFormState<DealType>,
  formData: FormData
): Promise<DealFormState<DealType>> => {
  console.log('without javascript');
  const invalidatedDeal: StringMap = {
    name: formData.get('name') as string,
    link: formData.get('link') as string,
    couponCode: formData.get('couponCode') as string,
    discount: formData.get('discount') as string,
  };

  const validated = dealSchema.safeParse(invalidatedDeal);
  console.log(validated);
  if (!validated.success) {
    const errors = convertZodErrors(validated.error);
    const dealData: DealType = {
      name: formData.get('name') as string,
      link: formData.get('link') as string,
      couponCode: formData.get('couponCode') as string,
      discount: Number(formData.get('discount') as string || 10),
    };
    return {
      errors,
      data: dealData,
      blurs: {
        name: true,
        link: true,
        couponCode: true,
        discount: true
      }
    };
  } else {
    return {
      successMsg: 'Deal added successfully',
      errors: {},
      data: {
        name: '',
        link: '',
        couponCode: '',
        discount: 10
      }
    }
  }
}