'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';

import { formHandlerAction } from '@/_actions/formHandler'
import { DealFormState, StringMap, StringToBooleanMap } from '@/_types/deal';
import { dealSchema, DealType } from '@/_schemas/deal';
import SubmitButton from './SubmitButton';
import { convertZodErrors } from '@/_utils/erorrs';

const initialState: DealFormState<DealType> = {}

const initialData = {
  name: '',
  link: '',
  couponCode: '',
  discount: 10
}

export default function DealForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [serverState, formAction] = useFormState(
    formHandlerAction,
    initialState
  );

  const [blurs, setBlurs] = useState<StringToBooleanMap>(serverState?.blurs || {});
  const [deal, setDeal] = useState<DealType>(serverState.data || initialData);
  const [errors, setErrors] = useState<StringMap>(serverState?.errors || {});

  useEffect(() => {
    if (serverState.successMsg) {
      toast.success(serverState.successMsg);
      setBlurs({});
    } else if (serverState.errors) {
      setErrors(serverState.errors);
    }

    if (serverState.data) {
      setDeal(serverState.data);
    }
  }, [serverState]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    console.log(blurs);
    setBlurs(prev => ({ ...prev, [name]: true }));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeal(prev => {
      const updData = { ...prev, [name]: value };
      const validated = dealSchema.safeParse(updData);
      if (validated.success) {
        setErrors({});
      } else {
        const errors = convertZodErrors(validated.error);
        setErrors(errors);
      }
      return updData;
    });
  }

  return (
    <form className="w-full" action={formAction} ref={formRef}>
      <div className="flex flex-col gap-y-4">
        <div>
          <label className="block " htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            aria-required
            value={deal.name}
            defaultValue={serverState.data?.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {blurs?.name && errors?.name && (
              <small className="text-red-400">{errors.name}</small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="link">
            Link
          </label>
          <input
            type="text"
            name="link"
            id="link"
            aria-required
            pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
            title="Please enter a valid url"
            value={deal.link}
            defaultValue={serverState.data?.link}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {blurs?.link && errors?.link && (
              <small className="text-red-400">{errors.link}</small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="couponCode">
            Coupon Code
          </label>
          <input
            type="text"
            name="couponCode"
            id="couponCode"
            aria-required
            value={deal.couponCode}
            defaultValue={serverState.data?.couponCode}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {blurs?.couponCode && errors?.couponCode && (
              <small className="text-red-400">{errors.couponCode}</small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="discount">
            Discount (%)
          </label>
          <input
            type="number"
            name="discount"
            id="discount"
            aria-required
            value={deal.discount}
            defaultValue={serverState.data?.discount}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {blurs?.discount && errors?.discount && (
              <small className="text-red-400">{errors.discount}</small>
            )}
          </div>
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
