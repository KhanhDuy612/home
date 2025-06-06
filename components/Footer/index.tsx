import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';

const footerData = [
  {
    title: 'Opening hours',
    items: ['Mon–Fri 08:00AM – 08:00PM', 'Sat–Sun 08:00AM – 08:00PM'],
  },
  {
    title: 'Find Us',
    items: [
      '8911 Tanglewood Ave.',
      'Capitol Heights, MD 20743',
      '(566) 237-4687',
      'moinfou@hotmail.com',
    ],
  },
  {
    title: 'Property',
    items: ['Apartments', "Villa's", 'Houses', 'Commercial'],
  },
  {
    title: 'Links',
    items: ['Home', 'Property', 'About', 'Contact'],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f0d1d] text-white text-sm px-4 md:px-8 py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {footerData.map((section, index) => (
            <div key={index}>
              <h3 className="mb-2 font-semibold">{section.title}</h3>
              <ul className="space-y-1">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="mb-2 font-semibold">Newsletter</h3>
            <p className="mb-2">Subscribe to our newsletter</p>
            <form className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-2 py-1 text-black rounded-md"
              />
              <button
                type="submit"
                className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom line */}
        <div className="flex flex-col items-center justify-between gap-4 pt-4 mt-10 text-xs border-t border-white/10 md:flex-row">
          <p>©Copyright Real Estate 2025.</p>
          <div className="flex gap-4 text-base text-white">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaPinterestP />
          </div>
        </div>
      </div>
    </footer>
  );
}
