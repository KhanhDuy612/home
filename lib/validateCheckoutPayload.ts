interface CartItem {
  name?: string;
  price?: number;
  quantity?: number;
}

interface CustomerInfo {
  name?: string;
  email?: string;
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
}

interface Payload {
  cartItems: CartItem[];
  customerInfo: CustomerInfo;
  taxRate: number;
  shippingCost: number;
}

export function validateCheckoutPayload(payload: any): { valid: boolean; error?: string } {
  const { cartItems, customerInfo, taxRate, shippingCost } = payload;

  // Kiểm tra cartItems
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return { valid: false, error: 'Cart is empty or invalid' };
  }

  if (cartItems.length > 50) {
    return { valid: false, error: 'Too many items in cart' };
  }

  for (const item of cartItems) {
    if (
      typeof item !== 'object' ||
      typeof item.name !== 'string' ||
      typeof item.price !== 'number' ||
      typeof item.quantity !== 'number' ||
      item.price < 0 ||
      item.quantity <= 0
    ) {
      return { valid: false, error: 'Invalid item in cart' };
    }
  }

  // Kiểm tra customerInfo
  if (
    !customerInfo ||
    typeof customerInfo.email !== 'string' ||
    typeof customerInfo.name !== 'string' ||
    typeof customerInfo.phone !== 'string' ||
    !customerInfo.address ||
    typeof customerInfo.address.line1 !== 'string' ||
    typeof customerInfo.address.city !== 'string' ||
    typeof customerInfo.address.state !== 'string' ||
    typeof customerInfo.address.postal_code !== 'string' ||
    typeof customerInfo.address.country !== 'string'
  ) {
    return { valid: false, error: 'Invalid customer information' };
  }

  // Kiểm tra taxRate và shippingCost
  if (typeof taxRate !== 'number' || taxRate < 0 || taxRate > 0.3) {
    return { valid: false, error: 'Invalid tax rate' };
  }

  if (typeof shippingCost !== 'number' || shippingCost < 0 || shippingCost > 500) {
    return { valid: false, error: 'Invalid shipping cost' };
  }

  return { valid: true };
}
