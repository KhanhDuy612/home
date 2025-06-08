'use client';

import CKEditor from '@/components/Common/CKEditor';
import ScrollFadeIn from '@/components/ScrollFadeIn/ScrollFadeIn';
import useApiQuery from '@/hooks/useApiQuery';
import Link from 'next/link';
import { useTitle } from '@/hooks/useTitle';
import { useEffect, useMemo } from 'react';
import FormContact from '@/components/FormContact';
import Faq from './Faq';
import { Contact as IContact, LinkTo } from './contact.interface';
import OfficesSection from '../OfficesSection';

export default function Contact() {
  const { data } = useApiQuery<IContact>('/items/contact');
  const contact = data?.data;
  const mapSrc = contact?.ggmap;

  const { setTitle } = useTitle();

  const connectLinks = useMemo(() => {
    return contact?.connect_link || [];
  }, [contact]);
  useEffect(() => {
    setTitle('Contact');
  }, []);
  return (
    <>
      <section className="py-40">
        <div className="container text-neutral-dark">
          <div className="space-y-15">
            <ScrollFadeIn>
              <div className="space-y-15">
                <h1 className="text-5xl font-medium uppercase tracking-[3.19px]">
                  {contact?.title || 'Contact Us'}
                </h1>
                <div className="">
                  <iframe
                    className="w-full h-full min-h-[385px]"
                    src={mapSrc}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <div className="flex flex-col space-y-5 md:space-y-0 md:space-x-8 lg:space-x-12 md:flex-row">
                  <div className="md:w-1/2">
                    <div className="mb-6 space-y-6 text-base text-center"></div>
                    <FormContact />
                  </div>
                </div>
              </div>
            </ScrollFadeIn>
          </div>{' '}
          {/* <Faq /> */}
        </div>
      </section>
      <OfficesSection />
    </>
  );
}
