'use client';

import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { dealSchema, DealType } from '@/_schemas/deal';
import { formHandlerDealRHFAction } from '@/_actions/formHandlerDealRHF';
import SubmitButtonRHF from './SubmitButtonRHF';

export default function DealFormRHF() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<DealType>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      name: '',
      link: '',
      couponCode: '',
      discount: 10
    },
    mode: 'onChange'
  });

  const onSubmit = async (deal: DealType) => {
    const { successMsg } = await formHandlerDealRHFAction(deal);
    if (successMsg) {
      toast.success(successMsg);
      reset();
    }
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-4">
        <div>
          <label className="block " htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            aria-required
            className="w-full p-2 rounded-md text-gray-900"
            {...register('name')}
          />
          <div className="h-8">
            {errors?.name && (
              <small className="text-red-400">{errors.name?.message}</small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="link">
            Link
          </label>
          <input
            type="text"
            id="link"
            aria-required
            pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
            title="Please enter a valid url"
            className="w-full p-2 rounded-md text-gray-900"
            {...register('link')}
          />
          <div className="h-8">
            {errors?.link && (
              <small className="text-red-400">{errors.link?.message}</small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="couponCode">
            Coupon Code
          </label>
          <input
            type="text"
            id="couponCode"
            aria-required
            className="w-full p-2 rounded-md text-gray-900"
            {...register('couponCode')}
          />
          <div className="h-8">
            {errors?.couponCode && (
              <small className="text-red-400">{errors.couponCode?.message}</small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="discount">
            Discount (%)
          </label>
          <input
            type="number"
            id="discount"
            aria-required
            className="w-full p-2 rounded-md text-gray-900"
            {...register('discount')}
          />
          <div className="h-8">
            {errors?.discount && (
              <small className="text-red-400">{errors.discount?.message}</small>
            )}
          </div>
        </div>
        <SubmitButtonRHF pending={isSubmitting} />
      </div>
    </form>
  );
}
