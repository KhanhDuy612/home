'use client';

import useApiPost from '@/hooks/useApiPost';
import useApiQuery from '@/hooks/useApiQuery';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function ContactForm() {
  const { data } = useApiQuery<any>('/items/form_contact');
  const formContact = data?.data;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    contactMethods: [] as string[],
    message: '',
  });

  const postContact = useApiPost({
    path: '/items/data_form_contact',
    onSuccess: () => {
      toast.success('Form submitted successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        contactMethods: [],
        message: '',
      });
    },
    onError: err => {
      toast.error(`Submission failed: ${err?.message || 'Unknown error'}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postContact.mutate({
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      contact_methods: formData.contactMethods,
      message: formData.message,
    });
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      contactMethods: checked
        ? [...prev.contactMethods, value]
        : prev.contactMethods.filter(method => method !== value),
    }));
  };

  const checkboxOptions = [
    formContact?.check_box_one,
    formContact?.check_box_two,
    formContact?.check_box_three,
  ].filter(Boolean);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 capitalize">
        <div className="flex flex-col space-y-3">
          <label htmlFor="firstName" className="block mb-1 text-2xl font-medium">
            {formContact?.first_name}
          </label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            placeholder={formContact?.ph_first_name}
            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="phone" className="block mb-1 text-2xl font-medium">
            {formContact?.phone}
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            placeholder={formContact?.ph_phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="email" className="block mb-1 text-2xl font-medium">
            {formContact?.email}
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            placeholder={formContact?.ph_email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 text-2xl font-medium">
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            placeholder="Your message"
            onChange={e => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={4}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[200px] py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg uppercase"
          >
            {formContact?.submit || 'Submit'}
          </button>
        </div>
      </form>
      <ToastContainer style={{ marginTop: '100px' }} />
    </>
  );
}
