'use client';

import useApiPost from '@/hooks/useApiPost';
import useApiQuery from '@/hooks/useApiQuery';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ContactInfo from './ContactInfo';

export default function FormContact({ home = false }: { home?: boolean }) {
  const { data } = useApiQuery<any>('/items/form_contact');
  const formContact = data?.data;
  console.log('Form Contact Data:', formContact);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
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
      message: formData.message,
    });
  };

  if (!formContact) {
    return <div className="text-center text-white">No contact form data available</div>;
  }

  return (
    <div
      className="flex items-center justify-center "
      style={{
        background: 'radial-gradient(circle at 70% 30%, #e6e2e2 0%, #bdb7b7 100%)',
        borderRadius: '24px',
        padding: '40px',
      }}
    >
      <div className='container mx-auto'>
      <div className="flex flex-col w-full bg-transparent md:flex-row">
        {/* Left: Form */}
        <div className="bg-[#131435] text-white rounded-2xl shadow-lg p-8 flex-1 flex flex-col justify-center mr-0 md:mr-12">
          <h2 className="mb-2 text-3xl font-bold">Get in touch</h2>
          <p className="mb-6 text-base font-light">
            Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              placeholder="Your name"
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full p-3 text-black placeholder-gray-400 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              id="email"
              type="email"
              value={formData.email}
              placeholder="Your mail"
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 text-black placeholder-gray-400 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              placeholder="Your phone"
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-3 text-black placeholder-gray-400 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              id="message"
              value={formData.message}
              placeholder="Your message"
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 text-black placeholder-gray-400 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
              required
            />
            <button
              type="submit"
              className="w-full py-3 mt-2 font-semibold text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Send message
            </button>
          </form>
        </div>
        {/* Right: Contact Info */}
        <ContactInfo home={home} />
      </div>
      </div>
      {/* <ToastContainer style={{ marginTop: '100px' }} /> */}
    </div>
  );
}