'use client';

import { FC } from 'react';
import { Enquiry } from '../Artists/artist.interface';
import Popup from '@/components/CoreUI/Popup';
import useApiPost from '@/hooks/useApiPost';
import useApiQuery from '@/hooks/useApiQuery';
import CKEditor from '../Common/CKEditor';
import { toast } from 'react-toastify';

interface JoinMailingListPopupProps {
  show: boolean;
  onClose: () => void;
}

const JoinMailingListPopup: FC<JoinMailingListPopupProps> = ({ show, onClose }) => {
  // Sử dụng hook dùng chung để post data lên API
  const { mutate: postEnquiry, status, error } = useApiPost<Enquiry>({
    path: 'items/data_form_join',
    onSuccess: () => {
      toast.success('Form submitted successfully!');
    },
    onError: err => {
          toast.error(`Submission failed: ${err?.message || 'Unknown error'}`);
        },
  });

  const { data } = useApiQuery<any>('/items/form_join');
  const formJoin = data?.data;

  if (!formJoin) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const enquiry: Enquiry = {
      first_name: formData.get('firstName') as string,
      last_name: formData.get('lastName') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string || '',
    };
    postEnquiry(enquiry);
  };

  return (
    <Popup className="max-w-lg p-8" show={show} title={formJoin?.title} onClose={onClose}>
      <form className="flex flex-col gap-4 capitalize" onSubmit={handleSubmit}>
        <div className="flex flex-row gap-2">
          <label className="block w-1/4 mb-1 text-lg font-light">
            {formJoin?.first_name} <span className="text-red-500">*</span>
          </label>
          <input
            name="firstName"
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded "
            placeholder={formJoin?.ph_first_name}
          />
        </div>
        <div className="flex flex-row gap-2">
          <label className="block w-1/4 mb-1 text-lg font-light">
            {formJoin?.last_name} <span className="text-red-500">*</span>
          </label>
          <input
            name="lastName"
            type="text"
            placeholder={formJoin?.ph_last_name}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded "
          />
        </div>
        <div className="flex flex-row gap-2">
          <label className="block w-1/4 mb-1 text-lg font-light">
            {formJoin?.email} <span className="text-red-500">*</span>{' '}
          </label>
          <input
            name="email"
            type="email"
            placeholder={formJoin?.ph_email}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded "
          />
        </div>
        <button
          type="submit"
          disabled={status === 'pending'}
          className="h-10 py-1 mt-2 ml-24 tracking-widest text-white uppercase transition bg-black rounded w-36 text-md hover:bg-gray-800 disabled:opacity-50"
        >
          {formJoin?.submit}
        </button>
      </form>
      <hr className="my-6" />
      <div className="mb-2 text-sm text-gray-500">
        <CKEditor data={formJoin?.description} />
      </div>
    </Popup>
  );
};

export default JoinMailingListPopup;
