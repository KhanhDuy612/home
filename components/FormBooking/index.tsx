'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPatch, apiPost } from '@/hooks/apiPost';

interface BookingFormPopupProps {
  open: boolean;
  onClose: () => void;
  roomId: string | null;
}

export default function BookingFormPopup({ open, onClose, roomId }: BookingFormPopupProps) {
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
    if (!roomId) return;
    try {
      setLoading(true);

      // 1. Tạo booking mới trên Directus
      await apiPost(
        `items/bookings`,
        {
          ...form,
          room: roomId,
          status: 'pending',
        }
      );

      // 2. Update trạng thái phòng sang "Đang đặt"
      await apiPatch(
        `items/rooms/${roomId}`,
        { order: 'Đang đặt' }
      );

      setLoading(false);
      onClose();
      router.push('/booking');
    } catch (error) {
      setLoading(false);
      alert('Đã có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <button
          className="absolute text-2xl text-gray-500 top-2 right-2 hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="mb-4 text-2xl font-bold text-center">Đặt phòng</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Họ tên"
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
            placeholder="Số điện thoại"
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
                {n} khách
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Đang gửi...' : 'Gửi đặt phòng'}
          </button>
        </form>
      </div>
    </div>
  );
}