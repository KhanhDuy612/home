import type { NextApiRequest, NextApiResponse } from 'next';

const DIRECTUS_URL = 'https://test-homestay-cms.hcm57.vn/items/rooms?fields=*,nearby.*';
// Thay YOUR_TOKEN_HERE bằng Bearer token của bạn
const DIRECTUS_TOKEN = 'S_FvAmloYnY268H7Ons2qKXT_Z0t1qhI';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(DIRECTUS_URL, {
      headers: {
        Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch data from Directus' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Server error', detail: (error as Error).message });
  }
}