'use client';

import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="px-4 py-2 my-4  rounded-lg p-2 text-black border-[1px] border-black font-medium bg-[#e6e6e6] hover:bg-[#aa9898]"
    >
      Back
    </button>
  );
};

export default BackButton;
