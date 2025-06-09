'use client';
import useApiQuery from '@/hooks/useApiQuery';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function ContactInfo({ home }) {
  const { data: contactData } = useApiQuery<any>(`/items/contact_info`);
  if (!contactData || !contactData.data) {
    console.error('No contact data found');
    return <div className="text-center text-black">No contact information available</div>;
  }
  const contact = contactData.data;
  if (!home) {
    return (
      <div className="flex flex-col items-start justify-center flex-1 mt-12 md:mt-0 md:ml-12">
        <h2 className="mb-2 text-3xl font-bold text-black">{contact.title}</h2>
        <p className="mb-6 text-base text-gray-700">{contact.content}</p>
        <ul className="space-y-4 text-lg">
          <li className="flex items-start">
            <FaMapMarkerAlt className="mt-1 mr-3 text-blue-700" />
            <span>
              <span className="font-semibold text-black">{contact.location}</span>
            </span>
          </li>
          <li className="flex items-center">
            <FaPhone className="mr-3 text-blue-700" />
            <span className="font-semibold text-black">{contact.phone}</span>
          </li>
          <li className="flex items-center">
            <FaPhone className="mr-3 text-blue-700" />
            <span className="font-semibold text-black">{contact.phone_two}</span>
          </li>
          <li className="flex items-center">
            <FaEnvelope className="mr-3 text-blue-700" />
            <span className="font-semibold text-black">{contact.email}</span>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-start justify-center flex-1 mt-12 md:mt-0 md:ml-12">
        <h2 className="mb-4 text-2xl font-bold md:text-3xl">
          Putting a plan to action,
          <br />
          to assure your satisfaction!
        </h2>
        <p className="text-">
          Arcu laoreet malesuada nunc eget. Fermentum ut dui etiam aliquam habitant elit
        </p>
      </div>
    );
  }
}
