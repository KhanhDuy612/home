'use client';

import { useState } from 'react';
import JoinMailingListPopup from './JoinMailingListPopup';
import useApiQuery from '@/hooks/useApiQuery';

type JoinMailingListProps = {
    className?: string;
}
export default function JoinMailingList({ className }: JoinMailingListProps) {
    const [showMailing, setShowMailing] = useState(false);
    const { data } = useApiQuery<any>('/items/form_join');
      const formJoin = data?.data;

    return (
        <>
            <ul className={`flex gap-4 mb-8 -ml-2 ${className ||''}`}>
                <li
                    onClick={() => setShowMailing(true)}
                    className={`underline cursor-pointer hover:no-underline flex gap-4 items-center`}
                >
                    <img src="/images/email.svg" alt="Mailing List" className="w-10 h-10" />
                    {formJoin && formJoin?.title_all}
                </li>
            </ul>
            <JoinMailingListPopup show={showMailing} onClose={() => setShowMailing(false)} />
        </>
    );
}
