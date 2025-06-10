'use client';
import useApiQuery from '@/hooks/useApiQuery';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';

export default function Footer() {
  const { data: open_hour } = useApiQuery<any>('/items/opening_hours');
  const { data: find_us } = useApiQuery<any>('/items/find_us');
  const { data: property } = useApiQuery<any>('/items/property');
  const { data: links } = useApiQuery<any>('/items/links');
  const { data: global } = useApiQuery<any>('/items/global');
  const openingHours = open_hour?.data;
  const findUs = find_us?.data;
  const propertyItems = property?.data;
  const linksItems = links?.data;
  if (!openingHours || !findUs || !propertyItems || !linksItems) {
    return <div className="text-center text-white">No footer data available</div>;
  }

  return (
    <footer className="bg-[#0f0d1d] text-white text-sm px-4 md:px-8 py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {openingHours && (
            <div>
              <h3 className="mb-2 font-semibold">{openingHours.title}</h3>
              <ul className="space-y-1">
                {openingHours.content.map((item, idx) => (
                  <li key={idx}>{item.content}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Find Us */}
          {findUs && (
            <div>
              <h3 className="mb-2 font-semibold">{findUs.title}</h3>
              <ul className="space-y-1">
                {findUs.content.map((item, idx) => (
                  <li key={idx}>{item.content_us}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Property */}
          {propertyItems && (
            <div>
              <h3 className="mb-2 font-semibold">{propertyItems.title}</h3>
              <ul className="space-y-1">
                {propertyItems.content.map((item, idx) => (
                  <li key={idx}>{item.content_property}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          {linksItems && (
            <div>
              <h3 className="mb-2 font-semibold">{linksItems.title}</h3>
              <ul className="space-y-1">
                {linksItems.content_link.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.link} className="hover:underline">
                      {item.title_link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Newsletter */}
          {/* <div>
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
          </div> */}
        </div>

        {/* Bottom line */}
        <div className="flex flex-col items-center justify-between gap-4 pt-4 mt-10 text-xs border-t border-white/10 md:flex-row">
          {global?.data?.copyright && (
            <div className="text-center">
              <p>{global.data.copyright}</p>
            </div>
          )}
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
