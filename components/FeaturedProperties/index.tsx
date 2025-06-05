"use client";

import FeaturedProperties from "./FeaturedProperties";

export default function Room() {
  return (
    <main className="flex flex-col items-center min-h-screen py-10 bg-gray-100">
      <h1 className="mb-2 text-4xl font-bold text-center text-gray-900">
        Discover your featured property
      </h1>
      <p className="max-w-xl mb-8 text-center text-gray-500">
        Leo morbi faucibus mattis pharetra tellus velit ultricies velit ultricies duis rhoncus
      </p>
      <FeaturedProperties />
    </main>
  );
}