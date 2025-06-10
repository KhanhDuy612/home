'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPatch, apiPost } from '@/hooks/apiPost';

interface BookingFormPopupProps {
  open: boolean;
  onClose: (shouldReload?: boolean) => void;
  roomId: string | null;
  roomTitle?: string;
}

export default function BookingFormPopup({ open, onClose, roomId, roomTitle }: BookingFormPopupProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    checkout: '',
    guest: 1,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
// window.location.reload();
// router.refresh();
    if (!roomId) return;
    try {
      setLoading(true);

      // 1. Create a new booking in Directus
      await apiPost(
        `items/bookings`,
        {
          ...form,
          room: roomId,
          status: 'pending',
        }
      );

      // 2. Update the room status to "reserved"
      await apiPatch(
        `items/rooms/${roomId}`,
        { order: 'reserved' }
      );

      setLoading(false);
      if (onClose) onClose(true);
      router.refresh();
      router.push('/booking');
    } catch (error) {
      setLoading(false);
      alert('An error occurred, please try again!');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <button
          className="absolute text-3xl text-gray-500 top-2 right-4 hover:text-red-500"
          onClick={() => onClose(false)}
        >
          &times;
        </button>
        <h2 className="mb-4 text-2xl font-bold text-center">Booking</h2>
        {roomTitle && (
          <p className="mb-4 text-lg text-center text-gray-600">
            Booking for: <strong>{roomTitle}</strong>
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <div className="flex gap-2">
            <input
              name="checkin"
              type="date"
              className="w-1/2 p-2 border rounded"
              value={form.checkin}
              onChange={handleChange}
              required
            />
            <input
              name="checkout"
              type="date"
              className="w-1/2 p-2 border rounded"
              value={form.checkout}
              onChange={handleChange}
              required
            />
          </div>
          <select
            name="guest"
            className="w-full p-2 border rounded"
            value={form.guest}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n}>
                {n} guests
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}