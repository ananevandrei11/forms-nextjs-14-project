'use client';
export default function SubmitButtonRHF({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      className="bg-blue-500 py-2 px-4 rounded-md w-full hover:bg-blue-700">
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}
