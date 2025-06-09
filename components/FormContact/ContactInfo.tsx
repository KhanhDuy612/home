import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="flex flex-col items-start justify-center flex-1 mt-12 md:mt-0 md:ml-12">
      <h2 className="mb-2 text-3xl font-bold text-black">Feel free to contact us</h2>
      <p className="mb-6 text-base text-gray-700">Leo morbi faucibus mattis pharetra</p>
      <ul className="space-y-4 text-lg">
        <li className="flex items-start">
          <FaMapMarkerAlt className="mt-1 mr-3 text-blue-700" />
          <span>
            <span className="font-semibold text-black">8911 Tanglewood Ave.</span>
            <br />
            Capitol Heights, MD 20743
          </span>
        </li>
        <li className="flex items-center">
          <FaPhone className="mr-3 text-blue-700" />
          <span className="font-semibold text-black">(566) 237-4687</span>
        </li>
        <li className="flex items-center">
          <FaPhone className="mr-3 text-blue-700" />
          <span className="font-semibold text-black">(239) 319-8083</span>
        </li>
        <li className="flex items-center">
          <FaEnvelope className="mr-3 text-blue-700" />
          <span className="font-semibold text-black">moinefou@hotmail.com</span>
        </li>
      </ul>
    </div>
  );
}
